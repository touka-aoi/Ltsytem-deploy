import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

import { LtInfoFacade } from '$lib/LtInfoFacade';
import { Account } from '$lib/AccountsFacade';
import { error, fail, redirect } from '@sveltejs/kit';

import type { LtSpeakerOutput } from '$lib/LtSpeaker/LtSpeakerRequestInterface';
import type { LtInfoOutput } from '$lib/LtHold/LtHoldRequstInterface';

import MarkdownIt  from "markdown-it";
const md = MarkdownIt();


interface response {
	Lt: LtInfoOutput;
	speaker: LtSpeakerOutput | undefined;
	LtRules: string,
}

let username = '';
let Ltname = '';
let LtID = "";
let userID = "";
const LtRule = ` **ルール**  
	- 発表時間は一人5分 + 質疑応答5分 の合計10分です。  
	- **時間超過した場合は自動的に終了します。**  
	- 発表するテーマは問いません。自由にテーマを持ちよって下さい。  
		`;
/**
 * LT登録ロード関数
 * @param event
 */
export const load: PageServerLoad = async (event) => {
	LtID = event.params.ltname;
	const LtInfo = new LtInfoFacade();
	const account = new Account();

	// LT情報
	const { data: LtData, error: LtError } = await LtInfo.LtHoldRequest.getLtInfoFromId(LtID);

	if (LtData == undefined || LtError != undefined) {
		throw error(404, 'Not found');
	}

	// ユーザー情報
	const session = await account.getSession(event);
	if (!session) {
		throw redirect(303, '/login');
	}

	userID = session.user.id;

	const { data: profileData, error: profileError } = await account.profileRequest.getProfile(session.user.id);

	if (profileData?.username) {
		username = profileData.username;
	}

	// スピーカー情報
	const { data: speakerData, error: speakerErr } = await LtInfo.LtSpeakerRequest.getLtSpeakerInfo(LtData.id, session.user.id);

	const response: response = {
		Lt: {
			...LtData,
			desc: md.render(LtData.desc)
		},
		speaker: speakerData,
		LtRules: md.render(LtRule),
	};

	return response;
};

// 登録
export const actions: Actions = {
	register: async ({ cookies, request, url }) => {
		const data = await request.formData();
		const tag = data.getAll('tag') as Array<string>;	
		const title = data.get('Lttitle') as string;
		const comment = data.get('Ltcomment') as string;
		const link = data.get('Ltlink') as string;
		const name = data.get('Ltname') as string;

		if (title.length == 0) {
			return fail(400, { title, missing: true });
		}

		const LtInfo = new LtInfoFacade();

		const res = await LtInfo.LtSpeakerRequest.upsertLtSpeakerInfo({
			Ltname: name,
			LtComment: comment,
			LtLink: link,
			LtTitle: title,
			LtID: Number(LtID),
			userID: userID,
			tags: tag,
		});


		if (res.error) {
			const err = res.error.message;
			return fail(400, { err, unknown: true });
		}

		// return { success: true };

		throw redirect(303, url.pathname.replace('register', ''));
	},
	cancel: async ({ url, request }) => {
		const data = await request.formData();
		const name = data.get('Ltname') as string;

		const LtInfo = new LtInfoFacade();

		LtInfo.LtSpeakerRequest.deleteLtSpeakerInfo(Number(LtID), userID);

		throw redirect(303, url.pathname.replace('register', ''));
	}
};

import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

import { LtInfoFacade } from '$lib/LtInfoFacade';
import { Account } from '$lib/Account';
import { getUser } from '$lib/userState';
import { error, fail, redirect } from '@sveltejs/kit';

import type { LtSpeakerOutput } from '$lib/LtSpeaker/LtSpeakerRequestInterface';
import type { LtInfoOutput } from '$lib/LtHold/LtHoldRequstInterface';

interface response {
	Lt: LtInfoOutput;
	speaker: LtSpeakerOutput | undefined;
}

/**
 * LT登録ロード関数
 * @param event
 */
export const load: PageServerLoad = async (event) => {
	const Ltid = event.params.ltname;
	const LtInfo = new LtInfoFacade();
	const account = new Account();

	// ユーザー情報
	const { username } = getUser();

	if (!username) throw redirect(303, '/login');

	// LT情報
	const { data: LtData, error: Lterr } = await LtInfo.LtHoldRequest.getLtInfoFromId(Ltid);

	if (LtData == undefined || Lterr != undefined) throw error(404, 'Not found');

	const ltname = LtData.name;

	// スピーカー情報
	const { data: speakerData, error: speakerErr } = await LtInfo.LtSpeakerRequest.getLtSpeakerInfo(
		ltname,
		username
	);

	const response: response = {
		Lt: LtData,
		speaker: speakerData
	};

	return response;
};

// 登録
export const actions: Actions = {
	register: async ({ cookies, request, url }) => {
		const data = await request.formData();
		const title = data.get('Lttitle') as string;
		const comment = data.get('Ltcomment') as string;
		const link = data.get('Ltlink') as string;
		const name = data.get('Ltname') as string;

		if (title.length == 0) {
			return fail(400, { title, missing: true });
		}

		const { username } = getUser();
		if (!username) {
			return fail(400, { unkonwn: true });
		}
		const LtInfo = new LtInfoFacade();

		const res = await LtInfo.LtSpeakerRequest.upsertLtSpeakerInfo({
			Ltname: name,
			username: username,
			LtComment: comment,
			LtLink: link,
			LtTitle: title
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

		const { username } = getUser();
		if (!username) {
			return fail(400, { unkonwn: true });
		}

		const LtInfo = new LtInfoFacade();

		LtInfo.LtSpeakerRequest.deleteLtSpeakerInfo(name, username);

		throw redirect(303, url.pathname.replace('register', ''));
	}
};

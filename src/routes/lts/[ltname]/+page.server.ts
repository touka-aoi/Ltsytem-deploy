// Todo : LT情報を取得して返す
// LT情報 usersLtInformation

import type { PageServerLoad } from './$types';
import { LtInfoFacade } from '$lib/LtInfoFacade';
import { Account } from '$lib/Account';
import { getUser } from '$lib/userState';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

import type { LtSpeakerOutput } from '$lib/LtSpeaker/LtSpeakerRequestInterface';
import type { Ltviewers } from '$lib/Ltviewer/LtviewerRequestInterface';

interface speakersInfo {
	username: string;
	avatarData: string | null;
	LtTitle?: string;
	LtComment?: string;
	LtLink?: string;
}

type status = 'reserve' | 'end';

interface response {
	Lt: {
		id: Number;
		Ltname: string;
		desc: string;
		holdHour: string;
		holdDay: string;
		maxMem: Number;
		assignNum: Number;
		holdPlace: string;
		status: status;
		speakers: Array<speakersInfo>;
	};
	user: {
		username: string;
		isSpeaker: boolean;
		isViewer: boolean;
	};
	viewer: Ltviewers;
}

function dateFormatter(date: Date) {
	const dayformated: string = date.toLocaleDateString('ja-JP', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	});
	const hourformated = date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
	return {
		holdHour: hourformated,
		holdDay: dayformated
	};
}

/**
 * LTページロード用関数
 * @param event
 * @returns
 */
export const load: PageServerLoad = async (event) => {
	//
	const Ltid = event.params.ltname;
	const LtInfo = new LtInfoFacade();
	const account = new Account();

	// Lt情報を取得
	const { data, error: err } = await LtInfo.LtHoldRequest.getLtInfoFromId(Ltid);

	// Lt情報がない場合404
	if (data == undefined || err != undefined) throw error(404, 'Not found');

	// LT名
	const ltname = data.name;

	// スピーカ情報を取得する
	const res = await LtInfo.LtSpeakerRequest.getLtSpeakerInfoFromLt(ltname);

	// アバター情報を付加する
	const speakers: Array<speakersInfo> = await Promise.all(
		res.map(async (speakerInfo: LtSpeakerOutput) => {
			const {
				data: { avatar_url }
			} = await account.getProfileFromUsername(speakerInfo.username);
			const res: speakersInfo = {
				...speakerInfo,
				avatarData: avatar_url
			};
			return res;
		})
	);

	// ビューアー情報を取得する
	const LtviewersInfo = await LtInfo.LtviewerRequest.getLtviewersfromLtname(ltname);

	/*  ユーザー情報 */

	// LT登録しているかのチェック
	let isSpeaker: boolean = false;
	let isViewer: boolean = false;

	const { username: nowuser } = getUser();

	// ログイン時
	if (nowuser) {
		// スピーカー登録チェック
		const { data, error } = await LtInfo.LtSpeakerRequest.getLtSpeakerInfo(ltname, nowuser);
		if (data != undefined || !error) {
			isSpeaker = true;
		}
		// ビュアー登録チェック
		isViewer = LtviewersInfo.usernames.includes(nowuser);
	}

	let status: status;
	if (new Date() < data.holdDate) {
		status = 'reserve';
	} else {
		status = 'end';
	}

	const response: response = {
		Lt: {
			...data,
			...dateFormatter(data.holdDate),
			speakers: speakers,
			Ltname: data.name,
			assignNum: speakers.length,
			status: status
		},
		user: {
			username: nowuser,
			isSpeaker: isSpeaker,
			isViewer: isViewer
		},
		viewer: LtviewersInfo
	};

	return response;
};

// 登録
export const actions: Actions = {
	register: async ({ cookies, request, url }) => {
		const data = await request.formData();
		const name = data.get('Ltname') as string;

		const { username } = getUser();
		if (!username) {
			return fail(400, { unkonwn: true });
		}
		const LtInfo = new LtInfoFacade();

		const res = await LtInfo.LtviewerRequest.upsertLtviewer(name, username);

		if (res.error) {
			const err = res.error.message;
			return fail(400, { err, unknown: true });
		}

		return { success: true };
	}
};

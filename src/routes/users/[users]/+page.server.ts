import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { Account } from '$lib/Account';
import { LtInfoFacade } from '$lib/LtInfoFacade';
import { getUser } from '$lib/userState';

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

async function getUserSpeakLtData(username: string) {
	const userSpeakLts = await LtInfo.LtSpeakerRequest.getLtSpeakerInfoFromUser(username);
	await Promise.all(
		userSpeakLts.map(async (userSpeakLt) => {
			//LT情報を取得
			const { data: LtData } = await LtInfo.LtHoldRequest.getLtInfoFromName(userSpeakLt.Ltname);
			if (LtData) {
				const speakers = await LtInfo.LtSpeakerRequest.getLtSpeakerInfoFromLt(userSpeakLt.Ltname);
				const userSpeakLtdata: userSpeakLtInformation = {
					...dateFormatter(LtData.holdDate),
					maxMem: Number(LtData.maxMem),
					Ltid: Number(LtData.id),
					holdPlace: LtData.holdPlace,
					assginMem: speakers.length,
					...userSpeakLt
				};
				if (new Date() < LtData.holdDate) {
					speakerLtReserveInfo.push(userSpeakLtdata);
				} else {
					speakerLtEndInfo.push(userSpeakLtdata);
				}
			}
		})
	);
}

async function getUserViewLtData(username: string) {
	const userViewsLts = await LtInfo.LtviewerRequest.getLtsfromUser(username);
	await Promise.all(
		userViewsLts.Ltnames.map(async (Ltname) => {
			const { data: LtData } = await LtInfo.LtHoldRequest.getLtInfoFromName(Ltname);
			if (LtData) {
				const userViewLtdata: userViewLtInformation = {
					...dateFormatter(LtData.holdDate),
					Ltname: LtData.name,
					Ltid: Number(LtData.id),
					holdPlace: LtData.holdPlace
				};
				if (new Date() < LtData.holdDate) {
					viewLtReserveInfo.push(userViewLtdata);
				} else {
					viewLtEndInfo.push(userViewLtdata);
				}
			}
		})
	);
}

const account = new Account();
const LtInfo = new LtInfoFacade();

let speakerLtReserveInfo: Array<userSpeakLtInformation> = [];
let speakerLtEndInfo: Array<userSpeakLtInformation> = [];
let viewLtReserveInfo: Array<userViewLtInformation> = [];
let viewLtEndInfo: Array<userViewLtInformation> = [];

interface userSpeakLtInformation {
	Ltname: string;
	LtLink?: string;
	LtTitle?: string;
	LtComment?: string;
	Ltid: Number;
	holdHour: string;
	holdDay: string;
	holdPlace: string;
	maxMem: Number;
	assginMem: Number;
}

interface userViewLtInformation {
	holdHour: string;
	holdDay: string;
	holdPlace: string;
	Ltname: string;
	Ltid: number;
}

/**
 * ユーザーページ用のロード関数
 * 取得情報: ユーザー情報(username, avatarURL), ログインユーザーかどうか
 */
export const load: PageServerLoad = async (event) => {
	// URIパラメータ
	const { users: usernameFromUri } = event.params;

	// 現在ログイン中のユーザー
	const { username: loginUser } = getUser();

	// DBからユーザー情報取得
	const {
		data: { username, avatar_url }
	} = await account.getProfileFromUsername(usernameFromUri);

	// 非登録ユーザー
	if (!username) {
		throw error(404, 'Not found');
	}

	const isUser = loginUser == username;

	getUserSpeakLtData(username);
	getUserViewLtData(username);

	return {
		user: usernameFromUri,
		isUser: isUser,
		avatarUrl: avatar_url,
		LtData: {
			speaker: {
				reserve: speakerLtReserveInfo,
				end: speakerLtEndInfo
			},
			viewer: {
				reserve: viewLtReserveInfo,
				end: viewLtEndInfo
			}
		}
	};
};

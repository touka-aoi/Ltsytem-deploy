import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { Account } from '$lib/AccountsFacade';
import { LtInfoFacade } from '$lib/LtInfoFacade';

/**
 * Date型をstring型に変換する
 * @param date 変換するDate型
 * @returns holdHourとholdDayを返す ex. holdHour 12:12, holdDay 2022-12-12
 */
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
 * LT登壇データを取得する
 * @param userID 取得したいユーザーID
 * @returns 予約LTと終了LTと返す
 */
async function getUserSpeakLtData(userID: string) {
	// 登壇データ取得
	const userSpeakLts = await LtInfo.LtSpeakerRequest.getLtSpeakerInfoFromUser(userID);
	// 予約データ
	const speakerLtReserveInfo: Array<userSpeakLtInformation> = [];
	// 終了データ
	const speakerLtEndInfo: Array<userSpeakLtInformation> = [];
	// LT情報を取得する
	await Promise.all(
		userSpeakLts.map(async (userSpeakLt) => {
			//LT情報を取得
			const { data: LtData } = await LtInfo.LtHoldRequest.getLtInfoFromName(userSpeakLt.Ltname);
			if (LtData) {
				// 登壇人数を取得
				const speakers = await LtInfo.LtSpeakerRequest.getLtSpeakerInfoFromLtID(userSpeakLt.LtID);
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
	return {
		speakerLtReserveInfo: speakerLtReserveInfo,
		speakerLtEndInfo: speakerLtEndInfo,
	};
}

async function getUserViewLtData(userID: string) {
	const userViewsLts = await LtInfo.LtviewerRequest.getLtsfromUser(userID);
	let viewLtReserveInfo: Array<userViewLtInformation> = [];
	let viewLtEndInfo: Array<userViewLtInformation> = [];
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
	return {
		viewLtReserveInfo: viewLtReserveInfo,
		viewLtEndInfo: viewLtEndInfo,
	}
}

const account = new Account();
const LtInfo = new LtInfoFacade();

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
	let username: string | undefined = undefined;
	let avatarURL: string | undefined = undefined;
	let loginID: string = '';
	let userID: string = '';

	const { users: usernameFromUri } = event.params;
	const session = await account.getSession(event);
	if (session) {
		loginID = session.user.id;
	}

	// DBからユーザー情報取得
	const { data } = await account.profileRequest.getProfileFromUsername(usernameFromUri);
	if (data) {
		username = data.username;
		avatarURL = data.avatarURL;
		userID = data.id;
	}

	// 非登録ユーザー
	if (!username) {
		throw error(404, 'Not found');
	}

	const isUser = loginID == userID;

	const {speakerLtReserveInfo, speakerLtEndInfo} = await getUserSpeakLtData(userID);
	const { viewLtReserveInfo, viewLtEndInfo } = await getUserViewLtData(userID);

	return {
		user: usernameFromUri,
		isUser: isUser,
		avatarUrl: avatarURL,
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

import type { PageServerLoad } from './$types';
import { LtInfoFacade } from '$lib/LtInfoFacade';
import type { LtSpeakerOutput } from '$lib/LtSpeaker/LtSpeakerRequestInterface';
import { Account } from '$lib/AccountsFacade';

interface speakersInfo {
	username: string;
	avatarData: string | undefined;
	LtTitle?: string;
	LtComment?: string;
	LtLink?: string;
}

/**
 * rootページ読み込み時サーバーロード関数
 * @param event
 * @return LatestLt情報
 */
export const load: PageServerLoad = async (event) => {
	// supabaseのsessionを取得する
	const LtInfo = new LtInfoFacade();
	// 最新Lt情報を取得
	const latestLt = await LtInfo.LtHoldRequest.getLatestLtInfo();
	// Ltスピーカー情報を取得
	const latestLtSpeaker = await LtInfo.LtSpeakerRequest.getLtSpeakerInfoFromLt(latestLt.id);

	const account = new Account();

	// ユーザー情報を取得する
	const speakers: Array<speakersInfo> = await Promise.all(
		latestLtSpeaker.map(async (speakerInfo: LtSpeakerOutput) => {
			const { data } = await account.profileRequest.getProfile(speakerInfo.userID);
			
			const res: speakersInfo = {
				...speakerInfo,
				avatarData: data?.avatarURL,
				username: data?.username as string
			};
			return res;
		})
	);

	return {
		hoge: LtInfo.LtHoldRequest.getLatestLtInfo(),
		latestLt: {
			data: latestLt,
			speakers: speakers
		}
	};
};

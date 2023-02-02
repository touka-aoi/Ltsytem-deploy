import type { PageServerLoad } from './$types';
import { LtInfoFacade } from '$lib/LtInfoFacade';

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

	return {
		latestLt: {
			data: latestLt,
			speakers: latestLtSpeaker
		}
	};
};

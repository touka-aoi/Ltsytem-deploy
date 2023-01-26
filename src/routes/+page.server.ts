import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { LtInfoFacade } from '$lib/LtInfoFacade';
import { getUser } from '$lib/userState';

/**
 * rootページ読み込み時サーバーロード関数
 * @param event
 * @return LatestLt情報
 */
export const load: PageServerLoad = async (event) => {
	// supabaseのsessionを取得する
	const LtInfo = new LtInfoFacade();
	const { username, userId } = getUser();

	// ログイン時ユーザー名がない場合は登録へ
	if (userId && !username) {
		throw redirect(307, '/register');
	}

	// 最新Lt情報を取得
	const latestLt = await LtInfo.LtHoldRequest.getLatestLtInfo();
	// Ltスピーカー情報を取得
	const latestLtSpeaker = await LtInfo.LtSpeakerRequest.getLtSpeakerInfoFromLt(latestLt.name);

	return {
		latestLt: {
			data: latestLt,
			speakers: latestLtSpeaker
		}
	};
};

import { json } from '@sveltejs/kit';
import { LtInfoFacade } from '$lib/LtInfoFacade';
import { Account } from "$lib/AccountsFacade"

import type { LtSpeakerOutput } from '$lib/LtSpeaker/LtSpeakerRequestInterface';
import type { LtInfoOutput } from "$lib/LtHold/LtHoldRequstInterface"

// インスタンス作成
const LtService = new LtInfoFacade;
const AccountService = new Account;

export async function GET() {
  // 最新Lt情報を取得
  const latestLts: Array<LtInfoOutput> = await LtService.LtHoldRequest.getLatestLtInfo();
  const latestLt = latestLts[0];
  
  // スピーカー情報を取得
  const latestLtSpeaker = await LtService.LtSpeakerRequest.getLtSpeakerInfoFromLtID(latestLt.id);
  // ユーザー名を取得
  const latestLtSpeakerAddUserData = await Promise.all(
    latestLtSpeaker.map(async(speakerInfo: LtSpeakerOutput) => {
      const {userID, ...speakerInfoExclID} = speakerInfo;
      const { data } = await AccountService.profileRequest.getProfile(userID);
      const speakerInfoAddUserData = {
				...speakerInfoExclID,
				avatarData: data?.avatarURL,
				username: data?.username as string
			};
			return speakerInfoAddUserData;
    })
  );
  return json({
    Lt: latestLt,
    speaker: latestLtSpeakerAddUserData,
  });
}

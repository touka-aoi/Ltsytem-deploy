import type { RequestEvent } from '../../$types';
import { json } from '@sveltejs/kit';
import { LtInfoFacade } from '$lib/LtInfoFacade';
import { Account } from '$lib/AccountsFacade';

import type { LtSpeakerInfomation } from '$lib/LtInfoFacade';
import { LtSpeakerRequestInterface } from '$lib/LtSpeaker/LtSpeakerRequestInterface';

export async function GET(event: RequestEvent) {
  const query = event.url.search;
  const querParams = new URLSearchParams(query);
  const LtID = Number(querParams.get("ltid") as string);
  if (Number.isNaN(LtID)) {
    let response =  LtSpeakerRequestInterface.NULL;
    response.error = {message: "invalid query parameter"};
    return json(response);
  }

  const LtInfoService = new LtInfoFacade;
  const accountService = new Account;

	// スピーカー情報を取得
	const LtSpeakerInfo = await LtInfoService.LtSpeakerRequest.getLtSpeakerInfoFromLtID(LtID);
  const response = await Promise.all(LtSpeakerInfo.data.map(async (ele) => {
    const {data: {avatarURL, username}} = await accountService.profileRequest.getProfile(ele.userID)
    const response = {
      id: ele.id,
      Ltname: ele.Ltname,
      LtID: ele.LtID,
      LtLink: ele.LtLink,
      LtTitle: ele.LtTitle,
      LtComment: ele.LtComment,
      tags: ele.tags,
      username: username,  
      avatarData: avatarURL,
    }
    return response;
  }));
    
  return json({data: response});
}

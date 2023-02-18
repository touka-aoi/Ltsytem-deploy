import type { RequestEvent } from '../../$types';
import { json } from '@sveltejs/kit';
import { LtInfoFacade } from '$lib/LtInfoFacade';
import { Account } from '$lib/AccountsFacade';

import type { LtSpeakerInfomation } from '$lib/LtInfoFacade';

export async function GET(event: RequestEvent) {
	let response: LtSpeakerInfomation = {
		data: [
			{
				id: 0,
				Ltname: '',
				avatarData: '',
				LtComment: '',
				LtID: 0,
				LtLink: '',
				LtTitle: '',
				tags: [],
				username: ''
			}
		],
		error: { message: '' }
	};
	const query = event.url.search;
	const querParams = new URLSearchParams(query);
	const LtID = Number(querParams.get('ltid') as string);
	if (Number.isNaN(LtID)) {
		response.error = { message: 'invalid query parameter' };
		return json(response);
	}

	const LtInfoService = new LtInfoFacade();
	const accountService = new Account();

	// スピーカー情報を取得
	const LtSpeakerInfo = await LtInfoService.LtSpeakerRequest.getLtSpeakerInfoFromLtID(LtID);
	response.data = await Promise.all(
		LtSpeakerInfo.data.map(async (ele) => {
			const {
				data: { avatarURL, username }
			} = await accountService.profileRequest.getProfile(ele.userID);
			const response = {
				id: ele.id as number,
				Ltname: ele.Ltname,
				LtID: ele.LtID as number,
				LtLink: ele.LtLink,
				LtTitle: ele.LtTitle,
				LtComment: ele.LtComment,
				tags: ele.tags,
				username: username,
				avatarData: avatarURL
			};
			return response;
		})
	);

	return json(response);
}

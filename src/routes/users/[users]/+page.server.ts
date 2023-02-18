import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { Account } from '$lib/AccountsFacade';
import { LtInfoFacade } from '$lib/LtInfoFacade';

export const load: PageServerLoad = async (event) => {
	const accountService = new Account();
	const LtInfoService = new LtInfoFacade();

	const { users: username } = event.params;
	const { data } = await accountService.profileRequest.getProfileFromUsername(username);

	// thrown 404 for unkown user
	if (data.username == '') throw error(404, 'Not found');  

	const userSpeakerData = LtInfoService.LtSpeakerRequest.getLtSpeakerInfoFromUserID(data.id);
	const userViewrDarta = LtInfoService.LtviewerRequest.getLtsfromUser(data.id);

	return {
		speakerData: userSpeakerData,
		viewerData: userViewrDarta,
		userData: data,
	}
};

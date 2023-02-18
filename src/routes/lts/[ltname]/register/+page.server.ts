import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

import { LtInfoFacade } from '$lib/LtInfoFacade';
import { Account } from '$lib/AccountsFacade';
import { error, fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	// get Page Parm
	const LtID = Number(event.params.ltname);

	// create servcie
	const LtInfoService = new LtInfoFacade();
	const accountService = new Account();

	// get LtInformation
	const { data: LtInfo, error: err } = await LtInfoService.LtHoldRequest.getLtInfoFromId(LtID);

	// throw 404
	if (err.message != '') throw error(404, 'Not found');

	// get session
	const session = await accountService.getSession(event);

	// throw error
	if (!session) {
		throw redirect(303, '/login');
	}

	// get User Profile
	const userProfile = accountService.profileRequest.getProfile(session.user.id);

	// get user Speaker Information
	const userSpeakerInfo = await LtInfoService.LtSpeakerRequest.getLtSpeakerInfo(LtID, session.user.id);

	// create response data
	const response = {
		LtInfo: LtInfo,
		userSpekaerInfo: userSpeakerInfo,
		userProfile: userProfile
	};

	return response;
};

// 登録
export const actions: Actions = {
	register: async ({ cookies, request, url }) => {
		const data = await request.formData();
		const tag = data.getAll('tag') as Array<string>;
		const title = data.get('Lttitle') as string;
		const comment = data.get('Ltcomment') as string;
		const link = data.get('Ltlink') as string;
		const name = data.get('Ltname') as string;
		const username = data.get('username') as string;
		const LtID = Number(data.get('LtID') as string);

		if (title.length == 0) {
			return fail(400, { title, missing: true });
		}

		const LtInfo = new LtInfoFacade();
		const accountService = new Account();

		const profileData = await accountService.profileRequest.getProfileFromUsername(username);
		const userID = profileData.data?.id as string;

		const res = await LtInfo.LtSpeakerRequest.upsertLtSpeakerInfo({
			Ltname: name,
			LtComment: comment,
			LtLink: link,
			LtTitle: title,
			LtID: LtID,
			userID: userID,
			tags: tag
		});

		if (res.message) {
			const err = res.message;
			return fail(400, { err, unknown: true });
		}

		// return { success: true };

		throw redirect(303, url.pathname.replace('register', ''));
	},

	cancel: async ({ url, request }) => {
		const data = await request.formData();
		const LtID = Number(data.get('LtID') as string);
		const username = data.get('username') as string;

		const LtInfo = new LtInfoFacade();
		const accountService = new Account();
		const profileData = await accountService.profileRequest.getProfileFromUsername(username);
		const userID = profileData.data?.id as string;

		LtInfo.LtSpeakerRequest.deleteLtSpeakerInfo(LtID, userID);

		throw redirect(303, url.pathname.replace('register', ''));
	}
};

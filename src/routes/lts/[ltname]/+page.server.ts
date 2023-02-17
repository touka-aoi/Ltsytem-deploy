import type { PageServerLoad } from './$types';
import { LtInfoFacade } from '$lib/LtInfoFacade';
import { error, fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load: PageServerLoad = async (event) => {
	// get LtID
	const LtID = Number(event.params.ltname);

	// create service
	const LtInfoService = new LtInfoFacade();

	// get LtInformation
	const { data: LtInformation, error: err } = await LtInfoService.LtHoldRequest.getLtInfoFromId(LtID);

	// throw 404
	if (LtInformation == undefined || err != undefined) throw error(404, 'Not found');

	// get LtSpeaker Information
	const LtSpeakerInfo = LtInfoService.LtSpeakerRequest.getLtSpeakerInfoFromLtID(LtID);

	// get LtViewer Information
	const LtviewersInfo = LtInfoService.LtviewerRequest.getLtviewersFromID(LtID);

	const response = {
		LtInfo: LtInformation,
		speaker: LtSpeakerInfo,
		viewer: LtviewersInfo
	};

	return response;
};

// 登録
export const actions: Actions = {
	register: async ({ cookies, request, url }) => {
		const data = await request.formData();
		const name = data.get('Ltname') as string;

		if (!username) {
			return fail(400, { unkonwn: true });
		}
		const LtInfo = new LtInfoFacade();

		const res = await LtInfo.LtviewerRequest.upsertLtviewer(name, username);

		if (res.error) {
			const err = res.error.message;
			return fail(400, { err, unknown: true });
		}

		return { success: true };
	}
};

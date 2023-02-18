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
	if (err.message != '') throw error(404, 'Not found');

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
		const LtID = data.get('LtID') as string;
		const userID = data.get('userID') as string;

		const LtInfo = new LtInfoFacade;
		const {message} = await LtInfo.LtviewerRequest.upsertLtviewer(Number(LtID), userID);
		
		if (message) {
			const err = message;
			return fail(400, { err, unknown: true });
		}

		return { registeSuccess: true };
	},

	cancel: async ({ cookies, request, url }) => {
		const data = await request.formData();
		const LtID = data.get('LtID') as string;
		const userID = data.get('userID') as string;

		const LtInfo = new LtInfoFacade;
		const {message} = await LtInfo.LtviewerRequest.delteLtviewer(Number(LtID), userID);
		
		if (message) {
			const err = message;
			return fail(400, { err, unknown: true });
		}

		return { cancelSuccess: true };
	}
};


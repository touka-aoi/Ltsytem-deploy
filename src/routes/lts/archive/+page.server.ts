import type { PageServerLoad } from './$types';
import { LtInfoFacade } from '$lib/LtInfoFacade';

export const load: PageServerLoad = async (event) => {
	const LtInfoService = new LtInfoFacade();
	const latestLtData = LtInfoService.LtHoldRequest.getLatestLtInfo();
	return {
		latestLt: latestLtData
	};
};

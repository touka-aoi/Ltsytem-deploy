import type { PageServerLoad } from './$types';

import { LtInfoFacade } from '$lib/LtInfoFacade';
import { Account } from '$lib/AccountsFacade';

import type { LtInfoOutput } from '$lib/LtHold/LtHoldRequstInterface';

export const load: PageServerLoad = async (event) => {
	// createService
	const LtService = new LtInfoFacade();

	// get LatestLtinformation
	const latestLts: Promise<LtInfoOutput> = LtService.LtHoldRequest.getLatestLtInfo();	

	return {
		latestLts: latestLts
	};
};

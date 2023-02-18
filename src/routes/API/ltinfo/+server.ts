import type { RequestEvent } from '../../$types';
import { json } from '@sveltejs/kit';
import { LtHoldRequestInterface } from '$lib/LtHold/LtHoldRequstInterface';
import { LtInfoFacade } from '$lib/LtInfoFacade';

export async function GET(event: RequestEvent) {
	let response = LtHoldRequestInterface.NULL();
	const query = event.url.search;
	const querParams = new URLSearchParams(query);
	const LtID = Number(querParams.get('ltid') as string);
	if (Number.isNaN(LtID)) {
		response.error = { message: 'invalid query parameter' };
		return json(response);
	}

	const LtInfoService = new LtInfoFacade();

	// get Lt information
	response = await LtInfoService.LtHoldRequest.getLtInfoFromId(LtID);
	return json(response);
}

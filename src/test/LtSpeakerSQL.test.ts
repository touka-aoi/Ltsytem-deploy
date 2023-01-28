import { describe, it, expect } from 'vitest';
import { LtSpeakerRequestPostgresql } from '$lib/LtSpeaker/LtSpeakerRequestPostgres';
import { LtSpeakerRequest } from '$lib/LtSpeaker/LtSpeakerRequest';

const testData = {
	id: 1,
	Ltname: 'hu',
	username: 'fa',
	LtComment: 'hoge',
	LtLink: 'https',
	LtTitle: 'suba'
};

const testDataInput = {
	Ltname: '第一回LT大会',
	username: 'fa',
	LtComment: 'hoge',
	LtLink: 'https',
	LtTitle: 'suba'
};

describe('LtHold', () => {
	const LtHoldRequester = new LtSpeakerRequest(new LtSpeakerRequestPostgresql());
	it('getLtinfo', async () => {
		const res = await LtHoldRequester.getLtSpeakerInfo('第一回LT大会', 'd');
	});

	it('getLtinfoFromName', async () => {
		const res = await LtHoldRequester.getLtSpeakerInfoFromUser('d');
	});

	it('getLatestLt', async () => {
		const res = await LtHoldRequester.getLtSpeakerInfoFromLt('第一回LT大会');
	});

	it('upsertLtInfo', async () => {
		const res = await LtHoldRequester.upsertLtSpeakerInfo(testDataInput);
	});

	it('deleteLtInfo', async () => {
		const res = await LtHoldRequester.deleteLtSpeakerInfo('第一回LT大会', 'fa');
	});
});

// import { describe, it, expect } from 'vitest';
// describe('Profile', () => {
// 	const ProfileService = new LtHoldRequest(new LtHoldRequestPostgresql());
// 	// DBに存在しないデータをクエリする
// 	it('getLtinfoNotExist', async () => {
// 		const res = await LtHoldRequester.getLtInfoFromId('6');
// 	});

// 	it('getLtinfoExist', async () => {
// 		const res = await LtHoldRequester.getLtInfoFromId('11');
// 	});

// 	it('getLtinfoFromName', async () => {
// 		const res = await LtHoldRequester.getLtInfoFromName('LT2');
// 		console.log(res);
// 	});

// 	it('getLatestLt', async () => {
// 		const res = await LtHoldRequester.getLatestLtInfo();
// 	});

// 	it('upsertLtInfo', async () => {
// 		const res = await LtHoldRequester.upsertLtInfo(mockLtInfo);
// 	});

// 	it('deleteLtInfo', async () => {
// 		const res = await LtHoldRequester.deleteLtInfoFromName('hoge');
// 	});
// });
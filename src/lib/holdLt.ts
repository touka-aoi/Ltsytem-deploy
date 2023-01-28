// import { LtHoldRequest } from '$lib/LTHold/LtHoldRequest';
// // import { LtHoldRequestMock } from '$lib/LTHold/LtHoldRequestMock';
// import type { LtInfo } from '$lib/LTHold/LtHoldRequstInterface';

// export class holdingLt {
// 	request: LtHoldRequest;
// 	desc: string = '自動生成されたLTです。';

// 	constructor() {
// 		this.request = new LtHoldRequest(new LtHoldRequestMock());
// 	}

// 	async createLt() {
// 		const LtNumber = (await this.latestHoldedLtNumber()) + 1;
// 		const LtInfo: LtInfo = {
// 			name: `第${LtNumber}回LT大会`,
// 			desc: this.desc,
// 			maxMem: 6,
// 			holdDate: holdingLt.getNextSunday(),
// 			holdPlace: 'hoge'
// 		};
// 		this.request.upsertLtInfo(`Lt${LtNumber}`, LtInfo);
// 	}

// 	changeLtInfo() {
// 		// のち実装
// 	}

// 	// 最新のLTが開催さえた番号をとってくる
// 	async latestHoldedLtNumber() {
// 		const { name } = await this.request.getLatestLtInfo();
// 		return holdingLt.extractNumber(name);
// 	}

// 	// 文字列から数字を抜き出す
// 	private static extractNumber(str: string): number {
// 		const match = str.match(/\d+/);
// 		if (match) {
// 			return parseInt(match[0], 10);
// 		}
// 		return 0;
// 	}

// 	// 一番近い金曜日を見つける
// 	private static getNextSunday(): Date {
// 		const today = new Date();
// 		const dayOfWeek = today.getDay();
// 		const daysUntilSunday = 7 - dayOfWeek;
// 		return new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysUntilSunday);
// 	}
// }

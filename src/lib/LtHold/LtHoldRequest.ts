import type { LtHoldRequestInterface, LtInfoInput, LtInfoOutput } from './LtHoldRequstInterface';

export class LtHoldRequest {
	private _LtHoldRequestInterface: LtHoldRequestInterface;

	constructor(LtHoldInterface: LtHoldRequestInterface) {
		this._LtHoldRequestInterface = LtHoldInterface;
	}

	async getLtInfoFromId(id: Number) {
		return  await this._LtHoldRequestInterface.getLtInfoFromId(id);
	}

	async getLatestLtInfo() {
		return  await this._LtHoldRequestInterface.getLatestLts();
	}

	upsertLtInfo(LtInfo: LtInfoInput) {
		return this._LtHoldRequestInterface.upsertLtInfo(LtInfo);
	}

	deleteLtInfo(id: Number) {
		return this._LtHoldRequestInterface.deleteLtInfo(id);
	}

}

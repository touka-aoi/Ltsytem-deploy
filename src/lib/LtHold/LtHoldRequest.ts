import type { LtHoldRequestInterface, LtInfoInput, LtInfoOutput } from './LtHoldRequstInterface';

interface LtHoldData {
	data: LtInfoOutput | undefined;
	error:
		| {
				message: string;
		  }
		| undefined;
}

/**
 * Lt開催情報を操作するサービスクラス
 *
 *
 */
export class LtHoldRequest {
	private _LtHoldRequestInterface: LtHoldRequestInterface;

	constructor(LtHoldInterface: LtHoldRequestInterface) {
		this._LtHoldRequestInterface = LtHoldInterface;
	}

	async getLtInfoFromId(id: string) {
		const data: LtHoldData = { data: undefined, error: undefined };
		try {
			const res = await this._LtHoldRequestInterface.getLtInfoFromId(id);
			data.data = res;
		} catch (e) {
			if (e instanceof Error) {
				data.error = { message: e.message };
			}
		}
		return data;
	}

	async getLtInfoFromName(Ltname: string) {
		const data: LtHoldData = { data: undefined, error: undefined };
		try {
			const res = await this._LtHoldRequestInterface.getLtInfofromName(Ltname);
			data.data = res;
		} catch (e) {
			if (e instanceof Error) {
				data.error = { message: e.message };
			}
		}
		return data;
	}

	getLatestLtInfo() {
		return this._LtHoldRequestInterface.getLatestLt();
	}

	upsertLtInfo(LtInfo: LtInfoInput) {
		return this._LtHoldRequestInterface.upsertLtInfo(LtInfo);
	}

	deleteLtInfo(id: string) {
		return this._LtHoldRequestInterface.deleteLtInfo(id);
	}

	deleteLtInfoFromName(Ltname: string) {
		return this._LtHoldRequestInterface.delteLtInfoFromName(Ltname);
	}
}

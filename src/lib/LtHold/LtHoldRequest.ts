import type { LtHoldRequestInterface, LtInfoInput, LtInfoOutput } from './LtHoldRequstInterface';

interface postgresqlData {
	id: Number;
	ltname: string;
	description: string;
	maxmem: Number;
	holddate: Date;
	holdplace: string;
}

interface LtHoldData {
	data: LtInfoOutput | undefined;
	error:
		| {
				message: string;
		  }
		| undefined;
}

function convertData(data: postgresqlData): LtInfoOutput {
	const convData: LtInfoOutput = {
		id: data.id,
		name: data.ltname,
		desc: data.description,
		maxMem: data.maxmem,
		holdDate: new Date(data.holddate),
		holdPlace: data.holdplace
	};
	return convData;
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

	async getLatestLtInfo() {
		const latestLtData =  await this._LtHoldRequestInterface.getLatestLts50();
		const ConvertLatestLtData = latestLtData.map((LtData) => {
			return convertData(LtData);
		});
		return ConvertLatestLtData;
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

import type { LtSpeakerInput, LtSpeakerOutput, LtSpeakerRequestInterface } from './LtSpeakerRequestInterface';

interface LtSpeakerData {
	data: LtSpeakerOutput | undefined;
	error:
		| {
				message: string;
		  }
		| undefined;
}

export class LtSpeakerRequest {
	private _LtSpeakerRequstInterface: LtSpeakerRequestInterface;

	constructor(LtSpeakerRequest: LtSpeakerRequestInterface) {
		this._LtSpeakerRequstInterface = LtSpeakerRequest;
	}

	async getLtSpeakerInfo(LtID: Number, userID: string) {
		const data: LtSpeakerData = { data: undefined, error: undefined };
		try {
			const res = await this._LtSpeakerRequstInterface.getSpeakerInfo(LtID, userID);
			data.data = res;
		} catch (e) {
			if (e instanceof Error) {
				data.error = { message: e.message };
			}
		}
		return data;
	}

	getLtSpeakerInfoFromUser(username: string) {
		return this._LtSpeakerRequstInterface.getLtSpeakerInfoFromUser(username);
	}

	getLtSpeakerInfoFromLt(LtID: Number) {
		return this._LtSpeakerRequstInterface.getSpeakerInfoFromLt(LtID);
	}

	async upsertLtSpeakerInfo(LtSpeakerInfo: LtSpeakerInput) {
		const data: LtSpeakerData = { data: undefined, error: undefined };
		try {
			const res = await this._LtSpeakerRequstInterface.upsertLtSpeakerInfo(LtSpeakerInfo);
		} catch (e) {
			if (e instanceof Error) {
				data.error = { message: e.message };
			}
		}
		return data;
	}

	async deleteLtSpeakerInfo(LtID: Number, userID: string) {
		const data: LtSpeakerData = { data: undefined, error: undefined };
		try {
			const res = await this._LtSpeakerRequstInterface.deleteLtSpeakerInfo(LtID, userID);
		} catch (e) {
			if (e instanceof Error) {
				data.error = { message: e.message };
			}
		}
		return data;
	}
}

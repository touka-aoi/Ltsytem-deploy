import type {
	LtSpeakerInput,
	LtSpeakerOutput,
	LtSpeakerRequestInterface
} from './LtSpeakerRequestInterface';

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

	async getLtSpeakerInfo(Ltname: string, username: string) {
		const data: LtSpeakerData = { data: undefined, error: undefined };
		try {
			const res = await this._LtSpeakerRequstInterface.getSpeakerInfo(Ltname, username);
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

	getLtSpeakerInfoFromLt(Ltname: string) {
		return this._LtSpeakerRequstInterface.getSpeakerInfoFromLt(Ltname);
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

	async deleteLtSpeakerInfo(Ltname: string, username: string) {
		const data: LtSpeakerData = { data: undefined, error: undefined };
		try {
			const res = await this._LtSpeakerRequstInterface.deleteLtSpeakerInfo(Ltname, username);
		} catch (e) {
			if (e instanceof Error) {
				data.error = { message: e.message };
			}
		}
		return data;
	}
}

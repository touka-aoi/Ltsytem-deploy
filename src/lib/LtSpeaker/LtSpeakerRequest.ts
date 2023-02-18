import type { LtSpeakerInput, LtSpeakerOutput, LtSpeakerRequestInterface } from './LtSpeakerRequestInterface';

export class LtSpeakerRequest {
	private _LtSpeakerRequstInterface: LtSpeakerRequestInterface;

	constructor(LtSpeakerRequest: LtSpeakerRequestInterface) {
		this._LtSpeakerRequstInterface = LtSpeakerRequest;
	}

	async getLtSpeakerInfo(LtID: Number, userID: string) {
		return this._LtSpeakerRequstInterface.getSpeakerInfo(LtID, userID);
	}

	getLtSpeakerInfoFromUserID(userID: string) {
		return this._LtSpeakerRequstInterface.getLtSpeakerInfoFromUser(userID);
	}

	getLtSpeakerInfoFromLtID(LtID: Number) {
		return this._LtSpeakerRequstInterface.getSpeakerInfoFromLtID(LtID);
	}

	async upsertLtSpeakerInfo(LtSpeakerInfo: LtSpeakerInput) {
		return await this._LtSpeakerRequstInterface.upsertLtSpeakerInfo(LtSpeakerInfo);
	}

	async deleteLtSpeakerInfo(LtID: Number, userID: string) {
		return await this._LtSpeakerRequstInterface.deleteLtSpeakerInfo(LtID, userID);
	}
}

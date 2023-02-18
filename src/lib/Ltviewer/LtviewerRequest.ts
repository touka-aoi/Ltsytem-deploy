import type { LtviewerRequestInterface, viewLts, error, Ltviewers } from './LtviewerRequestInterface';

export class LtviewrRequest {
	private _LtviewerRequest;

	constructor(LtviewerRequest: LtviewerRequestInterface) {
		this._LtviewerRequest = LtviewerRequest;
	}

	async getLtviewersFromID(LtID: Number): Promise<Ltviewers> {
		return this._LtviewerRequest.getLtviewersFromID(LtID);
	}

	async getLtsfromUser(userID: string): Promise<viewLts> {
		return this._LtviewerRequest.getLtsfromUser(userID);
	}

	async upsertLtviewer(LtID: Number, userID: string): Promise<error> {
		return this._LtviewerRequest.upsertLtviewer(LtID, userID);
	}

	async delteLtviewer(LtID: Number, userID: string): Promise<error> {
		return this._LtviewerRequest.delteLtviewer(LtID, userID);
	}
}

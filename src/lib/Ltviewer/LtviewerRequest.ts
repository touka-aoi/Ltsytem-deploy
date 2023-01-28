import type { LtviewerRequestInterface, Lts, Ltviewers } from './LtviewerRequestInterface';

interface LtviewerData {
	data: Lts | Ltviewers | undefined;
	error:
		| {
				message: string;
		  }
		| undefined;
}

export class LtviewrRequest {
	private _LtviewerRequest;

	constructor(LtviewerRequest: LtviewerRequestInterface) {
		this._LtviewerRequest = LtviewerRequest;
	}

	async getLtsfromUser(username: string): Promise<Lts> {
		return this._LtviewerRequest.getLtsfromUser(username);
	}

	async getLtviewersfromLtname(Ltname: string): Promise<Ltviewers> {
		return this._LtviewerRequest.getLtviewersfromLtname(Ltname);
	}

	async upsertLtviewer(Ltname: string, username: string): Promise<LtviewerData> {
		let data: LtviewerData = { data: undefined, error: undefined };
		try {
			this._LtviewerRequest.upsertLtviewer(Ltname, username);
		} catch (e) {
			if (e instanceof Error) {
				data.error = { message: e.message };
			}
		}
		return data;
	}
	async delteLtviewer(Ltname: string, username: string): Promise<void> {
		return this._LtviewerRequest.delteLtviewer(Ltname, username);
	}
}

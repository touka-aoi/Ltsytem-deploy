import type { sessionManagserInterface } from './SessionManagerInterface';

export class sessionManagser {
	_sessionManager: sessionManagserInterface;

	constructor(sessionManage: sessionManagserInterface) {
		this._sessionManager = sessionManage;
	}

	async signOut() {
		return this._sessionManager.signOut();
	}
}

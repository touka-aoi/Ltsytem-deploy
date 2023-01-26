import type { ProfileRequestInterface, profile } from './profileRequestInterface';

export class profileRequest {
	_profileRequestInterface: ProfileRequestInterface;

	constructor(profileInterface: ProfileRequestInterface) {
		this._profileRequestInterface = profileInterface;
	}

	getProfile(id: string) {
		return this._profileRequestInterface.getProfile(id);
	}

	getProfileFromUsername(username: string) {
		return this._profileRequestInterface.getProfileFromUsername(username);
	}

	upsertProfile(id: string, userProfile: profile) {
		return this._profileRequestInterface.upsertProfile(id, userProfile);
	}

	deleteProfile(id: string) {
		return this._profileRequestInterface.deleteProfile(id);
	}
}

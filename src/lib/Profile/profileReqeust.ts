import type { ProfileRequestInterface, profile } from './profileRequestInterface';

export class ProfileRequest {
	private _profileRequestInterface: ProfileRequestInterface;

	constructor(profileInterface: ProfileRequestInterface) {
		this._profileRequestInterface = profileInterface;
	}

	insertProfile(userProfile: profile) {
		return this._profileRequestInterface.insertProfile(userProfile);
	}

	getProfile(id: string) {
		return this._profileRequestInterface.getProfile(id);
	}

	getProfileFromUsername(username: string) {
		return this._profileRequestInterface.getProfileFromUsername(username);
	}

	upsertProfile(userProfile: profile) {
		return this._profileRequestInterface.upsertProfile(userProfile);
	}

	deleteProfile(id: string) {
		return this._profileRequestInterface.deleteProfile(id);
	}
}

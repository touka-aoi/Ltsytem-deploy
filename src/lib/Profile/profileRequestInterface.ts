export interface profile {
	id: Number, 
	username: string | undefined;
	avatarURL: string | undefined;
}

export interface profileOutput {
	data: profile | undefined,
	error: error | undefined;
}

export interface error {
	message: string | undefined;
}

export abstract class ProfileRequestInterface {
	abstract getProfile(id: Number): Promise<profileOutput>;
	abstract getProfileFromUsername(username: string): Promise<profileOutput>;
	abstract upsertProfile(userProfile: profile): Promise<error>;
	abstract deleteProfile(id: Number): Promise<error>;
}

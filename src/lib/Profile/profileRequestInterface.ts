export interface profile {
	id: string, 
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
	abstract getProfile(id: string): Promise<profileOutput>;
	abstract getProfileFromUsername(username: string): Promise<profileOutput>;
	abstract upsertProfile(userProfile: profile): Promise<error>;
	abstract deleteProfile(id: string): Promise<error>;
}

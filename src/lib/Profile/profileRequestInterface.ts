export interface profile {
	id: string;
	username: string | undefined;
	avatarURL: string | undefined;
}

export interface profileOutput {
	data: {
		id: string;
		username: string | undefined;
		avatarURL: string | undefined;
	} | undefined;
	error: error | undefined;
}

export interface error {
	message: string | undefined;
}

export abstract class ProfileRequestInterface {
	abstract insertProfile(userProfile: profile): Promise<error>;
	abstract getProfile(id: string): Promise<profileOutput>;
	abstract getProfileFromUsername(username: string): Promise<profileOutput>;
	abstract upsertProfile(userProfile: profile): Promise<error>;
	abstract deleteProfile(id: string): Promise<error>;
}

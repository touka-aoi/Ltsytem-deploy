export interface profile {
	id: string;
	username: string | undefined;
	avatarURL: string | undefined;
}

export interface error {
	message: string;
}

export interface profileOutput {
	data: { id: string; username: string; avatarURL: string };
	error: error;
}

export abstract class ProfileRequestInterface {
	abstract getProfile(id: string): Promise<profileOutput>;
	abstract getProfileFromUsername(username: string): Promise<profileOutput>;
	abstract upsertProfile(userProfile: profile): Promise<error>;
	abstract deleteProfile(id: string): Promise<error>;

	static NULL(): profileOutput {
		return {
			data: { id: '', username: '', avatarURL: '' },
			error: { message: '' }
		};
	}
	static NULLERR(): error {
		return { message: '' };
	}
}

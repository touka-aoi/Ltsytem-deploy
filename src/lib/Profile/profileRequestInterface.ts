export interface profile {
	username: string | null;
	avatar_url: string | null;
}

export interface result {
	data: profile;
	error: string | null;
}

export interface error {
	error: string | null;
}

export abstract class ProfileRequestInterface {
	abstract getProfile(id: string): Promise<result>;
	abstract getProfileFromUsername(username: string): Promise<result>;
	abstract upsertProfile(id: string, userProfile: profile): Promise<result>;
	abstract deleteProfile(id: string): Promise<error>;
}

import { supabase } from '$lib/databaseClient/supabaseClient';
import type { ProfileRequestInterface, profile, profileOutput, error } from './profileRequestInterface';

interface supabaseDataType {
	username: string | undefined;
	id: string,
	avatar_url: string | undefined,
}

function convertProfileType(userData: profile)  {
	const supabaseType: supabaseDataType = {
		username: userData.username,
		id: userData.id,
		avatar_url : userData.avatarURL,
	}
	return supabaseType;
}

export class ProfileRequestSupabase implements ProfileRequestInterface {
	async getProfile(id: string): Promise<profileOutput> {
		let response: profile | undefined = undefined;
		let errMsg: string | undefined = undefined;
		
		try {
			const { data, error, status } = await supabase
				.from('profiles')
				.select('username, avatar_url')
				.eq('id', id)
				.single();

			if (data) {
				response = {
					id: id,
					avatarURL: data.avatar_url,
					username: data.username,
				}
			}
			if (error && status !== 406) throw error;
		} catch (error) {
			if (error instanceof Error) {
				errMsg = error.message;
			}
		}
		return {
			data: response,
			error: {message: errMsg}
		};
	}

	async getProfileFromUsername(username: string): Promise<profileOutput> {
		let response: profile | undefined = undefined;
		let errMsg: string | undefined = undefined;

		try {
			const { data, error, status } = await supabase
				.from('profiles')
				.select('username, avatar_url, id')
				.eq('username', username)
				.single();

			if (data) {
				response = {
					id: data.id,
					avatarURL: data.avatar_url,
					username: data.username,
				}
			}

			if (error && status !== 406) throw error;
		} catch (error) {
			if (error instanceof Error) {
				errMsg = error.message;
			}
		}
		return {
			data: response,
			error: {message: errMsg}
		};
	}

	async upsertProfile(userProfile: profile): Promise<error> {
		const profile = convertProfileType(userProfile);
		let errMsg: string | undefined = undefined;

		try {
			let { data, error } = await supabase
				.from('profiles')
				.upsert(profile)
				.select('username, avatar_url')
				.single();
			
			if (error) throw error;
		} catch (error: any) {
			if (error instanceof Error) {
				errMsg = error.message;
			}
			if (error.code == 23505) {
				errMsg = 'ユーザー名が重複しています';
			}
		}

		return { message: errMsg,};
	}

	async deleteProfile(id: string): Promise<error> {
		let errMsg: string | undefined = undefined;
		try {
			let { error } = await supabase.from('profiles').delete().eq('id', id);

			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				errMsg = error.message;
			}
		}
		return {
			message: errMsg
		};
	}
}

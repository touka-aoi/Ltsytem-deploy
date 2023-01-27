import { supabase } from '$lib/databaseClient/supabaseClient';
import type { ProfileRequestInterface, profile, profileOutput, error } from './profileRequestInterface';

function removeNull(obj: { [key: string]: any }) {
	const newObj = { ...obj };
	Object.keys(newObj).forEach((key) => {
		if (newObj[key] === null) {
			delete newObj[key];
		}
	});
	return newObj;
}

export class ProfileRequestSupabase implements ProfileRequestInterface {
	async getProfile(id: Number): Promise<profileOutput> {
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
		let errMsg: string | undefined = undefined;

		try {
			let { data, error } = await supabase
				.from('profiles')
				.upsert(userProfile)
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

	async deleteProfile(id: Number): Promise<error> {
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

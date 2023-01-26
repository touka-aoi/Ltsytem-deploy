import { supabase } from '$lib/databaseClient/supabaseClient';
import type { ProfileRequestInterface, profile, result, error } from './profileRequestInterface';

function removeNull(obj: { [key: string]: any }) {
	const newObj = { ...obj };
	Object.keys(newObj).forEach((key) => {
		if (newObj[key] === null) {
			delete newObj[key];
		}
	});
	return newObj;
}

export class supabaseProfileRequest implements ProfileRequestInterface {
	async getProfile(id: string): Promise<result> {
		let username: string | null = null;
		let avatar_url: string | null = null;
		let err: string | null = null;

		try {
			const { data, error, status } = await supabase
				.from('profiles')
				.select('username, avatar_url')
				.eq('id', id)
				.single();

			if (data) {
				username = data.username;
				avatar_url = data.avatar_url;
			}
			if (error && status !== 406) throw error;
		} catch (error) {
			if (error instanceof Error) {
				err = error.message;
			}
		}
		return {
			data: {
				username: username,
				avatar_url: avatar_url
			},
			error: err
		};
	}

	async getProfileFromUsername(username: string): Promise<result> {
		let usrname: string | null = null;
		let avatar_url: string | null = null;
		let err: string | null = null;

		try {
			const { data, error, status } = await supabase
				.from('profiles')
				.select('username, avatar_url')
				.eq('username', username)
				.single();

			if (data) {
				usrname = data.username;
				avatar_url = data.avatar_url;
			}

			if (error && status !== 406) throw error;
		} catch (error) {
			if (error instanceof Error) {
				err = error.message;
			}
		}
		return {
			data: {
				username: usrname,
				avatar_url: avatar_url
			},
			error: err
		};
	}

	async upsertProfile(id: string, userProfile: profile): Promise<result> {
		let err: string | null = null;
		let usernmae: string | null = null;
		let avatar_url: string | null = null;

		try {
			const updates = {
				id: id,
				...removeNull(userProfile),
				updated_at: new Date()
			};

			let { data, error } = await supabase
				.from('profiles')
				.upsert(updates)
				.select('username, avatar_url')
				.single();

			if (data) {
				usernmae = data.username;
				avatar_url = data.avatar_url;
			}
			console.log(error);

			if (error) throw error;
		} catch (error: any) {
			if (error instanceof Error) {
				err = error.message;
			}
			if (error.code == 23505) {
				err = 'ユーザー名が重複しています';
			}
		}
		return {
			data: {
				username: usernmae,
				avatar_url: avatar_url
			},
			error: err
		};
	}

	async deleteProfile(id: string): Promise<error> {
		let err: string | null = null;
		try {
			let { error } = await supabase.from('profiles').delete().eq('id', id);

			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				err = error.message;
			}
		}
		return {
			error: err
		};
	}
}

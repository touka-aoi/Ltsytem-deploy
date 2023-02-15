import { supabase } from '$lib/databaseClient/supabaseClient';
import type { ProfileRequestInterface, profile, profileOutput, error } from './profileRequestInterface';

export class ProfileRequestSupabase implements ProfileRequestInterface {
	async insertProfile(userProfile: profile): Promise<error> {
		// 翻訳
		const profile = {
			username: userProfile.username,
			id: userProfile.id,
			avatar_url: userProfile.avatarURL,
		}
		// エラーメッセージ
		let errMsg: string | undefined = undefined;

		try {
			let { data, error } = await supabase.from('profiles').insert(profile);

			if (error) throw error;
		} catch (error: any) {
			if (error instanceof Error) {
				errMsg = error.message;
			}
			if (error.code == 23505) {
				errMsg = 'ユーザー名が重複しています';
			}
		}

		return { message: errMsg };
	}

	async getProfile(id: string): Promise<profileOutput> {
		let response;
		let errMsg: string | undefined = undefined;

		try {
			const { data, error, status } = await supabase.from('profiles').select('username, avatar_url').eq('id', id).single();

			if (data) {
				response = {
					id: id,
					avatarURL: data.avatar_url,
					username: data.username,
				};
			}
			if (error && status !== 406) throw error;
		} catch (error) {
			if (error instanceof Error) {
				errMsg = error.message;
			}
		}
		return {
			data: response,
			error: { message: errMsg }
		};
	}

	async getProfileFromUsername(username: string): Promise<profileOutput> {
		let response = undefined;
		let errMsg: string | undefined = undefined;

		try {
			const { data, error, status } = await supabase.from('profiles').select('username, avatar_url, id').eq('username', username).single();

			if (data) {
				response = {
					id: data.id,
					avatarURL: data.avatar_url,
					username: data.username,
				};
			}

			if (error && status !== 406) throw error;
		} catch (error) {
			if (error instanceof Error) {
				errMsg = error.message;
			}
		}
		return {
			data: response,
			error: { message: errMsg }
		};
	}

	async upsertProfile(userProfile: profile): Promise<error> {
		const profile = {
			id: userProfile.id,
			avatar_url: userProfile.avatarURL,
			username: userProfile.username,
		}

		let errMsg: string | undefined = undefined;

		try {
			let { data, error } = await supabase.from('profiles').upsert(profile);

			if (error) throw error;
		} catch (error: any) {
			if (error instanceof Error) {
				errMsg = error.message;
			}
			if (error.code == 23505) {
				errMsg = 'ユーザー名が重複しています';
			}
		}

		return { message: errMsg };
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

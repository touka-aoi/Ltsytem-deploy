import { supabase } from '$lib/databaseClient/supabaseClient';
import type { AvatarRequestInterface, avatarInput, avatarOutput } from './avatarRequestInterface';

export class AvatarRequestSupabase implements AvatarRequestInterface {
	async uploadAvatar(fileuploaData: avatarInput): Promise<avatarOutput> {
		let errMsg: string | undefined = undefined;
		const { filename, file } = fileuploaData;
		try {
			const { error } = await supabase.storage.from('avatars').upload(filename, file);
			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				errMsg = error.message;
			}
		}
		return { fileUrl: undefined, error: { message: errMsg } };
	}

	async downloadAvatar(filepath: string): Promise<avatarOutput> {
		let avatarURL: string | undefined = undefined;
		let errMsg: string | undefined = undefined;
		try {
			const { data, error } = await supabase.storage.from('avatars').download(filepath);
			if (error) {
				throw error;
			}
			avatarURL = URL.createObjectURL(data);
		} catch (error) {
			if (error instanceof Error) {
				errMsg = error.message;
			}
		}
		return { fileUrl: avatarURL, error: { message: errMsg } };
	}

	async deleteAvatar(filename: string): Promise<avatarOutput> {
		let errMsg: string | undefined = undefined;
		try {
			const { data, error } = await supabase.storage.from('avatars').remove([filename]);
			if (error) {
				throw error;
			}
		} catch (error) {
			if (error instanceof Error) {
				errMsg = error.message;
			}
		}
		return { fileUrl: undefined, error: { message: errMsg } };
	}
}

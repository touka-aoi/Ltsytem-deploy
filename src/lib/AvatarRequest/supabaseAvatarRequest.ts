import { supabase } from '$lib/databaseClient/supabaseClient';
import type {
	fileRequestInterface,
	result,
	fileuploadInput,
	downloadFileOutput
} from './fileRequestInterface';

export class supabaseAvatarRequest implements fileRequestInterface {
	async uploadFile(fileuploaData: fileuploadInput): Promise<result> {
		let err: string | null = null;
		const { filename, file } = fileuploaData;
		try {
			const { error } = await supabase.storage.from('avatars').upload(filename, file);
			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				err = error.message;
			}
		}
		return { error: err };
	}

	async donwlodFile(filepath: string): Promise<downloadFileOutput> {
		let url: string | null = null;
		let err: string | null = null;
		try {
			const { data, error } = await supabase.storage.from('avatars').download(filepath);
			if (error) {
				throw error;
			}
			url = URL.createObjectURL(data);
		} catch (error) {
			if (error instanceof Error) {
				err = error.message;
			}
		}
		return {
			fileUrl: url,
			error: err
		};
	}

	async deleteFile(filename: string): Promise<result> {
		let err: string | null = null;
		try {
			const { data, error } = await supabase.storage.from('avatars').remove([filename]);
			if (error) {
				throw error;
			}
		} catch (error) {
			if (error instanceof Error) {
				err = error.message;
			}
		}
		return { error: err };
	}
}

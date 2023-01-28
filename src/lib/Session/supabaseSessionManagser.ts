import type { result, sessionManagserInterface } from './SessionManagerInterface';
import { supabase } from '$lib/databaseClient/supabaseClient';

export class supabaseSessionManager implements sessionManagserInterface {
	async signOut(): Promise<result> {
		let res: result = { error: null };
		try {
			let { error } = await supabase.auth.signOut();
			if (error) throw error;
			res = { error: null };
		} catch (error) {
			if (error instanceof Error) {
				res = { error: error.message };
			}
		}
		return res;
	}
}

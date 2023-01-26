import type { PageLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
import { Account } from '$lib/Account';

export const load: PageLoad = async (event) => {
	// supabaseのsessionを取得する
	const { session } = await getSupabase(event);

	const request = new Account();

	// ユーザーID保持時はホームに
	if (session) {
		const {
			user: { id }
		} = session;
		const {
			data: { username }
		} = await request.getProfile(id);
		if (username) {
			throw redirect(307, '/');
		}
	}
	// 非ログイン時はホームに
	else {
		throw redirect(307, '/');
	}
};

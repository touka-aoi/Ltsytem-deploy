import type { LayoutServerLoad } from './$types';
import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import { Account } from '$lib/Account';
import { userState } from '$lib/userState';

export const load: LayoutServerLoad = async (event) => {
	const session = await getServerSession(event);
	if (session) {
		const request = new Account();
		const {
			user: { id }
		} = session;
		const {
			data: { username }
		} = await request.getProfile(id);
		if (username) {
			userState.set({
				userId: id,
				username: username
			});
		}
	} else {
		userState.set({
			userId: '',
			username: ''
		});
	}

	return {
		// supabaseのsessionを取得する
		session: session
	};
};

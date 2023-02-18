import type { LayoutServerLoad } from './$types';
import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import { Account } from '$lib/AccountsFacade';
import { redirect } from '@sveltejs/kit';

const accountService = new Account();

export const load: LayoutServerLoad = async (event) => {
	const session = await getServerSession(event);
	const path = event.url.pathname;
	if (session) {
		
		const {
			user: { id }
		} = session;
		const { data } = await accountService.profileRequest.getProfile(id);
		const isUsername = data?.username;
		if (!isUsername && path != '/register') {
			throw redirect(307, '/register');
		} else {
			if (path == '/register') {
				throw redirect(307, '/');
			}
		}
	} else {
		if (path == '/users/preference') {
			throw redirect(307, '/');
		}
	}
	return {
		session: session
	};
};

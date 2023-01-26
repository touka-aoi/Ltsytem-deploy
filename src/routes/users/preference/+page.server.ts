import type { PageServerLoad } from './$types';
import { Account } from '$lib/Account';
import { userState } from '../../../lib/userState';

export const load: PageServerLoad = async (event) => {
	const request = new Account();
	let avatarUrl: string | null = null;

	let loginUsername: string = '';
	let loginUserId: string = '';
	const unsbscribe = userState.subscribe((value) => {
		loginUsername = value.username;
		loginUserId = value.userId;
	});
	unsbscribe();

	const {
		data: { avatar_url }
	} = await request.getProfileFromUsername(loginUsername);

	avatarUrl = avatar_url;
	return {
		user: loginUsername,
		userId: loginUserId,
		avatarUrl: avatarUrl
	};
};

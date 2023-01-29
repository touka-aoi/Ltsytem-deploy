import type { PageServerLoad } from './$types';
import { Account } from '$lib/Account';

export const load: PageServerLoad = async (event) => {
	const request = new Account();
	const session = await request.getSession(event);

	let avatarURL: string | undefined = undefined;
	let loginUsername: string = '';
	let loginUserId: string = '';

	if (session) {
		const { data } = await request.profileRequest.getProfile(session.user.id);
		if (data) {
			avatarURL = data.avatarURL;
			loginUserId = data.id;
			loginUsername = data.username as string;
		}
	}
	return {
		user: loginUsername,
		userId: loginUserId,
		avatarURL: avatarURL
	};
};

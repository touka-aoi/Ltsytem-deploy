import { ProfileRequest } from '$lib/Profile/profileReqeust';
import { ProfileRequestSupabase } from '$lib/Profile/profileRequestSupabase';
import { AvatarRequest } from '$lib/Avatar/avatarRequest';
import { AvatarRequestSupabase } from '$lib/Avatar/avatarRequestSupabase';
import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import type { ServerLoadEvent } from '@sveltejs/kit';

export class Account {
	profileRequest: ProfileRequest;
	avatarRequest: AvatarRequest;

	constructor() {
		this.profileRequest = new ProfileRequest(new ProfileRequestSupabase());
		this.avatarRequest = new AvatarRequest(new AvatarRequestSupabase());
	}

	async getSession(event: ServerLoadEvent) {
		const session = await getServerSession(event);
		return session;
	}
}

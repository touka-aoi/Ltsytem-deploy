import { sessionManagser } from '$lib/Session/SessionManager';
import { supabaseSessionManager } from '$lib/Session/supabaseSessionManagser';

export class Session {
	request: sessionManagser;
	constructor() {
		this.request = new sessionManagser(new supabaseSessionManager());
	}

	async signOut() {
		const { error } = await this.request.signOut();
		return error;
	}
}

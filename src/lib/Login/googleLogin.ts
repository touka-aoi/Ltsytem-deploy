import type { SupabaseClient } from '@supabase/supabase-js';

export async function signInWithGoogle(supabase: SupabaseClient<any, 'public', any>) {
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options : {
			redirectTo: "www.touka-dev.net",
		}
	});
}

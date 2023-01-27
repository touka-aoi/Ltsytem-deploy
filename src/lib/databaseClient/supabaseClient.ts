import { createClient } from '@supabase/auth-helpers-sveltekit';
import { env } from '$env/dynamic/public';

console.log(env.PUBLIC_SUPABASE_KEY);
console.log(env.PUBLIC_SUPABASE_URL);

export const supabase = createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_KEY);

import { createClient } from '@supabase/auth-helpers-sveltekit';

export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

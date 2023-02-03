import '$lib/databaseClient/supabaseClient';

import pkg from 'pg';
const { Pool } = pkg;


export const pool = new Pool({
	host: import.meta.env.VITE_POSTGRES_HOST,
	database: import.meta.env.VITE_POSTGRES_DB,
	user: import.meta.env.VITE_POSTGRES_USER,
	password: import.meta.env.VITE_POSTGRES_PASS,
	ssl: true
});

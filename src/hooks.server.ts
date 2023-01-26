import '$lib/databaseClient/supabaseClient';
import { Pool } from 'pg';
import { POSTGRES_HOST, POSTGRES_PASS, POSTGRES_USER, POSRGRES_DB } from '$env/static/private';

export const pool = new Pool({
	host: POSTGRES_HOST,
	database: POSRGRES_DB,
	user: POSTGRES_USER,
	password: POSTGRES_PASS,
	ssl: true
});

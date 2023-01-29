import type { Ltviewers, LtviewerRequestInterface, Lts } from '$lib/Ltviewer/LtviewerRequestInterface';
import { pool } from '../../hooks.server';
import type { Pool } from 'pg';

interface ltviewerData {
	id: Number;
	username: string;
	ltname: string;
}

export class LtviewerRequestPostgresql implements LtviewerRequestInterface {
	private client: Pool;

	constructor() {
		this.client = pool;
	}

	async getLtsfromUser(username: string): Promise<Lts> {
		const res = await this.client.query('SELECT * FROM LtViewerInfo Where username = $1', [username]);
		const Lts: Array<ltviewerData> = res.rows;
		const ltviewrs = Lts.map((ele) => {
			return ele.ltname;
		});
		return { Ltnames: ltviewrs };
	}
	async getLtviewersfromLtname(Ltname: string): Promise<Ltviewers> {
		const res = await this.client.query('SELECT * FROM LtViewerInfo Where ltname = $1', [Ltname]);
		const Lts: Array<ltviewerData> = res.rows;
		const ltviewrs = Lts.map((ele) => {
			return ele.username;
		});
		return { usernames: ltviewrs };
	}

	async upsertLtviewer(Ltname: string, username: string): Promise<void> {
		const res = await this.client.query(
			`
    INSERT INTO LtViewerInfo (ltname, username)
    VALUES ($1, $2)
    ON CONFLICT ON CONSTRAINT ltviewerinfo_username_ltname_key
    DO UPDATE SET ltname=$1, username=$2
    `,
			[Ltname, username]
		);
	}

	async delteLtviewer(Ltname: string, username: string): Promise<void> {
		const res = await this.client.query(
			`
      DELETE FROM LtViewerInfo WHERE ltname = $1 AND username = $2
    `,
			[Ltname, username]
		);
	}
}

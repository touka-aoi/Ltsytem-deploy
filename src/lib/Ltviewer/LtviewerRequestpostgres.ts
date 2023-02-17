import type { Ltviewers, viewLts, error } from '$lib/Ltviewer/LtviewerRequestInterface';
import {LtviewerRequestInterface} from '$lib/Ltviewer/LtviewerRequestInterface';
import { pool } from '../../hooks.server';
import type { Pool } from 'pg';

export class LtviewerRequestPostgresql implements LtviewerRequestInterface {
	private client: Pool;

	constructor() {
		this.client = pool;
	}

	async getLtviewersFromID(LtID: Number): Promise<Ltviewers> {
		let response = LtviewerRequestInterface.NULLVIEWER;
		try {
			const res = await this.client.query('SELECT userid FROM LtViewerInfo Where ltid = $1', [LtID]);
			const viewers: Array<{userid: string}> = res.rows;			
			response.data = viewers;
		} catch (e) {
			if (e instanceof Error) {
				response.error = {message: e.message};
			}
		}
		return response;
	}

	async getLtsfromUser(userID: string): Promise<viewLts> {
		let response = LtviewerRequestInterface.NULLLTS;
		try {
			const res = await this.client.query('SELECT ltid FROM LtViewerInfo Where userid = $1', [userID]);
			const Lts: Array<{ltid: Number}>  = res.rows;
			response.data = Lts;
		} catch (e) {
			if (e instanceof Error) {
				response.error = {message: e.message};
			}
		}
		return response;
	}

	async upsertLtviewer(LtID: Number, userID: string): Promise<error> {
		let response = LtviewerRequestInterface.NULLERR;
		try {
			const res = await this.client.query(
				`
			INSERT INTO LtViewerInfo (ltid, userid)
			VALUES ($1, $2)
			ON CONFLICT ON CONSTRAINT ltviewerinfo_userid_ltid_key
			DO UPDATE SET ltid=$1, userid=$2
			`,
				[LtID, userID]
			);
		} catch (e) {
			if (e instanceof Error) {
				response = {message: e.message};
			}
		}
		return response;
	}

	async delteLtviewer(LtID: Number, userID: string): Promise<error> {
		let response = LtviewerRequestInterface.NULLERR;
		try {
			const res = await this.client.query(
				`DELETE FROM LtViewerInfo WHERE ltid = $1 AND userid = $2`,
				[LtID, userID]
			);
		} catch (e) {
			if (e instanceof Error) {
				response = {message: e.message};
			}
		}
		return response;
	}
}

import type { LtInfoInput, LtInfoOutput, error } from './LtHoldRequstInterface';
import { LtHoldRequestInterface } from './LtHoldRequstInterface';
import type { Pool } from 'pg';
import { pool } from '../../hooks.server';

interface postgresqlData {
	id: Number;
	ltname: string;
	description: string;
	maxmem: Number;
	holddate: Date;
	holdplace: string;
}

function convertData(data: postgresqlData) {
	const convData = {
		id: data.id,
		name: data.ltname,
		desc: data.description,
		maxMem: data.maxmem,
		holdDate: new Date(data.holddate),
		holdPlace: data.holdplace
	};
	return convData;
}

export class LtHoldRequestPostgresql implements LtHoldRequestInterface {
	private client: Pool;

	constructor() {
		this.client = pool;
	}

	async connect() {	await this.client.connect(); }

	async getLtInfoFromId(id: Number): Promise<LtInfoOutput> {
		let response = LtHoldRequestInterface.NULL();
		try {
			const res = await this.client.query('SELECT * FROM Ltinfo WHERE id = $1', [id]);
			const Lt: postgresqlData = res.rows.at(0);
			response.data = [convertData(Lt)];
		} catch (e) {
			if (e instanceof Error) response.error = {message: e.message};
		}
		return response;
	}

	// 最新50件のLT開催データを取得する
	async getLatestLts(): Promise<LtInfoOutput> {
		let response = LtHoldRequestInterface.NULL();
		try {
			const res = await this.client.query('SELECT * FROM Ltinfo ORDER BY holdDate DESC LIMIT 50');
			const Lt: Array<postgresqlData> = res.rows;
			const LtInfo = Lt.map(convertData);
			response.data = LtInfo;
		} catch (e) {
			if (e instanceof Error) response.error = {message: e.message};
		}
		return response;
	}

	async upsertLtInfo(LtPrincipal: LtInfoInput): Promise<error> {
		throw new Error('Method not implemented.');
	}

	deleteLtInfo(id: Number): Promise<error> {
		throw new Error('Method not implemented.');
	}
}


import type { LtHoldRequestInterface, LtInfoInput, LtInfoOutput } from './LtHoldRequstInterface';
import type { Pool } from 'pg';
import { env } from '$env/dynamic/public';
import { pool } from '../../hooks.server';

interface postgresqlData {
	id: Number;
	ltname: string;
	description: string;
	maxmem: Number;
	holddate: Date;
	holdplace: string;
}

/**
 * Lt開催情報をPostgresqlから取得するクラス
 * 取得したデータを変換するところまで責任を負う
 */
export class LtHoldRequestPostgresql implements LtHoldRequestInterface {
	private client: Pool;

	constructor() {
		// SQLクライアント作成
		// this.client = new Client({
		//   host: env.PUBLIC_POSTGRES_HOST,
		//   database: env.PUBLIC_POSRGRES_DB,
		//   user: env.PUBLIC_POSTGRES_USER,
		//   password: env.PUBLIC_POSTGRES_PASS,
		//   ssl: true,
		// })
		// this.connect();
		this.client = pool;
	}

	/**
	 * SQLに接続
	 */
	async connect() {
		await this.client.connect();
	}

	async getLtInfoFromId(id: string): Promise<LtInfoOutput> {
		const res = await this.client.query('SELECT * FROM Ltinfo WHERE id = $1', [id]);
		// 取得する値がない場合
		if (res.rows.length == 0) throw new Error('指定された行が見つかりません');
		// データ取得
		const Lt = res.rows.at(0);
		// ユースケースに変換
		const out = LtHoldRequestPostgresql.convertData(Lt);
		return out;
	}

	async getLtInfofromName(Ltnmae: string): Promise<LtInfoOutput> {
		const res = await this.client.query('SELECT * FROM Ltinfo WHERE Ltname = $1', [Ltnmae]);
		if (res.rows.length == 0) throw new Error('指定された行が見つかりません');
		// データ取得
		const Lt = res.rows.at(0);
		// ユースケースに変換
		const out = LtHoldRequestPostgresql.convertData(Lt);
		return out;
	}

	async getLatestLt(): Promise<LtInfoOutput> {
		const res = await this.client.query('SELECT * FROM Ltinfo ORDER BY holdDate DESC LIMIT 1');
		const Lt = res.rows.at(0);
		// await this.client.end();
		const out = LtHoldRequestPostgresql.convertData(Lt);
		return out;
	}

	async upsertLtInfo(LtPrincipal: LtInfoInput): Promise<void> {
		const res = await this.client.query(
			`
      INSERT INTO Ltinfo (Ltname, description, maxMem, holdDate, holdPlace)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (Ltname)
      DO UPDATE SET (description, maxMem, holdDate, holdPlace) = (EXCLUDED.description, EXCLUDED.maxMem, EXCLUDED.holdDate, EXCLUDED.holdPlace)
    `,
			[LtPrincipal['name'], LtPrincipal['desc'], LtPrincipal['maxMem'], LtPrincipal['holdDate'], LtPrincipal['holdPlace']]
		);
		// await this.client.end();
	}

	deleteLtInfo(id: string): Promise<void> {
		throw new Error('Method not implemented.');
	}

	async delteLtInfoFromName(Ltname: string): Promise<void> {
		const res = await this.client.query(`DELETE FROM LtInfo WHERE ltname = $1`, [Ltname]);
		// await this.client.end();
	}

	static convertData(data: postgresqlData): LtInfoOutput {
		const convData: LtInfoOutput = {
			id: data.id,
			name: data.ltname,
			desc: data.description,
			maxMem: data.maxmem,
			holdDate: new Date(data.holddate),
			holdPlace: data.holdplace
		};
		return convData;
	}
}

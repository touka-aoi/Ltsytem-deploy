import type {
	LtSpeakerRequestInterface,
	LtSpeakerInput,
	LtSpeakerOutput
} from './LtSpeakerRequestInterface';
import type { Pool } from 'pg';
import { env } from '$env/dynamic/public';
import { pool } from '../../hooks.server';

interface postgresqlData {
	id: Number;
	ltname: string;
	username: string;
	ltlink: string;
	lttitle: string;
	ltcomment: string;
}

function convertData(data: postgresqlData): LtSpeakerOutput {
	const convData: LtSpeakerOutput = {
		id: data.id,
		Ltname: data.ltname,
		username: data.username,
		LtComment: data.ltcomment,
		LtLink: data.ltlink,
		LtTitle: data.lttitle
	};
	return convData;
}

export class LtSpeakerRequestPostgresql implements LtSpeakerRequestInterface {
	private client: Pool;

	constructor() {
		// this.client = new Client({
		//   host: env.PUBLIC_POSTGRES_HOST,
		//   database: env.PUBLIC_POSRGRES_DB,
		//   user: env.PUBLIC_POSTGRES_USER,
		//   password: env.PUBLIC_POSTGRES_PASS,
		//   ssl: true,
		// })
		this.client = pool;
		// this.connect();
	}

	async connect() {
		await this.client.connect();
	}

	// 特定のユーザーの特定のLT情報を持ってくる
	async getSpeakerInfo(Ltname: string, username: string): Promise<LtSpeakerOutput> {
		const res = await this.client.query(
			'SELECT * FROM LtSpeakerInfo Where Ltname = $1 AND username = $2 ',
			[Ltname, username]
		);
		const Lt = res.rows.at(0);
		if (Lt == undefined) throw new Error('指定された行が見つかりません');
		const out = convertData(Lt);
		return out;
	}

	// ユーザーの最新10件のLT情報を持ってくる
	async getLtSpeakerInfoFromUser(username: string): Promise<LtSpeakerOutput[]> {
		const res = await this.client.query('SELECT * FROM LtSpeakerInfo Where username = $1 ', [
			username
		]);
		const Lts = res.rows;
		const convSpeakers = Lts.map(convertData);
		return convSpeakers;
	}

	// Lt名から特定のLTの情報を持ってくるめ
	async getSpeakerInfoFromLt(Ltname: string): Promise<LtSpeakerOutput[]> {
		const res = await this.client.query('SELECT * FROM LtSpeakerInfo Where ltname = $1 ', [Ltname]);
		const speakers = res.rows;
		const convSpeakers = speakers.map(convertData);
		return convSpeakers;
	}

	// LT情報を登録する
	async upsertLtSpeakerInfo(LtSeakerInfo: LtSpeakerInput): Promise<void> {
		const res = await this.client.query(
			`
    INSERT INTO LtSpeakerInfo (Ltname, username, LtLink, LtTitle, LtComment)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT ON CONSTRAINT unique_ltname_username
    DO UPDATE SET Ltname=$1, username=$2, LtLink=$3, LtTitle=$4, LtComment=$5
    `,
			[
				LtSeakerInfo['Ltname'],
				LtSeakerInfo['username'],
				LtSeakerInfo['LtLink'],
				LtSeakerInfo['LtTitle'],
				LtSeakerInfo['LtComment']
			]
		);
	}

	async deleteLtSpeakerInfo(Ltname: string, username: string): Promise<void> {
		const res = await this.client.query(
			`DELETE FROM LtSpeakerInfo WHERE ltname = $1 AND username = $2`,
			[Ltname, username]
		);
	}
}

import type { LtSpeakerRequestInterface, LtSpeakerInput, LtSpeakerOutput } from './LtSpeakerRequestInterface';
import type { Pool } from 'pg';
import { pool } from '../../hooks.server';

interface postgresqlData {
	id: Number;
	ltid: Number;
	userid: string;
	ltname: string;
	ltlink: string;
	lttitle: string;
	ltcomment: string;
	tags: Array<string>;
}

function convertData(data: postgresqlData): LtSpeakerOutput {
	const convData: LtSpeakerOutput = {
		id: data.id,
		userID: data.userid,
		LtID: data.ltid,
		Ltname: data.ltname,
		LtComment: data.ltcomment,
		LtLink: data.ltlink,
		LtTitle: data.lttitle,
		tags: data.tags
	};
	return convData;
}

export class LtSpeakerRequestPostgresql implements LtSpeakerRequestInterface {
	private client: Pool;

	constructor() {
		this.client = pool;
	}

	async connect() {
		await this.client.connect();
	}

	// 特定のユーザーの特定のLT情報を持ってくる
	async getSpeakerInfo(LtId: Number, useid: string): Promise<LtSpeakerOutput> {
		const res = await this.client.query('SELECT * FROM LtSpeakerInfo Where ltid = $1 AND userid = $2 ', [LtId, useid]);
		const Lt = res.rows.at(0);
		if (Lt == undefined) return Lt;
		const out = convertData(Lt);
		return out;
	}

	// ユーザーの最新10件のLT情報を持ってくる
	async getLtSpeakerInfoFromUser(userId: string): Promise<LtSpeakerOutput[]> {
		const res = await this.client.query('SELECT * FROM LtSpeakerInfo Where userid = $1 ', [userId]);
		const Lts = res.rows;
		const convSpeakers = Lts.map(convertData);
		return convSpeakers;
	}

	// Lt名から特定のLTの情報を持ってくるめ
	async getSpeakerInfoFromLtID(LtId: Number): Promise<LtSpeakerOutput[]> {
		const res = await this.client.query('SELECT * FROM LtSpeakerInfo Where ltid = $1 ', [LtId]);
		const speakers = res.rows;
		const convSpeakers = speakers.map(convertData);
		return convSpeakers;
	}

	// LT情報を登録する
	async upsertLtSpeakerInfo(LtSeakerInfo: LtSpeakerInput): Promise<void> {
		const res = await this.client.query(
			`
    INSERT INTO LtSpeakerInfo (Ltname, LtLink, LtTitle, LtComment, userid, LtId, tags)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT ON CONSTRAINT unique_ltid_userid
    DO UPDATE SET Ltname=$1,  LtLink=$2, LtTitle=$3, LtComment=$4, userid=$5, LtId=$6, tags=$7
    `,
			[LtSeakerInfo['Ltname'],  LtSeakerInfo['LtLink'], LtSeakerInfo['LtTitle'], LtSeakerInfo['LtComment'], LtSeakerInfo["userID"], LtSeakerInfo["LtID"], LtSeakerInfo["tags"]]
		);
	}

	async deleteLtSpeakerInfo(LtId: Number, userId: string): Promise<void> {
		const res = await this.client.query(`DELETE FROM LtSpeakerInfo WHERE ltid = $1 AND userid = $2`, [LtId, userId]);
	}
}

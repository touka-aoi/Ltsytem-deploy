import type { LtSpeakerInput, LtSpeakerOutput, error, userLtSpeakAndHoldInformation } from './LtSpeakerRequestInterface';
import { LtSpeakerRequestInterface } from './LtSpeakerRequestInterface';
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

function convertData(data: postgresqlData) {
	const convData = {
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

function convertData2(data: any) {
	const convData = {
		id: data.id,
		userID: data.userid,
		assignMem: 0,
		LtID: data.ltid,
		Ltname: data.ltname,
		LtComment: data.ltcomment,
		LtLink: data.ltlink,
		LtTitle: data.lttitle,
		tags: data.tags,
		maxMem: data.maxmem,
		holdDate: data.holddate,
		holdPlace: data.holdplace,
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

	async getLtSpeakerAndLtHoldInfoFromUserID(userID: string): Promise<userLtSpeakAndHoldInformation> {
		let response = LtSpeakerRequestInterface.NULLLT();
		try {
			const res = await this.client.query(`
						SELECT * 
							FROM LtSpeakerInfo 
							INNER JOIN ltinfo on ltinfo.id = LtSpeakerInfo.ltid
						Where userid = $1
						`, [userID]);
			const Lts = res.rows.map(convertData2);
			response.data = Lts;
		} catch (e) {
			if (e instanceof Error) response.error = { message: e.message };
		}
		return response;
	}

	// 特定のユーザーの特定のLT情報を持ってくる
	async getSpeakerInfo(LtId: Number, useid: string): Promise<LtSpeakerOutput> {
		let response = LtSpeakerRequestInterface.NULL();
		try {
			const res = await this.client.query('SELECT * FROM LtSpeakerInfo Where ltid = $1 AND userid = $2 ', [LtId, useid]);
			const Lt = res.rows.at(0);
			response.data = [convertData(Lt)];
		} catch (e) {
			if (e instanceof Error) response.error = { message: e.message };
		}
		return response;
	}

	// ユーザーの最新10件のLT情報を持ってくる
	async getLtSpeakerInfoFromUser(userId: string): Promise<LtSpeakerOutput> {
		let response = LtSpeakerRequestInterface.NULL();
		try {
			const res = await this.client.query('SELECT * FROM LtSpeakerInfo Where userid = $1 ', [userId]);
			const Lts = res.rows;
			const speakerData = Lts.map(convertData);
			response.data = speakerData;
		} catch (e) {
			if (e instanceof Error) response.error = { message: e.message };
		}
		return response;
	}

	// Lt名から特定のLTの情報を持ってくる
	async getSpeakerInfoFromLtID(LtId: Number): Promise<LtSpeakerOutput> {
		let response = LtSpeakerRequestInterface.NULL();
		try {
			const res = await this.client.query('SELECT * FROM LtSpeakerInfo Where ltid = $1 ', [LtId]);
			const speakers = res.rows;
			const convSpeakers = speakers.map(convertData);
			response.data = convSpeakers;
		} catch (e) {
			if (e instanceof Error) response.error = { message: e.message };
		}
		return response;
	}

	// LT情報を登録する
	async upsertLtSpeakerInfo(LtSeakerInfo: LtSpeakerInput): Promise<error> {
		let response = LtSpeakerRequestInterface.NULLERR();
		try {
			const res = await this.client.query(
				`
			INSERT INTO LtSpeakerInfo (Ltname, LtLink, LtTitle, LtComment, userid, LtId, tags)
			VALUES ($1, $2, $3, $4, $5, $6, $7)
			ON CONFLICT ON CONSTRAINT unique_ltid_userid
			DO UPDATE SET Ltname=$1,  LtLink=$2, LtTitle=$3, LtComment=$4, userid=$5, LtId=$6, tags=$7
			`,
				[LtSeakerInfo['Ltname'], LtSeakerInfo['LtLink'], LtSeakerInfo['LtTitle'], LtSeakerInfo['LtComment'], LtSeakerInfo['userID'], LtSeakerInfo['LtID'], LtSeakerInfo['tags']]
			);
		} catch (e) {
			if (e instanceof Error) response = { message: e.message };
		}
		return response;
	}

	async deleteLtSpeakerInfo(LtId: Number, userId: string): Promise<error> {
		let response = LtSpeakerRequestInterface.NULLERR();
		try {
			const res = await this.client.query(`DELETE FROM LtSpeakerInfo WHERE ltid = $1 AND userid = $2`, [LtId, userId]);
		} catch (e) {
			if (e instanceof Error) response = { message: e.message };
		}
		return response;
	}
}

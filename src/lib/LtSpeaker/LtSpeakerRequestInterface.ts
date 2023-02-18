export interface LtSpeakerInput {
	LtID: Number;
	userID: string;
	Ltname: string;
	LtLink?: string;
	LtTitle?: string;
	LtComment?: string;
	tags: Array<string>;
}

export interface speakerInformation {
	id: Number;
	Ltname: string;
	LtID: Number;
	userID: string;
	LtLink: string;
	LtTitle: string;
	LtComment: string;
	tags: Array<string>;
}

export interface LtSpeakerOutput {
	data : Array<speakerInformation>,
	error : error
}

export interface error {
	message: string;
}

export abstract class LtSpeakerRequestInterface {
	// 特定のユーザーの特定のLT情報を持ってくる
	abstract getSpeakerInfo(LtId: Number, username: string): Promise<LtSpeakerOutput>;
	// ユーザーの最新10件のLT情報を持ってくる
	abstract getLtSpeakerInfoFromUser(username: string): Promise<LtSpeakerOutput>;
	// 特定のLTの情報を持ってくるめ
	abstract getSpeakerInfoFromLtID(LtId: Number): Promise<LtSpeakerOutput>;
	// LT情報を登録する
	abstract upsertLtSpeakerInfo(LtRegisterInfo: LtSpeakerInput): Promise<error>;
	// 特定のユーザーの特定のlT情報を削除する
	abstract deleteLtSpeakerInfo(LtId: Number, username: string): Promise<error>;

	static NULL(): LtSpeakerOutput {
		const Null = {
			data: [{
				id: 0,
				Ltname: "",
				LtID: 0,
				userID: "",
				LtLink: "",
				LtTitle: "",
				LtComment: "",
				tags: [],
			}],
			error: {message: ""},
		}
		return Null;
	}
	
	static NULLERR(): error {
		const Null = {message: ""};
		return Null;
	}
}

export interface LtSpeakerInput {
	LtID: Number;
	userID: string;
	Ltname: string;
	username: string;
	LtLink?: string;
	LtTitle?: string;
	LtComment?: string;
}

export interface LtSpeakerOutput {
	id: Number;
	Ltname: string;
	username: string;
	LtID: Number;
	userID: string;
	LtLink?: string;
	LtTitle?: string;
	LtComment?: string;
}

export abstract class LtSpeakerRequestInterface {
	// 特定のユーザーの特定のLT情報を持ってくる
	abstract getSpeakerInfo(LtId: Number, username: string): Promise<LtSpeakerOutput>;
	// 優先度 (低)
	// ユーザーの最新10件のLT情報を持ってくる
	abstract getLtSpeakerInfoFromUser(username: string): Promise<Array<LtSpeakerOutput>>;
	// 特定のLTの情報を持ってくるめ
	abstract getSpeakerInfoFromLt(LtId: Number): Promise<Array<LtSpeakerOutput>>;
	// LT情報を登録する
	abstract upsertLtSpeakerInfo(LtRegisterInfo: LtSpeakerInput): Promise<void>;
	// 特定のユーザーの特定のlT情報を持ってくる
	abstract deleteLtSpeakerInfo(LtId: Number, username: string): Promise<void>;
}

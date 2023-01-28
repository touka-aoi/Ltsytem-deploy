export interface LtSpeakerInput {
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
	LtLink?: string;
	LtTitle?: string;
	LtComment?: string;
}

export abstract class LtSpeakerRequestInterface {
	// 特定のユーザーの特定のLT情報を持ってくる
	abstract getSpeakerInfo(Ltname: string, username: string): Promise<LtSpeakerOutput>;
	// 優先度 (低)
	// ユーザーの最新10件のLT情報を持ってくる
	abstract getLtSpeakerInfoFromUser(username: string): Promise<Array<LtSpeakerOutput>>;
	// 特定のLTの情報を持ってくるめ
	abstract getSpeakerInfoFromLt(Ltname: string): Promise<Array<LtSpeakerOutput>>;
	// LT情報を登録する
	abstract upsertLtSpeakerInfo(LtRegisterInfo: LtSpeakerInput): Promise<void>;
	// 特定のユーザーの特定のlT情報を持ってくる
	abstract deleteLtSpeakerInfo(Ltname: string, username: string): Promise<void>;
}

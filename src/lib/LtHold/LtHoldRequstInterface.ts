export interface LtInfoOutput {
	id: Number;
	name: string;
	desc: string;
	maxMem: Number;
	holdDate: Date;
	holdPlace: string;
}

export interface LtInfoInput {
	name: string;
	desc: string;
	maxMem: Number;
	holdDate: Date;
	holdPlace: string;
}

export abstract class LtHoldRequestInterface {
	// idからLT情報を得る
	abstract getLtInfoFromId(id: string): Promise<LtInfoOutput>;
	// LT名からLT情報を得る
	abstract getLtInfofromName(Ltnmae: string): Promise<LtInfoOutput>;
	// 最新のLT情報を得る
	abstract getLatestLt(): Promise<LtInfoOutput>;
	// idからLT情報を登録・変更する
	abstract upsertLtInfo(LtPrincipal: LtInfoInput): Promise<void>;
	// idからLT情報を削除する
	abstract deleteLtInfo(id: string): Promise<void>;
	// LtnameからLT情報を削除する
	abstract delteLtInfoFromName(Ltnmae: string): Promise<void>;
}

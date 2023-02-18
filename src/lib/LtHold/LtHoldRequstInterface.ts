export interface LtInfoInput {
	name: string;
	desc: string;
	maxMem: Number;
	holdDate: Date;
	holdPlace: string;
}

export interface LtInformation {
	id: Number;
	name: string;
	desc: string;
	maxMem: Number;
	holdDate: Date;
	holdPlace: string;
}

export interface LtInfoOutput {
	data: Array<LtInformation>;
	error: error;
}

export interface error {
	message: string;
}

export abstract class LtHoldRequestInterface {
	// idからLT情報を得る
	abstract getLtInfoFromId(id: Number): Promise<LtInfoOutput>;
	// 最新のLT情報を得る
	abstract getLatestLts(): Promise<LtInfoOutput>;
	// idからLT情報を登録・変更する
	abstract upsertLtInfo(LtPrincipal: LtInfoInput): Promise<error>;
	// idからLT情報を削除する
	abstract deleteLtInfo(id: Number): Promise<error>;

	static NULL(): LtInfoOutput {
		return {
			data: [
				{
					id: 0,
					name: '',
					desc: '',
					maxMem: 0,
					holdDate: new Date(0),
					holdPlace: ''
				}
			],
			error: { message: '' }
		};
	}
}

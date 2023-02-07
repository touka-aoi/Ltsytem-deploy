interface error {
	// エラーのインターフェース
	message: string | undefined; // エラー
}

export interface avatarInput {
	// 入力のインターフェース
	file: File; // ファイル
	filename: string; // ファイル名
}

export interface avatarOutput {
	// 出力のインターフェース
	fileUrl: string | undefined; // ファイル名
	error: error | undefined; // エラー
}

export abstract class AvatarRequestInterface {
	// アバターデータクラス
	abstract uploadAvatar(fileuploadData: avatarInput): Promise<avatarOutput>;
	abstract downloadAvatar(filepath: string): Promise<avatarOutput>;
	abstract deleteAvatar(filename: string): Promise<avatarOutput>;
}

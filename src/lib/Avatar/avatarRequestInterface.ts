interface error {
	message: string | undefined; // エラー
}

export interface avatarInput {
	file: File; // ファイル
	filename: string; // ファイル名
}

export interface avatarOutput {
	fileUrl: string | undefined;
	error: error | undefined;
}

export abstract class AvatarRequestInterface {
	abstract uploadAvatar(fileuploadData: avatarInput): Promise<avatarOutput>;
	abstract downloadAvatar(filepath: string): Promise<avatarOutput>;
	abstract deleteAvatar(filename: string): Promise<avatarOutput>;
}

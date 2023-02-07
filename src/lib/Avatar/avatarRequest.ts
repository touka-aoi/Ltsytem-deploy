import type { AvatarRequestInterface, avatarInput, avatarOutput } from './avatarRequestInterface';

export class AvatarRequest {
	// インターフェスのインスタンス
	private _avatarRequest: AvatarRequestInterface;

	constructor(fileRequest: AvatarRequestInterface) {
		this._avatarRequest = fileRequest;
	}

	async downloadAvatar(filepath: string) {
		// アバター画像ダウンロード
		const res: avatarOutput = await this._avatarRequest.downloadAvatar(filepath);
		return res;
	}

	async uploadAvatar(fileUploadData: avatarInput) {
		// アバター画像アップロード
		const { error } = await this._avatarRequest.uploadAvatar(fileUploadData);
		return error;
	}

	async deleteAvatar(filename: string) {
		// アバター画像削除
		const { error } = await this._avatarRequest.deleteAvatar(filename);
		return error;
	}
}

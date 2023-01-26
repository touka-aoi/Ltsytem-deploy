import type { fileRequestInterface } from './fileRequestInterface';

/**
 *  アバター削除ユースケース
 */
export class AvatarDeleter {
	private _fileDeleter: fileRequestInterface;

	constructor(fileRequest: fileRequestInterface) {
		this._fileDeleter = fileRequest;
	}

	/**
	 * アバター削除関数
	 */
	async deleteAvatar(filename: string) {
		const { error } = await this._fileDeleter.deleteFile(filename);
		return error;
	}
}

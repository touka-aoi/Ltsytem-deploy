import type { fileRequestInterface, fileuploadInput } from './fileRequestInterface';

/**
 *  アバターアップロードユースケース
 */
export class avatarUploader {
	private _fileUploader: fileRequestInterface;

	constructor(fileupload: fileRequestInterface) {
		this._fileUploader = fileupload;
	}

	/**
	 * アバターアップロード用の関数
	 */
	async avatarUpload(fileUploadData: fileuploadInput) {
		const { error } = await this._fileUploader.uploadFile(fileUploadData);
		return error;
	}
}

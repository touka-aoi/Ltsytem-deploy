import type { fileRequestInterface, downloadFileOutput } from './fileRequestInterface';

/**
 *  アバターダウンロードユースケース
 */
export class AvatarDownloader {
	private _fileDownloader: fileRequestInterface;

	constructor(fileDownload: fileRequestInterface) {
		this._fileDownloader = fileDownload;
	}

	/**
	 * アバターダウンロード用の関数
	 */
	async donwlodAvatar(filepath: string) {
		const res: downloadFileOutput = await this._fileDownloader.donwlodFile(filepath);
		return res;
	}
}

import type { AvatarRequestInterface, avatarInput, avatarOutput } from './avatarRequestInterface';

export class AvatarRequest {
	private _avatarRequest: AvatarRequestInterface;

	constructor(fileRequest: AvatarRequestInterface) {
		this._avatarRequest = fileRequest;
	}

	async downloadAvatar(filepath: string) {
		const res: avatarOutput = await this._avatarRequest.downloadAvatar(filepath);
		return res;
	}

	async uploadAvatar(fileUploadData: avatarInput) {
		const { error } = await this._avatarRequest.uploadAvatar(fileUploadData);
		return error;
	}

	async deleteAvatar(filename: string) {
		const { error } = await this._avatarRequest.deleteAvatar(filename);
		return error;
	}
}

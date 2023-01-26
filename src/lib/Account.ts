import { profileRequest } from '$lib/Profile/profileReqeust';
import { supabaseProfileRequest } from '$lib/Profile/supabaseRequest';
import { avatarUploader } from '$lib/AvatarRequest/avatarUplaod';
import { supabaseAvatarRequest } from '$lib/AvatarRequest/supabaseAvatarRequest';
import { AvatarDownloader } from '$lib/AvatarRequest/downloadAvatar';
import { AvatarDeleter } from './AvatarRequest/avatarDelete';
import type { result } from '$lib/Profile/profileRequestInterface';

export class Account {
	private request: profileRequest;
	private avatarUploader: avatarUploader;
	private avatarDownloader: AvatarDownloader;
	private avatarDeleter: AvatarDeleter;

	constructor() {
		this.request = new profileRequest(new supabaseProfileRequest());
		this.avatarUploader = new avatarUploader(new supabaseAvatarRequest());
		this.avatarDownloader = new AvatarDownloader(new supabaseAvatarRequest());
		this.avatarDeleter = new AvatarDeleter(new supabaseAvatarRequest());
	}

	async getProfile(id: string) {
		return this.request.getProfile(id);
	}

	async getProfileFromUsername(username: string) {
		return this.request.getProfileFromUsername(username);
	}

	async upsertProfile(
		id: string,
		username: string | null = null,
		avatar_url: string | null = null
	): Promise<result> {
		const query = {
			username: username,
			avatar_url: avatar_url
		};
		const result = this.request.upsertProfile(id, query);
		return result;
	}

	async AvatarUpload(file: File, filename: string) {
		const uploadData = {
			file: file,
			filename: filename
		};
		const error = await this.avatarUploader.avatarUpload(uploadData);
		return error;
	}

	async downloadAvatar(filename: string) {
		const res = await this.avatarDownloader.donwlodAvatar(filename);
		return res;
	}

	async deleteAvatar(filename: string) {
		const res = await this.avatarDeleter.deleteAvatar(filename);
		return res;
	}
}

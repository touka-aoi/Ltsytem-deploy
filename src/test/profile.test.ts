import { describe, it, expect } from 'vitest';
import { ProfileRequest } from '$lib/Profile/profileReqeust';
import { ProfileRequestSupabase } from '$lib/Profile/profileRequestSupabase';
import type { profile } from '$lib/Profile/profileRequestInterface';

const profileService = new ProfileRequest(new ProfileRequestSupabase());

describe('check profile', () => {
	it('getprofilefromName', async () => {
		const res = await profileService.getProfileFromUsername('toukaAoi');
		console.log(res);
	});

	it('updateProfile', async () => {
		// undefinedの場合変更されないかチェック
		const updateProfile: profile = {
			id: '99983c7e-3428-4ba9-9d38-c859386a5d87',
			avatarURL: undefined,
			username: 'toukaAoi'
		};
		await profileService.upsertProfile(updateProfile);
		const res = await profileService.getProfileFromUsername('toukaAoi');
		// 変更されない
		console.log(res);
	});
});

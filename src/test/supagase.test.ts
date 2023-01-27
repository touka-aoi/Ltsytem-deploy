import { describe, it, expect } from 'vitest';
import { ProfileRequest } from '$lib/Profile/profileReqeust';
import { ProfileRequestSupabase } from '$lib/Profile/profileRequestSupabase';

const profileService = new ProfileRequest(new ProfileRequestSupabase);

describe('check profile', () => {
	it('getprofilefromName', async () => {
    const res = await profileService.getProfileFromUsername("toukaAoi");
    console.log(res);
	});
});

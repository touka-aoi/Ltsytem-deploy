import { describe, it, expect } from 'vitest';
import { profileRequest } from '$lib/Profile/profileReqeust';
import { profileRequestSupabase } from '$lib/Profile/profileRequestSupabase';
import type { profile } from '$lib/Profile/profileRequestInterface';

const profileService = new profileRequest(new profileRequestSupabase);

describe('check profile', () => {
	it('getprofilefromName', async () => {
    const res = await profileService.getProfileFromUsername("toukaAoi");
    console.log(res);
	});
});

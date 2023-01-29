import { describe, it, expect } from 'vitest';
import { AvatarRequest } from '$lib/Avatar/avatarRequest';
import { AvatarRequestSupabase } from '$lib/Avatar/avatarRequestSupabase';

const avatarService = new AvatarRequest(new AvatarRequestSupabase());

describe('check avatar', () => {
	it('getprofilefromName', async () => {
		const res = await avatarService.downloadAvatar('0.002278241518797852.png');
		console.log(res);
	});
});

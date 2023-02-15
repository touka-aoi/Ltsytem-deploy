import { Account } from "$lib/AccountsFacade";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from './$types';

const accountService = new Account;

export const load: PageServerLoad = async (event) => {
  let loginID;
  
  const session = await accountService.getSession(event);
  if (session) {
    const { data } = await accountService.profileRequest.getProfile(session.user.id);
    if (data?.username) {
      const username = data.username;
      throw redirect(307, `/users/${username}`);
    }
  }


}
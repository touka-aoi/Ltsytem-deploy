<script lang="ts">
	import { page } from '$app/stores';
	import type { AuthSession } from '@supabase/supabase-js';
	import { onMount } from 'svelte';
	import { Account } from '$lib/AccountsFacade';

	export let session: AuthSession;

	let username: string | undefined = undefined;

	onMount(async () => {
		const request = new Account();
		if (session) {
			const {
				user: { id }
			} = session;
			const { data } = await request.profileRequest.getProfile(id);
			if (data) {
				username = data.username;
			}
		}
	});
</script>

<div class="flex gap-3 mx-2 shadow-sm">
	{#if !$page.data.session}
		<a class="bg-zinc-50  minibtn" href="/login"> ログイン </a>
	{:else}
		<a class="bg-zinc-50 minibtn" href="/users"> マイページ </a>
	{/if}
</div>

<script lang="ts">
	import { page } from '$app/stores';
	import type { AuthSession } from '@supabase/supabase-js';
	import { onMount } from 'svelte';
	import { Account } from '$lib/Account';

	export let session: AuthSession;

	let username: string | null = null;

	onMount(async () => {
		const request = new Account();
		if (session) {
			const {
				user: { id }
			} = session;
			const { data } = await request.getProfile(id);
			username = data.username;
		}
	});
</script>

<div class="flex gap-3">
	{#if !$page.data.session}
		<a class="bg-zinc-50  minibtn" href="/login"> ログイン </a>
	{:else}
		<a class="bg-zinc-50 minibtn" href="/users/{username}"> マイページ </a>
		<!-- <a class="bg-zinc-50 minibtn" href="/register"> LTに参加 </a> -->
	{/if}
</div>

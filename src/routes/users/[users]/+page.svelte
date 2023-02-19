<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import PastUserLtInformation from './PastUserLtInformation.svelte';
	import UserLtInformation from './UserLtInformation.svelte';
	import Logout from '$lib/Login/Logout.svelte';
	import UserInfo from './Userinfo.svelte';

	// サーバー情報
	export let data: PageData;

	const speakerData = data.speakerData.data;

	const viewrData = data.viewerData;
	const userData = data.userData;
	const session = data.session;

	$: isUser = false;
	$: userName = userData.username;

	onMount(async () => {
		if (session?.user.id == userData.id) isUser = true;
	});
</script>

<div class="flex flex-col md:flex-row justify-center gap-10 my-10">
	<!-- userInfo -->
	<UserInfo {userName} size={12} />
	<!-- LT info -->
	<div class="px-3">
		<!-- Latest LT -->
		<div class="min-w-[70vw]">
			<h2 class="text-2xl pb-4">参加予定LT</h2>
			<!-- reserve LT  -->
			{#each speakerData as speaker}
				{#if new Date(speaker.holdDate) > new Date()}
					<UserLtInformation LtData={speaker} canRevise={isUser} />
				{/if}
			{/each}
		</div>

		<!-- Past LT -->
		<div>
			<p class="text-2xl pt-20 pb-4">参加したLT</p>
			{#each speakerData as speaker}
			{#if new Date(speaker.holdDate) < new Date()}
				<PastUserLtInformation LtData={speaker} />
			{/if}
		{/each}
		</div>
		{#if isUser}
			<div class="flex justify-between my-4 items-end">
				<a href="/users/preference" class="bg-slate-100 rounded shadow-md flex gap-2 items-center p-2">
					<img src="/config.svg" class="max-w-[28px] min-w-[28px]" alt="preference" />
					<p class="font-bold">config</p>
				</a>
				<Logout />
			</div>
		{/if}
	</div>
</div>

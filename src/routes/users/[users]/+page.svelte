<script lang="ts">
	import Logout from '$lib/Login/Logout.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import UserInfo from './Userinfo.svelte';
	import UserLtInformation from './UserLtInformation.svelte';
	import PastUserLtInformation from './PastUserLtInformation.svelte';

	// サーバー情報
	export let data: PageData;

	const userName = data.user;
	const LtData = data.LtData;
	const isUser = data.isUser;
	$: speakerReserveData = LtData.speaker.reserve;
	$: speakerEndData = LtData.speaker.end;
	onMount(async () => {});
</script>

<div class="flex flex-col md:flex-row justify-center gap-10 my-10">
	<!-- userInfo -->
	<UserInfo {userName} size={12} />
	<!-- LT info -->
	<div class="px-3">
		<!-- Latest LT -->
		<div class="min-w-[70vw]">
			<h2 class="text-2xl pb-4">参加予定LT</h2>
			<!-- LTデータが存在する -->
			{#if speakerReserveData.length != 0}
				{#each speakerReserveData as data}
					<UserLtInformation LtData={data} canRevise={isUser} />
				{/each}
			{:else}
				<div class="bg-slate-300 rounded-sm min-h-[190px] flex flex-col justify-center items-center">
					<p class="font-bold text-xl text-gray-500">参加予定LTはありません</p>
				</div>
			{/if}
		</div>
		<!-- <div class="mt-10">
				<h2 class="text-2xl mb-4">視聴予定LT</h2>
				{#if LtData.viewer.reserve.length != 0}
					{#each LtData.viewer.reserve as data}
						{data.Ltname}
						{data.holdDay}
						{data.holdHour}
						{data.holdPlace}
						{data.Ltid}
					{/each}
				{:else}
					<div
						class="bg-slate-300 rounded-sm min-h-[190px] flex flex-col justify-center items-center"
					>
						<p class="font-bold text-xl text-gray-500">視聴予定LTはありません</p>
					</div>
				{/if}
			</div> -->
		<!-- Past LT -->
		<div>
			<p class="text-2xl pt-20 pb-4">参加したLT</p>
			{#each speakerEndData as data}
				<PastUserLtInformation LtData={data} />
			{/each}
		</div>
		{#if isUser}
			<div class="flex justify-between my-4 items-end">
				<a href="/users/preference" class="bg-slate-100 rounded drop-shadow">
					<img src="/config.svg" class="max-w-[28px] min-w-[28px]" alt="preference" />
				</a>
				<Logout />
			</div>
		{/if}
	</div>
</div>

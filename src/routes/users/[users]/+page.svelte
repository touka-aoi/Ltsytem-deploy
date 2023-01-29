<script lang="ts">
	import Logout from '$lib/Login/Logout.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { Account } from '$lib/Account';
	import {base} from "$app/paths"

	// サーバー情報
	export let data: PageData;

	const user = data.user;
	const avatarUrl = data.avatarUrl;
	const LtData = data.LtData;
	const isUser = data.isUser;

	let avatarData: string | undefined = undefined;
	let size = 10;

	onMount(async () => {
		// 画像ダウンロード
		if (avatarUrl) {
			const account = new Account();
			const { fileUrl, error } = await account.avatarRequest.downloadAvatar(avatarUrl);
			avatarData = fileUrl;
		}
	});
</script>

<div class="flex flex-col md:flex-row justify-center gap-10 mt-10">

	<!-- userInfo -->
	<div class="flex flex-col items-center">
		<div style="height: {size}em; width: {size}em;" class="overflow-hidden rounded-full">
			{#if avatarData}
				<img src={avatarData} alt={avatarData ? 'Avatar' : 'No image'} />
			{:else}
				<div
					class="bg-slate-100 rounded-full flex flex-col justify-center items-center"
					style="height: {size}em; width: {size}em;"
				/>
			{/if}
		</div>
		<div class="mt-5">
			<p class="text-xl font-bold">{user}</p>
		</div>
	</div>

		<!-- LT info -->
		<div class = "px-3">
			<!-- Latest LT -->
			<div>
				<h2 class="text-2xl mb-3">参加予定LT</h2>
				<!-- LTデータが存在する -->
				{#if LtData.speaker.reserve.length != 0}
					{#each LtData.speaker.reserve as data}
						<div class="bg-slate-300 rounded-sm px-5 py-4">
								<div class="mb-2 gap-4">
									<a href="{base}/lts/{data.Ltid}" class="flex flex-col gap-1">
										<div class = "flex gap-2">
											<p class=" bg-slate-100 px-3 rounded-full w-fit bottom-2 border-2 h-fit">
												{data.assginMem} / {data.maxMem}
											</p>
											<p >{data.holdDay} {data.holdHour}</p>
										</div>
										<div>
											<p class="text-xl">{data.Ltname}</p>
										</div>
									</a>
								</div>
								<div class="flex w-full">
									<div class="bg-slate-100 w-full rounded-sm p-2">
										<p class="text-xl">{data.LtTitle}</p>
										<p class="mt-2">{data.LtComment}</p>
										<div class="flex flex-col my-2">
											{#if data.LtLink?.length == 0}
												<p class="text-red-500">スライドURLが入力されていません</p>
											{:else}
												<a href={data.LtLink}>
													<img class="max-w-[18px]" src="/link.svg" alt="スライドリンク" />
												</a>
											{/if}
										</div>
									</div>
								</div>
								{#if isUser}
									<div class="flex gap-2 justify-between	mt-4">
										<a href="/lts/{data.Ltid}/register" class="w-fit">
											<button class="minibtn bg-yellow-200">修正する</button>
										</a>
										<a href={data.holdPlace} class="w-fit">
											<button class="minibtn bg-slate-100">開催場所へ移動</button>
										</a>
									</div>
								{/if}
						</div>
					{/each}
				{:else}
					<div
						class="bg-slate-300 rounded-sm min-h-[190px] flex flex-col justify-center items-center"
					>
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
			<!-- <div>
				<p class = "text-2xl mb-4">参加したLT</p>
				{#each LtData.speaker.end as data}
					{data.Ltid}
					{data.LtTitle}
					{data.holdDay}
					{data.holdHour}
					{data.Ltname}
				{/each}
				{#each LtData.viewer.reserve as data}
				{data.Ltname}
				{data.holdDay}
				{data.holdHour}
				{data.holdPlace}
				{data.Ltid}
			{/each}
			</div> -->

		{#if isUser}
		<div class="flex justify-between my-4 items-end">
			<a href="/users/preference">
				<img src="/config.svg" class="max-w-[28px] min-w-[28px] " alt="preference" />
			</a>
			<Logout />
		</div>
	{/if}
	</div>
</div>


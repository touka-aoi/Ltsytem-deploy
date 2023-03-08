<script lang="ts">
	import { onMount } from 'svelte';
	import { Account } from '$lib/AccountsFacade';

	// 画像サイズ
	export let size = 14;
	// ユーザー名
	export let userName: string;

	const accountServie = new Account();
	let avatarData: string | undefined = undefined;

	onMount(async () => {
		// ユーザーデータ取得
		const { data } = await accountServie.profileRequest.getProfileFromUsername(userName);
		// 画像ダウンロード
		if (data?.avatarURL) {
			const { fileUrl, error } = await accountServie.avatarRequest.downloadAvatar(data.avatarURL);
			avatarData = fileUrl;
		}
	});
</script>

<div class="transisionAvatar flex flex-col items-center">
	<div style="height: {size}em; width: {size}em;" class="overflow-hidden rounded-full">
		{#if avatarData}
			<img src={avatarData} alt={avatarData ? 'Avatar' : 'No image'} />
		{:else}
			<div class="bg-slate-100 rounded-full flex flex-col justify-center items-center" style="height: {size}em; width: {size}em;" />
		{/if}
	</div>
	<div class="mt-5">
		<p class="text-xl font-bold">{userName}</p>
	</div>
</div>

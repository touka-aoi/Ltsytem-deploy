<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { Account } from '$lib/AccountsFacade';

	function isAlphaNumeric(str: string): boolean {
		return /^[0-9a-zA-Z]+$/.test(str);
	}

	export let data: PageData;

	const accountRequest = new Account();

	const avatarURL = data.avatarURL;
	const userId = data.userId;
	const user = data.user;
	let username = user;
	let avatarFilename: string | undefined = avatarURL; // ファイル名

	let avatarData: string | undefined = undefined;

	const size = 10;
	let loading = false;
	let flashmessage: string | undefined = undefined;

	// Image用の変数
	let files: FileList | undefined = undefined; // inputからの入力
	let file: File | undefined = undefined; // ファイル

	// エラー用
	let errorMsg: string | undefined = undefined;

	const checkAvatar = () => {
		if (!files || files.length === 0) {
			throw new Error('You must select an image to upload.');
		}
		file = files[0];
		avatarData = URL.createObjectURL(file);
		const fileExt = file.name.split('.').pop();
		avatarFilename = `${Math.random()}.${fileExt}`;
	};

	const delteAvatar = () => {
		avatarData = undefined;
	};

	async function updateProfile() {
		try {
			if (!username) {
				throw new Error('ユーザーIDを入力してください');
			}
			// 半角英数字のみ
			if (!isAlphaNumeric(username)) {
				throw new Error('半角英数字のみが使用できます');
			}

			// ファイル更新
			if (file != undefined && avatarFilename != undefined) {
				const error = await accountRequest.avatarRequest.uploadAvatar({ file: file, filename: avatarFilename });
				if (error?.message) throw Error(error.message);
			}

			// ファイル削除
			if (avatarURL != undefined && avatarData) {
				const error = await accountRequest.avatarRequest.deleteAvatar(avatarURL);
				if (error?.message) throw Error(error.message);
			}
			const error = await accountRequest.profileRequest.upsertProfile({ id: userId, username: username, avatarURL: avatarFilename });

			if (error.message) throw Error(error.message);

			flashmessage = '更新が完了しました';
		} catch (error: any) {
			errorMsg = error;
		}
	}

	onMount(async () => {
		if (avatarURL) {
			const { fileUrl, error } = await accountRequest.avatarRequest.downloadAvatar(avatarURL);
			avatarData = fileUrl;
		}
	});
</script>

{#if flashmessage}
	<div class="flash bg-green-200 flex items-center pl-5">
		{flashmessage}
		<button
			class="w-4 ml-auto mr-4"
			on:click={() => {
				flashmessage = undefined;
			}}
		>
			<img src="/XMark.svg" alt="close flash" />
		</button>
	</div>
{/if}
<div class="flex flex-col my-24">
	<form on:submit|preventDefault={updateProfile}>
		<div class="bg-neutral-200 flex flex-col rounded-sm py-4">
			<div class="flex flex-col lg:flex-row p-3 gap-5">
				<!-- プロフィール画像 -->
				<div class="flex flex-col gap-3 items-center  md:px-10">
					<p class="font-bold text-lg mr-auto">プロフィール画像</p>
					{#if avatarData}
						<div style="height: {size}em; width: {size}em;" class="overflow-hidden rounded-full">
							<img src={avatarData} alt={avatarData} />
						</div>
					{:else}
						<div class="bg-slate-100 rounded-full flex flex-col justify-center items-center" style="height: {size}em; width: {size}em;" />
					{/if}
					<div class="flex gap-2">
						<input class="hidden" type="file" id="single" accept="image/*" bind:files on:change={checkAvatar} disabled={loading} />
						<label for="single" class="minibtn cursor-pointer {loading ? 'bg-gray-300' : 'mainColor'}">プロフィール画像を変更</label>
						<button class="minibtn mx-auto bg-red-400 p-2" on:click|preventDefault={delteAvatar}>
							<img src="/Trash.svg" alt="delteProfile" class="w-5" />
						</button>
					</div>
				</div>
				<!-- ユーザー名 -->
				<div class="flex flex-col gap-3">
					<p class="font-bold text-lg">ユーザー名</p>
					<input type="text" bind:value={username} placeholder="UserID" class="bg-slate-100 w-[300px] h-[32px] rounded-sm px-3" />
					{#if errorMsg}
						<p class="text-red-500 text-sm">{errorMsg}</p>
					{/if}
				</div>
			</div>

			<div class="px-3 mt-6">
				<input type="submit" class="cursor-pointer minibtn bg-green-500 h-[40px] mr-auto" value="プロフィールを更新する" disabled={loading} />
			</div>
		</div>
	</form>
</div>

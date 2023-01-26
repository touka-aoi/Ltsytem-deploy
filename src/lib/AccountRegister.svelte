<script lang="ts">
	import type { AuthSession } from '@supabase/supabase-js';
	import { Account } from '$lib/Account';
	import { Session } from '$lib/Session';
	import { isAlphaNumeric } from '$lib/utilities';

	export let session: AuthSession;

	const {
		user: { id }
	} = session;

	const request = new Account();
	const sessionManager = new Session();

	// DB用の変数
	let loading = false;
	let username: string | null = null;

	// Image用の変数
	const size = 10;
	let Avatarurl: string | null;
	let files: FileList | null = null;
	let file: File | null = null;
	let fileUrl: string | null = null; // 表示用バインド変数

	// エラー用
	let errorMsg: string | null = null;

	const checkAvatar = () => {
		if (!files || files.length === 0) {
			throw new Error('You must select an image to upload.');
		}
		file = files[0];
		fileUrl = URL.createObjectURL(file);
		const fileExt = file.name.split('.').pop();
		Avatarurl = `${Math.random()}.${fileExt}`;
	};

	const delteAvatar = () => {
		file = null;
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

			if (file != null && Avatarurl != null) {
				const error = await request.AvatarUpload(file, Avatarurl);
				if (error) throw Error(error);
			}
			const { error } = await request.upsertProfile(id, username, Avatarurl);

			if (error) throw Error(error);

			window.location.href = '/';
		} catch (error: any) {
			errorMsg = error;
		}
	}

	async function cancelRegister() {
		const error = await sessionManager.signOut();
		if (!error) {
			window.location.href = '/';
		} else {
			errorMsg = error;
		}
	}
</script>

<!-- 登録フォーム全体 -->
<div class="flex flex-col">
	<form on:submit|preventDefault={updateProfile}>
		<div class="flex items-center gap-20">
			<!-- アバター登録 -->
			<div class="flex flex-col gap-3">
				<!-- アバター表示 -->
				{#if file}
					<!-- アバター画像削除 -->
					<div class="fixed">
						<button class="fixed" on:click={delteAvatar}>
							<img class="max-w-[25px] min-w-[25px] " src="/x-circle.svg" alt="cancel avatar" />
						</button>
					</div>
					<!-- アバター画像表示 -->
					<img
						src={fileUrl}
						alt={file ? 'Avatar' : 'No image'}
						class="rounded-full"
						style="height: {size}em; width: {size}em;"
					/>
					<!-- アバター画像なし -->
				{:else}
					<div
						class="bg-slate-100 rounded-full flex flex-col justify-center items-center"
						style="height: {size}em; width: {size}em;"
					/>
				{/if}

				<!-- アバター選択 -->
				<div style="width: {size}em;" class="flex flex-col">
					<input
						class="hidden"
						type="file"
						id="single"
						accept="image/*"
						bind:files
						on:change={checkAvatar}
						disabled={loading}
					/>
					<label for="single" class="minibtn cursor-pointer {loading ? 'bg-gray-300' : 'mainColor'}"
						>画像を選択</label
					>
				</div>
			</div>
			<!-- ユーザーID選択 -->
			<div class="flex flex-col gap-4">
				<p class="font-bold">ユーザーID</p>
				<input
					type="text"
					bind:value={username}
					placeholder="UserID"
					class="bg-slate-100 w-[200px]"
				/>
				<p class="text-sm text-red-600 min-h-[20px] mix-w-[200px] max-w-[200px]">
					{errorMsg == null ? '' : errorMsg}
				</p>
			</div>
		</div>
		<div class="flex mt-10 items-center justify-center gap-8">
			<input
				type="submit"
				class="minibtn mainColor cursor-pointer"
				value="登録"
				disabled={loading}
			/>
		</div>
	</form>
	<div class="text-center mt-10">
		<button on:click={cancelRegister} class="text-sm">登録をキャンセル</button>
	</div>
</div>

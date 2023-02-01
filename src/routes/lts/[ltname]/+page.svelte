<script lang="ts">
	import type { PageData } from './$types';
	import { Account } from '$lib/Account';

	export let data: PageData;

	let { id, Ltname, desc, maxMem, holdDay, holdHour, assignNum, holdPlace, speakers, status } = data.Lt;
	let username: string | undefined = undefined;
	let isViewer: boolean = false;
	let isSpeaker: boolean = false;
	if (data.user) {
		username = data.user.username;
		isSpeaker = data.user.isSpeaker;
		isViewer = data.user.isViewer;
	}
	let { usernames: viewers } = data.viewer;

	const size = 4;
	const account = new Account();
</script>

<div class="flex flex-col gap-10 justify-center items-center my-10 px-10">
	<!-- タイトル -->
	<div class="flex-col flex gap-7 items-center w-[80vw] md:w-[60vw] ">
		<div class="bg-slate-100 rounded-md flex flex-col items-center justify-center p-10 gap-3 w-full">
			<p class="text-2xl">{Ltname}</p>
			<p>{holdDay} {holdHour}</p>
		</div>
		<!-- 人数カウンタ -->
		<div class="w-fit rounded-3xl px-5 py-1 flex gap-10">
			<div class="flex flex-col justify-center items-center gap-2">
				<p>登壇者</p>
				<p class="border-2 px-5 py-1 rounded-3xl">{assignNum}/{maxMem}</p>
			</div>
			<div class="flex flex-col justify-center items-center gap-2">
				<p>閲覧者</p>
				<p class="border-2 px-5 py-1 rounded-3xl">{viewers.length}</p>
			</div>
		</div>
		<!-- 参加ボタン -->
		{#if status == 'reserve'}
			{#if username}
				<div class="flex gap-10">
					{#if !isSpeaker}
						<a href="./{id}/register">
							<button class="minibtn bg-slate-100 rounded-md">LTをする</button>
						</a>
					{:else}
						<a href="./{id}/register">
							<button class="minibtn bg-slate-100 rounded-md">LTを修正する</button>
						</a>
					{/if}
					{#if !isViewer}
						<form method="post" action="?/register">
							<input type="submit" class="minibtn mainColor cursor-pointer  mr-auto" value="登録する" />
							<input type="hidden" name="Ltname" bind:value={Ltname} />
						</form>
					{:else}
						<div class="box-border minibtn rounded-md border-2 cursor-default">LTをみる</div>
					{/if}
				</div>
				<div>
					<a href={holdPlace}>
						<button class="minibtn bg-slate-100 rounded-md"> 開催場所へ移動 </button>
					</a>
				</div>
			{/if}
		{:else}
			<div class="flex flex-col justify-center items-center">
				<p class="font-bold text-xl text-gray-500">このLTは終了しました</p>
			</div>
		{/if}
	</div>
	<!-- 他ユーザーの参加状態 -->
	<div class="flex flex-col gap-10">
		<!-- LT概要 -->
		<div class="flex flex-col gap-5 ">
			<p class="text-xl ">概要</p>
			<p>{@html desc}</p>
		</div>
		<p class="text-xl ">参加者</p>
		{#if speakers.length == 0}
			<div class="border-2 rounded-sm min-h-[120px] w-[70vw] flex flex-col justify-center items-center ">
				<p class="font-bold text-xl text-gray-500">参加者募集中</p>
			</div>
		{:else}
			<div class="flex flex-col gap-3">
				{#each speakers as { username, avatarData, LtTitle, LtComment, LtLink }}
					<div class="flex flex-col bg-zinc-50 roudned-sm p-4 gap-3">
						<div class="flex flex-col justify-center items-center gap-3">
							{#if avatarData}
								{#await account.avatarRequest.downloadAvatar(avatarData) then avatar}
									<div class="overflow-hidden rounded-full w-[2em] h-[2em] md:w-[4em] md:h-[4em]">
										<img src={avatar.fileUrl} alt="avatar" />
									</div>
								{/await}
							{:else}
								<div class="bg-slate-100 rounded-full flex flex-col justify-center items-center" style="height: {size}em; width: {size}em;" />
							{/if}
							<p>
								{username}
							</p>
						</div>
						<div class="flex flex-col gap-2">
							<p class="text-lg">
								{LtTitle}
							</p>
							<p>
								{LtComment}
							</p>
							{#if LtLink}
								<a href={LtLink} class="px-2 py-1 rounded-xl bg-gray-300 mr-auto mt-3">
									<img src="/link.svg" alt="presentation link" class="w-4" />
								</a>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

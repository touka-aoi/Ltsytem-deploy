<script lang="ts">
	import type { PageData } from './$types';
	import SpeakerInformatino from './SpeakerInformatino.svelte';

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
							<button class="minibtn bg-slate-100 rounded-md drop-shadow">LTをする</button>
						</a>
					{:else}
						<a href="./{id}/register">
							<button class="minibtn bg-slate-100 rounded-md drop-shadow">LTを修正する</button>
						</a>
					{/if}
					{#if !isViewer}
						<form method="post" action="?/register">
							<input type="submit" class="minibtn mainColor cursor-pointer  mr-auto drop-shadow" value="LTをみる" />
							<input type="hidden" name="Ltname" bind:value={Ltname} />
						</form>
					{:else}
						<div class="box-border minibtn rounded-md border-2 cursor-default">登録完了</div>
					{/if}
				</div>
				{#if isSpeaker || isViewer}
				<div>
					<a href={holdPlace}>
						<button class="minibtn bg-slate-100 rounded-md drop-shadow"> 開催場所へ移動 </button>
					</a>
				</div>
				{/if}
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
			<div class="flex flex-col gap-3 items-center">
				{#each speakers as speaker}
					<SpeakerInformatino speaker={speaker} />
				{/each}
			</div>
		{/if}
	</div>
</div>

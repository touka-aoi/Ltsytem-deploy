<script lang="ts">
	import type { PageData } from './$types';
	import { marked } from 'marked';
	import SpeakerInformation from './SpeakerInformation.svelte';

	export let data: PageData;

	// get data from server
	const LtInfo = data.LtInfo[0];
	const session = data.session;
	const spekaerInfo = data.speaker.data;
	const { data: viewers } = data.viewer;

	// data process
	const acceptReserve = LtInfo.holdDate > new Date();
	const holdDate = LtInfo.holdDate;
	const holdDateJp = holdDate.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Tokyo' });
	holdDate.setHours(holdDate.getHours() - 9);

	let isSpeaker = false;
	let isViewer = true;
	if (session) {
		isSpeaker = spekaerInfo.some((ele) => ele.userID == session.user.id);
		isViewer = viewers.some((ele) => ele.userid == session.user.id);
	}
</script>

<div class="flex flex-col gap-10 justify-center items-center my-10 px-10">
	<!-- タイトル -->
	<div class="flex-col flex gap-7 items-center w-[80vw] md:w-[60vw] ">
		<div class="bg-slate-100 rounded-md flex flex-col items-center justify-center p-10 gap-3 w-full">
			<p class="text-2xl">{LtInfo.name}</p>
			<p>{holdDateJp}</p>
		</div>
		<!-- 人数カウンタ -->
		<div class="w-fit rounded-3xl px-5 py-1 flex gap-10">
			<div class="flex flex-col justify-center items-center gap-2">
				<p>登壇者</p>
				<p class="border-2 px-5 py-1 rounded-3xl">{spekaerInfo.length}/{LtInfo.maxMem}</p>
			</div>
			<div class="flex flex-col justify-center items-center gap-2">
				<p>閲覧者</p>
				<p class="border-2 px-5 py-1 rounded-3xl">{viewers.length}</p>
			</div>
		</div>
		<!-- 参加ボタン -->
		{#if acceptReserve}
			<!-- ログイン状態のチェック -->
			{#if session}
				<div class="flex gap-10">
					{#if !isSpeaker}
						<a href="./{LtInfo.id}/register">
							<button class="minibtn bg-slate-100 rounded-md shadow-md">LTをする</button>
						</a>
					{:else}
						<a href="./{LtInfo.id}/register">
							<button class="minibtn bg-slate-100 rounded-md shadow-md">LTを修正する</button>
						</a>
					{/if}
					{#if isViewer}
						<form method="post" action="?/cancel">
							<input type="submit" class="minibtn bg-red-500 text-white cursor-pointer  mr-auto shadow-md" value="閲覧キャンセル" />
							<input type="hidden" name="LtID" bind:value={LtInfo.id} />
							<input type="hidden" name="userID" bind:value={session.user.id} />
						</form>
					{:else}
						<form method="post" action="?/register">
							<input type="submit" class="minibtn mainColor cursor-pointer  mr-auto shadow-md" value="LTを見る" />
							<input type="hidden" name="LtID" bind:value={LtInfo.id} />
							<input type="hidden" name="userID" bind:value={session.user.id} />
						</form>
					{/if}
				</div>
				{#if isSpeaker || isViewer}
					<div>
						<a href={LtInfo.holdPlace}>
							<button class="minibtn bg-slate-100 rounded-md shadow-md"> 開催場所へ移動 </button>
						</a>
					</div>
				{/if}
			{/if}
		{:else}
			<div class="flex flex-col justify-center items-center">
				<p class="font-bold text-xl text-gray-500">このLTは終了しました</p>
			</div>
			{#if isSpeaker}
				<a href="./{LtInfo.id}/register">
					<button class="minibtn bg-slate-100 rounded-md shadow-md">LTを修正する</button>
				</a>
			{/if}
		{/if}
	</div>
	<!-- 他ユーザーの参加状態 -->
	<div class="flex flex-col gap-10">
		<!-- LT概要 -->
		<div class="flex flex-col gap-5 ">
			<p class="text-xl ">概要</p>
			<p>{@html marked.parse(LtInfo.desc)}</p>
		</div>
		<p class="text-xl ">参加者</p>
		{#if spekaerInfo.length == 0}
			<div class="border-2 rounded-sm min-h-[120px] w-[70vw] flex flex-col justify-center items-center ">
				<p class="font-bold text-xl text-gray-500">参加者募集中</p>
			</div>
		{:else}
			<div class="flex flex-col gap-3 items-center">
				{#each spekaerInfo as speaker}
					<SpeakerInformation {speaker} />
				{/each}
			</div>
		{/if}
	</div>
</div>

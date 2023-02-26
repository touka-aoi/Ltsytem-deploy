<script lang="ts">
	import { onMount } from 'svelte';
	import type { LtInformation } from '$lib/LtHold/LtHoldRequstInterface';
	import { base } from '$app/paths';
	import Tags from './Tags.svelte';

	const statusColor: { [key: string]: string } = {
		募集中: 'bg-green-300',
		満員: 'bg-red-300',
		終了: 'bg-gray-300'
	};

	// loading
	let loading = true;

	// LT詳細情報
	export let LtData: LtInformation;

	$: speakerMember = 0;
	$: speakers = [];

	onMount(async () => {
		const res = await fetch(`/API/speakerinfo?ltid=${LtData.id}`);
		const speakerdata = await res.json();
		speakerMember = speakerdata.data.length;
		speakers = speakerdata.data;
		loading = false;
	});

	const holdDate = new Date(LtData.holdDate);
	// holdDate.setHours(holdDate.getHours() - 9);
	const holdDateFormarted = holdDate.toLocaleTimeString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Tokyo' });
	$: state = holdDate <= new Date() ? '終了' : LtData.maxMem > speakerMember ? '募集中' : '満員';
</script>

<!-- LT情報コンポーネント -->
<div class="h-full w-90v md:w-40v bg-slate-50 rounded-md shadow-md">
	<!-- LTタイトル, LTスピーカー -->
	<div class="flex flex-col items-center gap-4 m-5 h-full">
		<!-- LT名、時期、人数 -->
		<div class="h-fit w-full rounded-sm bg-slate-100 p-2 ">
			<!-- 開催日時 -->
			<div class="flex justify-center mb-2">
				<p class="text-lg">{holdDateFormarted}</p>
			</div>
			<!-- タイトル -->
			<div class="flex justify-center mt2">
				<p class="text-xl font-bold mt-2">{LtData.name}</p>
			</div>
			{#if loading}
				<p />
			{:else}
				<div class="flex justify-between  gap-2 items-center my-2 ">
					<!-- LT状態 -->
					<div class=" h-fit min-w-[80px] {statusColor[state]} rounded-xl ml-2 px-3 py-1 text-center">
						<p class="text-lg">{state}</p>
					</div>
					<!-- 現在の人数 -->
					<div class="flex items-center justify-center gap-2 mr-2 min-w-[80px] text-center border-solid border-2 rounded-xl border-gray-300">
						<p class="text-lg">{speakerMember} / {LtData.maxMem}</p>
						<p class="text-xs">人</p>
					</div>
				</div>
			{/if}
		</div>
		<!-- 登壇者情報 -->
		<div class="w-full rounded-sm flex-col flex gap-2">
			{#if loading}
				<p class="text-center my-3">読み込み中...</p>
			{:else}
				{#each speakers as { username, LtTitle, tags }}
					<div class="flex flex-col justify-center mx-2 px-5 py-2 gap-2 rounded-sm border-b">
						<div class="border-solid w-full overflow-hidden">
							<p class="font-bold truncate ...">{LtTitle}</p>
						</div>
						<Tags {tags} />
						<p>{username}</p>
					</div>
				{/each}
			{/if}
		</div>
		<!-- ボタン -->
		<div class="">
			<a href="{base}/lts/{LtData.id}" class="minibtn bg-yellow-200 cursor-pointer shadow-md">もっとみる</a>
		</div>
	</div>
</div>

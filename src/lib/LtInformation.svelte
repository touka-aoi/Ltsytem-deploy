<script lang="ts">
	import type { LtSpeakerOutput } from '$lib/LtSpeaker/LtSpeakerRequestInterface';
	import { base } from '$app/paths';
	const statusColor: { [key: string]: string } = {
		募集中: 'bg-green-300',
		満員: 'bg-red-300',
		終了: 'bg-gray-300'
	};
	// LT情報
	export let id: string;
	export let state: string = '読み込み中';
	export let ltname: string = '読み込み中';
	export let maxMem: string = '0';

	// LT詳細情報
	export let ltDetailData: Array<LtSpeakerOutput> = [];
</script>

<div class="h-full bg-gray-700 rounded-md">
	<div class="flex flex-col items-center gap-4 m-5 h-full">
		<!-- LT情報: LT名、時期、人数 -->
		<div class="h-fit w-full rounded-sm bg-slate-100 p-2 min-w-[80vw]">
			<div class="flex justify-between  gap-2 items-center   flex-wrap">
				<div class=" h-fit min-w-[80px] {statusColor[state]} rounded-xl ml-2 px-3 py-1 text-center">
					<p class="text-lg">{state}</p>
				</div>
				<div class="mr-2 min-w-[80px] text-center border-solid border-2 rounded-xl border-gray-300">
					<p class="text-lg">{ltDetailData.length}/{maxMem}</p>
				</div>
			</div>
			<div class="flex justify-center mt2">
				<p class="text-xl font-bold mt-2">{ltname}</p>
			</div>
		</div>
		<!-- LT情報: 登壇者情報 -->
		<div class="w-full rounded-sm flex-col flex gap-2">
			{#each ltDetailData as { username, LtTitle }}
				<div class="flex flex-col justify-center bg-slate-100 mx-2 px-5 py-2 gap-2 rounded-sm">
					<p>{username}</p>
					<div class="border-solid w-full overflow-hidden">
						<p class="truncate ...">{LtTitle}</p>
					</div>
				</div>
			{/each}
		</div>
		<!-- ボタン -->
		<div class="">
			<a href="{base}/lts/{id}" class="minibtn bg-slate-100 cursor-pointer">もっとみる</a>
		</div>
	</div>
</div>

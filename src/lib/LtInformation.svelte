<script lang="ts">
	import type { LtSpeakerOutput } from '$lib/LtSpeaker/LtSpeakerRequestInterface';
	import { goto } from '$app/navigation';
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

<div class="h-full bg-gray-700">
	<div class="flex flex-col items-center justify-between gap-4 m-5 h-full">
		<!-- LT情報: LT名、時期、人数 -->
		<div class="h-12 w-full rounded-sm bg-slate-100 flex justify-between items-center gap-9">
			<div class=" h-fit min-w-[80px] {statusColor[state]} rounded-xl ml-2 px-3 py-1 text-center">
				<p class="text-lg">{state}</p>
			</div>
			<div>
				<p class="text-lg">{ltname}</p>
			</div>
			<div class="mr-2 min-w-[80px] text-center border-solid border-2 border-gray-300">
				<p class="text-lg">{ltDetailData.length}/{maxMem}</p>
			</div>
		</div>
		<!-- LT情報: 登壇者情報 -->
		<div class="w-full rounded-smflex flex-col flex gap-4">
			{#each ltDetailData as { username, LtTitle }}
				<div class="h-20 flex flex-col justify-center bg-slate-100 mx-2 px-5 gap-2 rounded-sm">
					<p>{username}</p>
					<div class="border-solid w-full overflow-hidden">
						<p class="truncate ...">{LtTitle}</p>
					</div>
				</div>
			{/each}
		</div>
		<!-- ボタン -->
		<div class="">
			<input type="button" id="latestLt" on:click={() => goto(`/lts/${id}`)} />
			<label for="latestLt" class="minibtn bg-slate-100 cursor-pointer">もっとみる</label>
		</div>
	</div>
</div>

<script lang="ts">
	// import
	import type { LtSpeakerOutput } from '$lib/LtSpeaker/LtSpeakerRequestInterface';
	import type { LtInfoOutput } from "$lib/LtHold/LtHoldRequstInterface";
	import { base } from '$app/paths';
	// カラータイプ
	const statusColor: { [key: string]: string } = {
		募集中: 'bg-green-300',
		満員: 'bg-red-300',
		終了: 'bg-gray-300'
	};
	
	// LT詳細情報
	export let LtData: LtInfoOutput;
	export let speakerData: any;

	const holdDate = new Date(LtData.holdDate);
	const holdDateFormarted = holdDate.toLocaleTimeString('ja-JP', {year: 'numeric',	month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' , timeZone: "Asia/Tokyo" }, );
	const state = holdDate <= new Date() ? "終了" : LtData.maxMem > speakerData.length ? "募集中" : "満員";
</script>

<!-- LT情報コンポーネント -->
<div class="h-full w-90v md:w-40v bg-slate-50 rounded-md shadow-md">
	<!-- LTタイトル, LTスピーカー -->
	<div class="flex flex-col items-center gap-4 m-5 h-full">
		<!-- LT名、時期、人数 -->
		<div class="h-fit w-full rounded-sm bg-slate-100 p-2 shadow-md">
			<!-- 開催日時 -->
			<div class = "flex justify-center mb-2">
				<!-- <p class="text-lg">{holdDate}</p> -->
			</div>
			<div class="flex justify-between  gap-2 items-center ">
				<!-- LT状態 -->
				<div class=" h-fit min-w-[80px] {statusColor[state]} rounded-xl ml-2 px-3 py-1 text-center">
					<p class="text-lg">{state}</p>
				</div>
				<!-- 現在の人数 -->
				<div class="flex items-center justify-center gap-2 mr-2 min-w-[80px] text-center border-solid border-2 rounded-xl border-gray-300">
					<p class="text-lg">{speakerData.length} / {LtData.maxMem}</p>
					<p class = "text-xs">人</p>
				</div>
			</div>
			<!-- タイトル -->
			<div class="flex justify-center mt2">
				<p class="text-xl font-bold mt-2">{LtData.name}</p>
			</div>
		</div>
		<!-- 登壇者情報 -->
		<div class="w-full rounded-sm flex-col flex gap-2">
			{#each speakerData as { username, LtTitle }}
				<div class="flex flex-col justify-center bg-slate-100 mx-2 px-5 py-2 gap-2 rounded-sm shadow-md" >
					<p>{username}</p>
					<div class="border-solid w-full overflow-hidden">
						<!-- LTタイトル -->
						<p class="font-bold truncate ...">{LtTitle}</p>
					</div>
				</div>
			{/each}
		</div>
		<!-- ボタン -->
		<div class="">
			<a href="{base}/lts/{LtData.id}" class="minibtn bg-yellow-200 cursor-pointer shadow-md">もっとみる</a>
		</div>
	</div>
</div>

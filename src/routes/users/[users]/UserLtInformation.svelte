<script lang="ts">
	import { base } from '$app/paths';
	import type { userSpeakHoldInfo } from '$lib/LtInfoFacade';
	import Tags from '../../Tags.svelte';

	export let LtData: userSpeakHoldInfo;
	export let canRevise = false;

	function convertDate(date: Date) {
		// date.setHours(date.getHours() - 9);
		const DateJp = date.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Tokyo' });
		return DateJp;
	}
</script>

<div class="bg-slate-100 rounded px-5 py-4">
	<div class="mb-2 gap-4">
		<a href="{base}/lts/{LtData.LtID}" class="flex flex-col gap-1 bg-slate-50 p-4 rounded shadow-md">
			<div class="flex gap-2 items-end">
				<!-- <p class=" bg-slate-100 px-3 rounded-full w-fit bottom-2 border-2 h-fit">
					{LtData.assignMem} / {LtData.maxMem}
				</p> -->
				<p>{convertDate(new Date(LtData.holdDate))}</p>
			</div>
			<div>
				<p class="text-2xl">{LtData.Ltname}</p>
			</div>
		</a>
	</div>
	<div class="flex w-full">
		<div class="bg-slate-50 w-full rounded-sm py-2 px-4">
			<p class="text-xl font-bold">{LtData.LtTitle}</p>
			<p class="mt-2">{LtData.LtComment}</p>
			<div class="flex flex-col my-2 gap-2">
				<Tags tags={LtData.tags} />
				{#if LtData.LtLink == ''}
					<p class="text-red-500">スライドURLが入力されていません</p>
				{:else}
					<a href={LtData.LtLink}>
						<img class="max-w-[18px]" src="/link.svg" alt="スライドリンク" />
					</a>
				{/if}
			</div>
		</div>
	</div>
	{#if canRevise}
		<div class="flex gap-2 justify-between	mt-4">
			<a href="/lts/{LtData.LtID}/register" class="w-fit">
				<button class="minibtn bg-yellow-200 shadow-md">修正する</button>
			</a>
			<a href={LtData.holdPlace} class="w-fit">
				<button class="minibtn bg-slate-100 shadow-md">開催場所へ移動</button>
			</a>
		</div>
	{/if}
</div>

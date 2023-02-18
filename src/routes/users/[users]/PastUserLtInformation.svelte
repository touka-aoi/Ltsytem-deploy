<script lang="ts">
	import { base } from '$app/paths';
	import type { userLtInformation } from '$lib/LtInfoFacade';

	export let LtData: userLtInformation;

	function convertDate(date: Date) {
		date.setHours(date.getHours() - 9);
		const DateJp = date.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Tokyo' });
		return DateJp;
	}
</script>

<div class="bg-slate-300 rounded-sm p-2">
	<div class="mb-2 bg-slate-200 rounded shadow-md p-1">
		<a href="{base}/lts/{LtData.data.LtID}" class="flex  items-end">
			<p class=" bg-slate-100 px-3 rounded-full w-fit bottom-2 border-2 h-fit">
				{LtData.data.assignMem} / {LtData.data.maxMem}
			</p>
			<p class="text-xl">{LtData.data.Ltname}</p>
			<p>{convertDate(new Date(LtData.data.holdDate))}</p>
		</a>
	</div>
	<div class="flex w-full">
		<div class="bg-slate-100 w-full rounded-sm p-2 flex items-center gap-2">
			<a href={LtData.data.LtLink}>
				<img class="min-w-[18px] max-w-[18px]" src="/link.svg" alt="スライドリンク" />
			</a>
			<p class="text-xl font-bold">{LtData.data.LtTitle}</p>
		</div>
	</div>
</div>

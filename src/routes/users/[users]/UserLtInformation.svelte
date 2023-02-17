<script lang="ts">
	import { base } from '$app/paths';

	interface userSpeakLtInformation {
		Ltname: string;
		LtLink?: string;
		LtTitle?: string;
		LtComment?: string;
		Ltid: Number;
		holdHour: string;
		holdDay: string;
		holdPlace: string;
		maxMem: Number;
		assginMem: Number;
	}

	export let LtData: userSpeakLtInformation;
	export let canRevise = false;
</script>

<div class="bg-slate-100 rounded px-5 py-4">
	<div class="mb-2 gap-4">
		<a href="{base}/lts/{LtData.Ltid}" class="flex flex-col gap-1 bg-slate-50 p-4 rounded drop-shadow-md">
			<div class="flex gap-2 items-end">
				<p class=" bg-slate-100 px-3 rounded-full w-fit bottom-2 border-2 h-fit">
					{LtData.assginMem} / {LtData.maxMem}
				</p>
				<p>{LtData.holdDay} {LtData.holdHour}</p>
			</div>
			<div>
				<p class="text-2xl">{LtData.Ltname}</p>
			</div>
		</a>
	</div>
	<div class="flex w-full">
		<div class="bg-slate-50 w-full rounded-sm p-2">
			<p class="text-xl font-bold">{LtData.LtTitle}</p>
			<p class="mt-2">{LtData.LtComment}</p>
			<div class="flex flex-col my-2">
				{#if LtData.LtLink?.length == 0}
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
			<a href="/lts/{LtData.Ltid}/register" class="w-fit">
				<button class="minibtn bg-yellow-200 drop-shadow-md">修正する</button>
			</a>
			<a href={LtData.holdPlace} class="w-fit">
				<button class="minibtn bg-slate-100 drop-shadow-md">開催場所へ移動</button>
			</a>
		</div>
	{/if}
</div>

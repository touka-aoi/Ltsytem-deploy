<script lang="ts">
	import LTInformation from '$lib/LtInformation.svelte';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import type { LtInfoInput } from '$lib/LtHold/LtHoldRequstInterface';

	export let data: PageData;

	const latestLt = data.latestLt; // 最新Lt
	let LTitems: Array<LtInfoInput> = [];
	for (let i = 0; i < 1; i++) {
		LTitems.push(latestLt.data);
	}
</script>

<!-- ヒーロー画面 -->
<section>
	<div class="bg-gray-300 h-60v flex items-center justify-center">
		<input type="button" id="latestLt" on:click={() => goto(`/lts/${latestLt.data.id}`)} />
		<label for="latestLt" class="minibtn bg-slate-100 cursor-pointer">LTに参加する</label>
	</div>
</section>
<!-- LT情報 -->
<section>
	<div class="m-16 ">
		<p class="text-2xl mb-8">開催情報</p>
		<div class="flex flex-col">
			<!-- 個別開催情報 -->
			<div class="bg-slate-100 rounded-sm">
				<!-- 複数のLTを並べる -->
				<div class="flex m-4 gap-2">
					<!-- LT詳細 -->
					{#each LTitems as item}
						<LTInformation
							state={item.holdDate > new Date() ? '募集中' : '終了'}
							ltname={item.name}
							maxMem={String(item.maxMem)}
							ltDetailData={latestLt.speakers}
							id={String(latestLt.data.id)}
						/>
					{/each}
				</div>
			</div>
			<div class="flex items-end justify-end my-9">
				<!-- <button class="minibtn bg-slate-100">過去の開催情報を見る</button> -->
			</div>
		</div>
	</div>
</section>

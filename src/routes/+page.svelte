<script lang="ts">
	import LTInformation from '$lib/LtInformation.svelte';
	import { base } from "$app/paths"
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
		<a href= "{base}/lts/{latestLt.data.id}" class="minibtn bg-slate-100 cursor-pointer" >LTに参加する</a>
	</div>
</section>
<!-- LT情報 -->
<section>
	<div class=" my-16 mx-8 flex flex-col gap-10 items-center">
		<p class="text-2xl font-bold ">開催情報</p>
		<div class="flex flex-col">
				<!-- 複数のLTを並べる -->
				<div class="flex m-4 gap-2">
					<!-- LT詳細 -->
					{#each LTitems as item}
						<LTInformation
							state={item.holdDate <= new Date() ?  '終了' : item.maxMem > latestLt.speakers.length ? "募集中" : "満員"}
							ltname={item.name}
							maxMem={String(item.maxMem)}
							ltDetailData={latestLt.speakers}
							id={String(latestLt.data.id)}
						/>
					{/each}
				</div>
			<div class="flex items-end justify-end my-9">
				<!-- <button class="minibtn bg-slate-100">過去の開催情報を見る</button> -->
			</div>
		</div>
	</div>
</section>

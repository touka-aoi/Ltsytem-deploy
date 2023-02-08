<script lang="ts">
	import LTInformation from './LtInformation.svelte';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	let latestLtData: any;
	let loading = true;

	onMount(async () => {
		const res =  await fetch("/API/latestsLts");
		latestLtData = await res.json();
		loading = false;
	})

</script>


{#if latestLtData}
	<!-- ヒーロー画面 -->
	<section>
		<!-- 最新LT -->
		<div class="bg-gray-300 h-60v flex items-center justify-center">
			<a href="{base}/lts/{latestLtData.Lt.id}" class="minibtn bg-slate-100 cursor-pointer">LTに参加する</a>
		</div>
	</section>
	<!-- LT情報 -->
	<section>
		<div class=" my-16 mx-8 flex flex-col gap-10 items-center">
			<p class="text-2xl font-bold ">開催情報</p>
			<div class="flex m-4 gap-2">
				<!-- LT詳細 -->
					<LTInformation
						LtData={latestLtData.Lt}
						speakerData={latestLtData.speaker}
					/>
			</div>
			<div class="flex items-end justify-end my-9">
				<!-- <button class="minibtn bg-slate-100">過去の開催情報を見る</button> -->
			</div>
		</div>
	</section>
{/if}
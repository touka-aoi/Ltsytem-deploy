<script lang="ts">
	import LTInformation from './LtInformation.svelte';
	import { base } from '$app/paths';
	import type { PageData } from './$types';

	export let data: PageData;
	const latestLts = data.latestLts;
	const latestLt = latestLts.data[0];
	const holdPlace = "https://discord.gg/3cP8gScET7";
</script>

<!-- ヒーロー画面 -->
<section>
	<!-- 最新LT -->
	<div class="bg-gray-300 h-50v flex items-center justify-center flex-col gap-10">
		<a href="{base}/lts/{latestLt.id}" class="minibtn bg-slate-100 cursor-pointer shadow-md">LTに参加する</a>
		<a href="{holdPlace}" class="minibtn bg-discord	text-white cursor-pointer shadow-md">LTサーバーを覗いてみる</a>
	</div>
	
</section>
<section>
	<div class="py-10 px-4 flex flex-col items-center justify-center gap-8 bg-slate-100">
		<p class="text-2xl font-bold">~ LT (ライトニングトーク) とは？ ~</p>
		<p>LT (ライトニングトーク) とは5分間の短い時間で<br class="md:hidden" />発表するプレゼンテーションのことです</p>
		<ul class="list-disc">
			<li>あの人の動向を知りたい！</li>
			<li>自分の経験を誰かに伝えたい！</li>
			<li>気軽に発表できる場所が欲しい！</li>
			<li>就活や、人前での発表の練習をしたい！</li>
		</ul>
		<p class="text-center">
			そんなことを思ったことはありませんか？ <br class="md:hidden" />
			いなづまは、LTを補助することに特化したサービスです。<br />ひとりでも、友達と一緒にでも気軽にはじめましょう！！
		</p>
	</div>
</section>
<!-- LT情報 -->
<section>
	<div class=" py-16 px-8 flex flex-col gap-10 items-center">
		<p class="text-2xl font-bold ">開催情報</p>
		<div class="flex m-4 gap-2">
			<!-- LT詳細 -->
			<LTInformation LtData={latestLt} />
		</div>
		<div class="flex justify-end">
			<a href="{base}/lts/archive" class="minibtn bg-slate-100 cursor-pointer shadow-md">過去の開催情報を見る</a>
		</div>
	</div>
</section>

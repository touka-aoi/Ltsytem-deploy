<script lang="ts">
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let { name: Ltname, desc } = data.Lt;
	let speaker = data.speaker;

	let LtTitle = speaker?.LtTitle;
	let LtLink = speaker?.LtLink;
	let LtComment = speaker?.LtComment;

	// 登録用の補足情報
	const registerEx = `
    この文章には以下の注意事項が含まれています: 
    事前の準備が必要です。
    適切な機材を使用してください。
    作業は屋外で行ってください。
    作業中は安全対策を取ってください。
    作業後は適切なクリーニングを行ってください。`;

	desc += registerEx;
</script>

<div class="Ltview flex flex-col gap-10">
	<!-- LT名 -->
	<div>
		<p class="text-3xl">{Ltname}</p>
	</div>
	<!-- 概要 -->
	<div class="flex flex-col gap-4 ">
		<p class="text-xl">概要</p>
		<p>
			{desc}
		</p>
	</div>
	<!-- 参加登録 -->
	<div class="flex flex-col gap-7 bg-slate-50 rounded-md px-10 py-7">
		<p class="text-xl">参加登録</p>
		<form method="POST" action="?/register" class="flex flex-col gap-10">
			<div class="flex flex-col gap-4">
				<p>タイトル (必須)</p>
				<input type="text" name="Lttitle" bind:value={LtTitle} placeholder="タイトル" class="border-2 rounded-sm px-2 py-1 w-[50%]" />
				{#if form?.missing}<p class="error text-red-500">タイトルを入力してください</p>{/if}
			</div>
			<div class="flex flex-col gap-4">
				<p>スライドURL</p>
				<input type="text" name="Ltlink" bind:value={LtLink} placeholder="https://example.com/" class="border-2 rounded-sm px-2 py-1 w-[50%]" />
			</div>
			<div class="flex flex-col gap-4">
				<p>コメント</p>
				<textarea name="Ltcomment" bind:value={LtComment} placeholder="コメント" class="border-2 rounded-sm px-2 py-1 w-[50%]" />
			</div>
			{#if form?.unknown}<p class="error text-red-500">{form.err}</p>{/if}
			<input type="hidden" name="Ltname" bind:value={Ltname} />
			<input type="submit" class="minibtn bg-green-600  text-white cursor-pointer  mr-auto" value="登録する" />
		</form>
		<form method="POST" action="?/cancel">
			<input type="submit" class="minibtn bg-red-500 cursor-pointer  mr-auto text-white" value="登録を取り消す" />
			<input type="hidden" name="Ltname" bind:value={Ltname} />
		</form>
	</div>
</div>

<script lang="ts">
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	const LtInfo = data.LtInfo[0];
	const userSpekerInfo = data.userSpekaerInfo.data[0];
	const userProfile = data.userProfile;


	const holdDateJp = LtInfo.holdDate.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Tokyo' });
	
	$: LtTitle = userSpekerInfo.LtTitle;
	$: LtLink = userSpekerInfo.LtLink;
	$: LtComment = userSpekerInfo.LtComment;
	let selectedTags = userSpekerInfo.tags;
	if (selectedTags == undefined) selectedTags = [];

	let tags = ["技術", "生活", "表明", "甘口" , "中辛", "辛口"]
</script>

<div class="flex flex-col gap-10 justify-center items-center my-10 px-10">
	<div class="flex-col flex gap-10 items-center w-[80vw] md:w-[60vw] ">
		<!-- LT名 -->
		<div class="bg-slate-100 rounded-md flex flex-col items-center justify-center p-10 gap-3 w-full">
			<p class="text-2xl">{LtInfo.name}</p>
			<p>{holdDateJp}</p>
		</div>
		<!-- 概要 -->
		<div class="flex flex-col gap-4">
			<p class="text-xl">概要</p>
			<p>{LtInfo.desc}</p>
		</div>
	</div>
	<!-- 参加登録 -->
	<div class="flex flex-col gap-7 bg-slate-50 rounded-md px-3 py-7 w-[80vw] md:w-[60vw] ">
		<p class="text-xl">参加登録</p>
		<form method="POST" action="?/register" class="flex flex-col gap-10">
			<div class="flex flex-col gap-4">
				<p>タイトル <span class = "text-red-500"> (必須) </span></p>
				<input type="text" name="Lttitle" bind:value={LtTitle} placeholder="タイトル" class="border-2 rounded-sm px-2 py-1 " />
				{#if form?.missing}<p class="error text-red-500">タイトルを入力してください</p>{/if}
			</div>
			<div class="flex flex-col gap-4">
				<p>スライドURL</p>
				<input type="text" name="Ltlink" bind:value={LtLink} placeholder="https://example.com/" class="border-2 rounded-sm px-2 py-1" />
			</div>
			<div class="flex flex-col gap-4">
				<p>コメント</p>
				<textarea name="Ltcomment" bind:value={LtComment} placeholder="コメント" class="border-2 rounded-sm px-2 py-1 h-[100px]" />
			</div>
			<div class = "flex flex-col gap-4">
				<p>タグ</p>
				<div class = "flex flex-wrap gap-4">
					{#each tags as tag}
						<div>
							<input type="checkbox" class = "hidden peer" id={tag} name="tag" value={tag} bind:group={selectedTags}>
							<label for={tag} class="bg-slate-400 rounded-lg px-2 py-1 select-none text-white font-bold shadow-sm peer-checked:bg-blue-500">{tag}</label>
						</div>
					{/each}
				</div>
			</div>
			{#if form?.unknown}<p class="error text-red-500">{form.err}</p>{/if}
			<input type="hidden" name="Ltname" value={LtInfo.name} />
			<input type="hidden" name="LtID" value={LtInfo.id} />
			<input type="hidden" name="username" value={userProfile.data?.username} />
			<input type="submit" class="minibtn bg-green-600  text-white cursor-pointer  mr-auto" value="登録する" />
		</form>
		<form method="POST" action="?/cancel">
			<input type="submit" class="minibtn bg-red-500 cursor-pointer  mr-auto text-white" value="登録を取り消す" />
			<input type="hidden" name="LtID" value={LtInfo.id} />
			<input type="hidden" name="username" value={userProfile.data?.username} />
		</form>
	</div>
</div>

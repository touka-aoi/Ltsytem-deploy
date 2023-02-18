<script lang="ts">
	import { onMount } from 'svelte';
	import type { speakerInformation } from '$lib/LtSpeaker/LtSpeakerRequestInterface';
	import type { LtInfoOutput } from '$lib/LtHold/LtHoldRequstInterface';
	import type { userLtInformation, LtSpeakerInfomation } from '$lib/LtInfoFacade';
	import type { PageData } from './$types';
	import PastUserLtInformation from './PastUserLtInformation.svelte';
	import UserLtInformation from './UserLtInformation.svelte';
	import Logout from '$lib/Login/Logout.svelte';
	import UserInfo from './Userinfo.svelte';


	// サーバー情報
	export let data: PageData;

	const speakerData = data.speakerData.data;
	
	const viewrData = data.viewerData;
	const userData = data.userData;
	const session = data.session;

	$: isUser = false;
	$: userName = userData.username;

	$: reserveLt = [];
	$: endLt = [];

	async function getLtInfromation(LtID: Number) {
		const res = await fetch(`/api/ltinfo?ltid=${LtID}`);
		const LtInfo: LtInfoOutput = await res.json();
		return LtInfo
	}

	async function getSpeakerData(LtID: Number) {
		const res = await fetch(`/api/speakerinfo?ltid=${LtID}`);
		const speakerdata: LtSpeakerInfomation = await res.json();
		return speakerdata;
	}

	async function createUserLtData(speakerData: Array<speakerInformation>): Promise<Array<userLtInformation>> {
		let response: Array<userLtInformation> = [];
		for (let speaker of speakerData) {
			// get Lthold Data
			const LtInfo = await getLtInfromation(speaker.LtID);
			// get speaker Data
			const speakerInfo = await getSpeakerData(speaker.LtID);
			const result: userLtInformation = {
				data: {
				Ltname: LtInfo.data[0].name,
				LtID: LtInfo.data[0].id as number,
				maxMem:LtInfo.data[0].maxMem,
				holdDate: LtInfo.data[0].holdDate,
				holdPlace: LtInfo.data[0].holdPlace,
				assignMem: speakerInfo.data.length,
				LtLink: speaker.LtLink,
				LtTitle: speaker.LtTitle,
				LtComment: speaker.LtComment,
				tags:speaker.tags}}
			response.push(result);
		}			
		return response;
	}

	onMount(async () => {
		if (session?.user.id == userData.id) isUser = true;
		const userLtInfo =  await createUserLtData(speakerData);
		const reserve: any = [];
		const end: any = [];
		for (let data of userLtInfo) {
			if (new Date(data.data.holdDate) > new Date()) {
				reserve.push(data);
			} else {
				end.push(data);
			}
		}
		reserveLt = reserve;
		endLt = end;
	});

</script>

<div class="flex flex-col md:flex-row justify-center gap-10 my-10">
	<!-- userInfo -->
	<UserInfo {userName} size={12} />
	<!-- LT info -->
	<div class="px-3">
		<!-- Latest LT -->
		<div class="min-w-[70vw]">
			<h2 class="text-2xl pb-4">参加予定LT</h2>
			<!-- reserve LT  -->
			{#each reserveLt as speaker}
				<UserLtInformation LtData={speaker} canRevise={isUser}/>
			{/each}
		</div>
		
		<!-- Past LT -->
		<div>
			<p class="text-2xl pt-20 pb-4">参加したLT</p>
			{#each endLt as data}
				<PastUserLtInformation LtData={data} />
			{/each}
		</div>
		{#if isUser}
			<div class="flex justify-between my-4 items-end">
				<a href="/users/preference" class="bg-slate-100 rounded shadow-md flex gap-2 items-center p-2">
					<img src="/config.svg" class="max-w-[28px] min-w-[28px]" alt="preference" />
					<p class="font-bold">config</p>
				</a>
				<Logout />
			</div>
		{/if}
	</div>
</div>

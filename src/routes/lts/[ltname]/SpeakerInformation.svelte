<script lang="ts">
	import { base } from '$app/paths';
	import { Account } from '$lib/AccountsFacade';
	import type { speakerInformation } from '$lib/LtSpeaker/LtSpeakerRequestInterface';
	import Tags from '../../Tags.svelte';

	const accountService = new Account();

	interface tagColor {
		[key: string]: string;
		技術: string;
		生活: string;
		表明: string;
		甘口: string;
		中辛: string;
		辛口: string;
	}

	let tagColor: tagColor = {
		技術: 'bg-blue-600',
		生活: 'bg-fuchsia-300',
		表明: 'bg-sky-300',
		甘口: 'bg-green-400',
		中辛: 'bg-orange-300',
		辛口: 'bg-red-500'
	};

	export let speaker: speakerInformation;

	const userID = speaker.userID;
	const userProfile = accountService.profileRequest.getProfile(userID);

	$: LtTitle = speaker.LtTitle;
	$: LtComment = speaker.LtComment;
	$: LtLink = speaker.LtLink;
	$: tags = speaker.tags;
</script>

{#await userProfile then { data }}
	<div class="flex flex-col bg-zinc-50 roudned-sm p-4 gap-3 w-[80vw] md:w-[50vw]">
		<!-- profile Data -->
		<div class="flex flex-col justify-center items-center gap-3">
			<a href="{base}/users/{data?.username}" class = " p-2 rounded-lg px-5 shadow-md flex flex-col items-center justify-center">
				<!-- avatar Data -->
				{#if data?.avatarURL}
				{#await accountService.avatarRequest.downloadAvatar(data?.avatarURL) then avatar}
				<div class="overflow-hidden rounded-full w-[3em] h-[3em] md:w-[4em] md:h-[4em]">
					<img src={avatar.fileUrl} alt="avatar" />
				</div>
				{/await}
				{:else}
				<div class="bg-slate-100 rounded-full flex flex-col justify-center items-center" />
				{/if}
				<!-- username -->
				<p>
					{data?.username}
				</p>
			</a>
		</div>
		<div class="flex flex-col gap-2">
			<p class="text-lg font-bold text-center bg-white py-2 rounded-lg">
				{LtTitle}
			</p>
			{#if LtComment}
				<p class=" p-2 text-center">
					{LtComment}
				</p>
			{/if}
			<div class="flex items-center gap-3">
				<Tags {tags} />
				{#if LtLink}
					<a href={LtLink} class="px-2 py-1 rounded-xl bg-gray-300 ml-auto mt-3 ">
						<img src="/link.svg" alt="presentation link" class="w-4" />
					</a>
				{/if}
			</div>
		</div>
	</div>
{/await}

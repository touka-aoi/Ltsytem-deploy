<script lang="ts">
	import { Account } from '$lib/AccountsFacade';

  interface speakersInfo {
    username: string;
    avatarData: string | undefined;
    LtTitle?: string;
    LtComment?: string;
    LtLink?: string;
  }

	const accountService = new Account();

  export let speaker: speakersInfo;
  $: avatarData = speaker.avatarData;
  $: userName = speaker.username;
  $: LtTitle = speaker.LtTitle;
  $: LtComment = speaker.LtComment;
  $: LtLink = speaker.LtLink;

</script>


<div class="flex flex-col bg-zinc-50 roudned-sm p-4 gap-3 w-[80vw] md:w-[50vw]">
  <div class="flex flex-col justify-center items-center gap-3">
    {#if avatarData}
      {#await accountService.avatarRequest.downloadAvatar(avatarData) then avatar}
        <div class="overflow-hidden rounded-full w-[2em] h-[2em] md:w-[4em] md:h-[4em]">
          <img src={avatar.fileUrl} alt="avatar" />
        </div>
      {/await}
    {:else}
      <div class="bg-slate-100 rounded-full flex flex-col justify-center items-center"/>
    {/if}
    <p>
      {userName}
    </p>
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
    {#if LtLink}
      <a href={LtLink} class="px-2 py-1 rounded-xl bg-gray-300 mr-auto mt-3">
        <img src="/link.svg" alt="presentation link" class="w-4" />
      </a>
    {/if}
  </div>
</div>
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

</script>

<div class="bg-slate-300 rounded-sm p-2">
  <div class="mb-2 bg-slate-200 rounded drop-shadow p-1">
    <a href="{base}/lts/{LtData.Ltid}" class="flex  items-end">
      <p class=" bg-slate-100 px-3 rounded-full w-fit bottom-2 border-2 h-fit">
        {LtData.assginMem} / {LtData.maxMem}
      </p>
      <p class="text-xl">{LtData.Ltname}</p>
        <p>{LtData.holdDay} {LtData.holdHour}</p>
    </a>
  </div>
  <div class="flex w-full">
    <div class="bg-slate-100 w-full rounded-sm p-2 flex items-center gap-2">
      <a href={LtData.LtLink}>
        <img class="min-w-[18px] max-w-[18px]" src="/link.svg" alt="スライドリンク" />
      </a>
      <p class="text-xl font-bold">{LtData.LtTitle}</p>
    </div>
  </div>
</div>
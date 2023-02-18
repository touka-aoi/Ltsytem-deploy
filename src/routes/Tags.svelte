<script lang="ts">
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

  export let tags: Array<string>;

</script>

<div class="flex items-center gap-3 flex-wrap">
  {#if tags}
    {#each tags as tag}
      <p class="select-none px-3 {tagColor[tag]} text-white rounded-lg font-bold">{tag}</p>
    {/each}
  {/if}
</div>
<script lang="ts">
  import type { PageData } from './$types';
  import { base } from '$app/paths';

  // サーバー情報
	export let data: PageData;

  $: LatestLts = data.latestLt;  

</script>

<div class="mx-4">
  <section>
    <!-- ヘッダー -->
    <p class="text-gray-400 text-2xl py-2 my-6 border-b">開催予定LT大会</p>
    <div class="overflow-x-auto">
      <!-- テーブル -->
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-2 break-keep	">
              開始時刻
            </th>
            <th scope="col" class="px-6 py-2 break-keep">
              大会名
            </th>
            <th scope="col" class="px-6 py-2 break-keep">
              参加人数
            </th>
          </tr>
        </thead>
          <tbody>
            {#each LatestLts as Lt}
              {#if new Date() < new Date(Lt.holdDate)}
                <tr class="bg-white border-b  hover:bg-gray-50 ">
                  <td class="px-6 py-3">
                    {Lt.holdDate}
                  </td>
                  <th scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <a href="{base}/lts/{Lt.id}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">{Lt.name}</a>
                  </th>
                  <td class="px-6 py-3">
                      {Lt.assignMem}/{Lt.maxMem}
                  </td>
                </tr>   
              {/if} 
            {/each}
          </tbody>
      </table>
      </div>
  </section>

  <section>
    <!-- ヘッダー -->
    <p class="text-gray-400 text-2xl py-2 my-6 border-b">終了したLT大会</p>
    <div class="overflow-x-auto">
    <!-- テーブル -->
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-2 break-keep	">
            開始時刻
          </th>
          <th scope="col" class="px-6 py-2 break-keep">
            大会名
          </th>
          <th scope="col" class="px-6 py-2 break-keep">
            参加人数
          </th>
        </tr>
      </thead>
        <tbody>
          {#each LatestLts as Lt}
            {#if new Date() > new Date(Lt.holdDate)}
              <tr class="bg-white border-b  hover:bg-gray-50 ">
                <td class="px-6 py-3">
                  {Lt.holdDate}
                </td>
                <th scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <a href="{base}/lts/{Lt.id}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">{Lt.name}</a>
                </th>
                <td class="px-6 py-3">
                    {Lt.assignMem}/{Lt.maxMem}
                </td>
              </tr>   
            {/if} 
          {/each}
        </tbody>
    </table>
    </div>
  </section>
</div>
<div class="h-100v">
</div>
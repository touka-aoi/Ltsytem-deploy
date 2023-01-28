<script lang="ts">
	import GoogleLogin from '$lib/Login/googleLogin.svelte';
</script>

<div class="p-9 pt-4 w-fit rounded-md flex flex-col items-center gap-5 bg-slate-300">
	<p class="font-bold">ログイン</p>
	<div class="flex flex-col">
		<GoogleLogin />
	</div>
</div>

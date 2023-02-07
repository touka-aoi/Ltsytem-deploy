<script lang="ts">
	import Register from './AccountRegister.svelte';
	import { page } from '$app/stores';
</script>

<div class="flex items-center justify-center h-screen">
	<Register session={$page.data.session} />
</div>

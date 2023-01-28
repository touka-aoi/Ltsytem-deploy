<script lang="ts">
	import { page } from '$app/stores';
	import Nav from './Nav.svelte';
	import Logo from './Logo.svelte';
</script>

<header class="top-0 left-0 w-full sticky  bg-neutral-200 shadow border-b border-gray-200">
	<div class="@container mx-auto px-6 h-16 flex justify-between items-center">
		<Logo />
		<Nav session={$page.data.session} />
	</div>
</header>

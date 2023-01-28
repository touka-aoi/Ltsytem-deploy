<script lang="ts">
	import '../app.css';

	import { supabase } from '$lib/databaseClient/supabaseClient';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	import Header from '../lib/Header.svelte';
	import Fotter from '../lib/Fotter.svelte';

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});
		
		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<Header />
<slot />
<Fotter />

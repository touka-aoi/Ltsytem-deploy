<script lang="ts">
	import { supabase } from '$lib/databaseClient/supabaseClient';
	import { signInWithGoogle } from '$lib/Login/googleLogin';
</script>

<button
	on:click={() => {
		signInWithGoogle(supabase);
	}}
	class="flex bg-google-blue w-72 rounded-sm"
>
	<img src="/btn_google_light_normal_ios.svg" alt="Login with Google" />
	<p class="m-auto text-base font-bold text-google-white">Googleでログイン</p>
</button>

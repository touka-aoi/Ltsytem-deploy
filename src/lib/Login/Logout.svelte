<script lang="ts">
	import { Session } from '$lib/Session';
	const session = new Session();

	let loading = false;
	async function SignOut() {
		loading = true;
		const error = await session.signOut();
		loading = false;
	}
</script>

<button on:click={SignOut} disabled={loading} class="minibtn bg-slate-50 drop-shadow"> ログアウト </button>

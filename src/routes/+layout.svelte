<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from 'svelte-sonner';
	let { children } = $props();
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	let loading = $state(false);

	beforeNavigate(() => {
		loading = true;
	});

	afterNavigate(() => {
		loading = false;
	});

	$inspect('is it loading:', loading);
	// TODO: is backdrop good in light and dark mode?
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if loading}
	<div class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-3xl">
		<div class="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-white"></div>
	</div>
{/if}

<Toaster />
<ModeWatcher />
{@render children()}

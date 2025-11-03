<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import { Heart } from '@lucide/svelte';
	import { PUBLIC_SITE_TITLE } from '$env/static/public';
	let { children } = $props();
</script>

<div class="flex min-h-dvh flex-col">
	<Header />

	<main class="container mx-auto flex-1">
		{@render children()}
	</main>

	<footer class="container mx-auto flex items-center justify-between py-6">
		<span class="text-sm text-muted-foreground">
			&copy; All rights are reserved for {PUBLIC_SITE_TITLE} &mdash; 2025</span
		>
		<p class="flex items-center gap-1 text-sm text-muted-foreground">
			Crafted with <Heart class="size-5 animate-pulse fill-rose-500 text-rose-500" /> by
			<a
				class="underline hover:text-foreground"
				target="_blank"
				href="https://web.facebook.com/adel2700">The Pharmaxist</a
			>
		</p>
	</footer>
</div>

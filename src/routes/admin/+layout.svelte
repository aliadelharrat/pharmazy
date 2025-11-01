<script lang="ts">
	import Header from '$lib/components/admin/header.svelte';

	let { children } = $props();
</script>

<section class="container mx-auto space-y-5 pb-10">
	<Header />
	<main>
		{@render children()}
	</main>
</section>

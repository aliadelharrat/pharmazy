<script>
	import { PUBLIC_SITE_TITLE } from '$env/static/public';
	import { Button } from '$lib/components/ui/button';
</script>

<svelte:head>
	<title>
		Home | {PUBLIC_SITE_TITLE}
	</title>
</svelte:head>

<div class="space-y-5 text-center">
	<h1 class="pt-20 text-center text-5xl font-bold">Welcome to Pharmazy</h1>
	<p>Where you can learn how to be a good pharmacist</p>
	<Button href="/dashboard">Go to first chapter</Button>
</div>

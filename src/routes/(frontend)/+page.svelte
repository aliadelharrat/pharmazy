<script>
	import { PUBLIC_SITE_TITLE } from '$env/static/public';
	import { Button } from '$lib/components/ui/button';
	import { paths } from '$lib/paths';
</script>

<svelte:head>
	<title>
		Home | {PUBLIC_SITE_TITLE}
	</title>
</svelte:head>

<section class="flex min-h-[calc(100vh-158px)] items-center justify-center px-4">
	<div class="max-w-4xl text-center">
		<h1 class="mb-6 text-5xl leading-20 font-bold text-foreground md:text-7xl">
			Can you decode the prescription?
		</h1>
		<p class="mb-8 text-xl text-muted-foreground md:text-2xl">
			Challenge your colleagues. Prove your skills. Climb the leaderboard.
		</p>
		<div class="flex flex-wrap justify-center gap-4">
			<a
				href={paths.dashboard}
				class="rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-background transition-all hover:scale-105 hover:bg-primary/85"
			>
				Start Challenge
			</a>
			<a
				href="/leaderboard"
				class="rounded-lg border border-white/20 bg-white/10 px-8 py-4 text-lg font-semibold text-foreground backdrop-blur-sm transition-all hover:bg-white/20"
			>
				View Leaderboard
			</a>
		</div>
	</div>
</section>

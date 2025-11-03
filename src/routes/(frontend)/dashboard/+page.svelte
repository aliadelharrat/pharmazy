<script lang="ts">
	import type { PageProps } from './$types';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Progress } from '$lib/components/ui/progress';
	import { PUBLIC_SITE_TITLE } from '$env/static/public';
	import { paths } from '$lib/paths';
	import { authClient } from '$lib/auth-client';

	let { data }: PageProps = $props();

	const session = authClient.useSession();
	console.log($session.data);
</script>

<svelte:head>
	<title>
		Dashboard | {PUBLIC_SITE_TITLE}
	</title>
</svelte:head>

<div class="container mx-auto my-10">
	<section class="grid grid-cols-3 gap-10">
		{#each data.categories as category (category.id)}
			<Card.Root class={`relative border-4 ${category.border_color}`}>
				<Card.Header>
					<Card.Title>{category.name}</Card.Title>
					<Card.Description>{category.desc}</Card.Description>
				</Card.Header>
				<Card.Content>
					{@const prescriptionsNum = category.prescriptions.length}
					<p class="text-sm text-muted-foreground">
						{prescriptionsNum} prescriptions
					</p>
				</Card.Content>
				<Card.Footer>
					<Progress bg={category.bg_color} bgSecondary={category.bg_secondary_color} value={100} />
				</Card.Footer>

				<a
					href={paths.categories.show(category.slug)}
					aria-label="go to category"
					class="absolute inset-0"
				></a>
			</Card.Root>
		{/each}
	</section>

	<p class="mt-10 text-sm text-muted-foreground">
		Tip: Start with <span class="font-bold">{data.categories[0].name}</span> to learn the basics!
	</p>
</div>

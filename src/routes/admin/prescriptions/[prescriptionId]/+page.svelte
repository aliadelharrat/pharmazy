<script lang="ts">
	import type { PageProps } from './$types';
	import * as Card from '$lib/components/ui/card/index.js';
	import { formatDate } from '$lib/utils/format-date';
	import { Button } from '$lib/components/ui/button';
	import { paths } from '$lib/paths';
	import { PUBLIC_ADMIN_TITLE } from '$env/static/public';

	const { data }: PageProps = $props();
	const { id, created_at, views, category } = data.prescription;
</script>

<svelte:head>
	<title>
		View prescription | {PUBLIC_ADMIN_TITLE}
	</title>
</svelte:head>

<section class="flex items-start gap-10">
	<div class="w-sm flex-1 overflow-hidden rounded-xl">
		<img class="size-full object-cover" src={data.prescription.imageUrl} alt="prescription" />
	</div>

	<div class="flex flex-1 flex-col gap-5">
		<Card.Root>
			<Card.Header>
				<Card.Title>
					{category.name}
				</Card.Title>
				<Card.Description>
					Created by Adel Harrat &mdash; {formatDate(created_at)}
				</Card.Description>
			</Card.Header>
			<Card.Content class="space-y-4 py-5">
				{#each data.prescription.drugs as drug, index (index)}
					<p class="text-2xl font-semibold uppercase">
						{index + 1}. {drug}
					</p>
				{/each}
			</Card.Content>
			<Card.Footer>
				<p class="text-sm text-muted-foreground">
					Viewed {views}
					{views === 1 ? 'time' : 'times'}
				</p>
			</Card.Footer>
		</Card.Root>

		<div class="flex justify-end gap-5 *:grow-0">
			<Button href={paths.admin.prescriptions.edit(id)} variant="outline" class="flex-1">
				Edit
			</Button>
			<Button target="_blank" href={paths.prescriptions.show(id)} variant="outline" class="flex-1"
				>Solve</Button
			>
		</div>
	</div>
</section>

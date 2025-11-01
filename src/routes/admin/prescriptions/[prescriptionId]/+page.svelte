<script lang="ts">
	import type { PageProps } from './$types';
	import * as Card from '$lib/components/ui/card/index.js';
	import { formatDate } from '$lib/utils/format-date';
	import { Button } from '$lib/components/ui/button';
	import { paths } from '$lib/paths';

	const { data }: PageProps = $props();
	const { id, authorId, created_at, views, category } = data.prescription;
</script>

<section class="mx-auto flex max-w-4xl items-start gap-10">
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
					Created by {'Adel Harrat'} &mdash; {formatDate(created_at)}
				</Card.Description>
			</Card.Header>
			<Card.Content class="space-y-4 py-5">
				{#each data.prescription.drugs as drug, index}
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

		<div class="flex gap-5">
			<Button href={paths.admin.prescriptions.edit(id)} variant="outline" class="flex-1"
				>Edit</Button
			>
			<Button variant="outline" class="flex-1">Solve</Button>
		</div>
	</div>
</section>

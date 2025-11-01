<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table/index.js';
	import { paths } from '$lib/paths';
	import { toast } from 'svelte-sonner';
	import type { PageProps } from './$types';
	import { invalidateAll } from '$app/navigation';
	import EmptyState from '$lib/components/admin/empty-state.svelte';
	import dayjs from 'dayjs';
	import { formatDate } from '$lib/utils/format-date';
	const { data }: PageProps = $props();
</script>

{#if data.prescriptions.length === 0}
	<EmptyState
		title="No prescriptions yet"
		description="You haven't created any prescriptions yet. Get started by creating your first prescription."
		action={{
			label: 'Create new prescription',
			href: paths.admin.prescriptions.create
		}}
	/>
{:else}
	<section class="mx-auto max-w-3xl space-y-5">
		<div class="flex items-center justify-between">
			<h1 class="text-xl font-bold">Manage prescriptions</h1>
			<Button href={paths.admin.prescriptions.create} variant="outline" size="sm">Create</Button>
		</div>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>Category</Table.Head>
					<Table.Head>Author</Table.Head>
					<Table.Head>Views</Table.Head>
					<Table.Head></Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data.prescriptions as prep}
					<Table.Row>
						<Table.Cell>{prep.category.name}</Table.Cell>
						<Table.Cell class="flex flex-col gap-1">
							<span>Adel Harrat</span>
							<span class="text-xs opacity-75">
								{formatDate(prep.created_at)}
							</span>
						</Table.Cell>
						<Table.Cell>{prep.views}</Table.Cell>

						<Table.Cell class="space-x-2 text-right">
							<Button size="sm" href={paths.admin.prescriptions.show(prep.id)} variant="outline">
								View
							</Button>

							<Button size="sm" href={paths.admin.prescriptions.edit(prep.id)} variant="outline">
								Edit
							</Button>

							<form
								action="?/delete"
								method="post"
								class="inline-block"
								use:enhance={() => {
									return async ({ result }) => {
										if (result.type === 'success') {
											toast.success('Prescription deleted successfully');
											await invalidateAll();
										} else if (result.type === 'failure') {
											toast.error(
												(result.data as { message?: string })?.message ?? 'Failed to delete'
											);
										}
									};
								}}
							>
								<input type="hidden" name="id" value={prep.id} />
								<Button type="submit" size="sm" variant="destructive">Delete</Button>
							</form>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</section>
{/if}

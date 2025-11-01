<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table/index.js';
	import { paths } from '$lib/paths';
	import { toast } from 'svelte-sonner';
	import type { PageProps } from './$types';
	import { invalidateAll } from '$app/navigation';
	import EmptyState from '$lib/components/admin/empty-state.svelte';
	const { data }: PageProps = $props();
</script>

{#if data.categories.length === 0}
	<EmptyState
		title="No categories yet"
		description="You haven't created any categories yet. Get started by creating your first category."
		action={{
			label: 'Create new category',
			href: paths.admin.categories.create
		}}
	/>
{:else}
	<section class="mx-auto max-w-xl space-y-5">
		<div class="flex items-center justify-between">
			<h1 class="text-xl font-bold">Manage categories</h1>
			<Button href={paths.admin.categories.create} variant="outline" size="sm">Create</Button>
		</div>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>Name</Table.Head>
					<Table.Head>Slug</Table.Head>
					<Table.Head></Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data.categories as cat}
					<Table.Row>
						<Table.Cell>{cat.name}</Table.Cell>
						<Table.Cell>{cat.slug}</Table.Cell>
						<Table.Cell class="space-x-2 text-right">
							<Button size="sm" href={paths.admin.categories.edit(cat.id)} variant="outline">
								Edit
							</Button>

							<form
								action="?/delete"
								method="post"
								class="inline-block"
								use:enhance={() => {
									return async ({ result }) => {
										if (result.type === 'success') {
											toast.success('Category deleted successfully');
											await invalidateAll();
										} else if (result.type === 'failure') {
											toast.error(
												(result.data as { message?: string })?.message ?? 'Failed to delete'
											);
										}
									};
								}}
							>
								<input type="hidden" name="id" value={cat.id} />
								<Button type="submit" size="sm" variant="destructive">Delete</Button>
							</form>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</section>
{/if}

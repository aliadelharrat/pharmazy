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
	import { PUBLIC_ADMIN_TITLE } from '$env/static/public';
	import { Eye, Pen, Trash2 } from '@lucide/svelte';
	const { data }: PageProps = $props();
</script>

<svelte:head>
	<title>
		Prescriptions | {PUBLIC_ADMIN_TITLE}
	</title>
</svelte:head>

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
	<section class="mx-auto max-w-xl space-y-5">
		<div class="flex items-center justify-between">
			<h1 class="text-xl font-bold">Manage prescriptions</h1>
			<Button href={paths.admin.prescriptions.create} variant="outline" size="sm">Create</Button>
		</div>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>Author</Table.Head>
					<Table.Head class="w-full">Category</Table.Head>
					<Table.Head></Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data.prescriptions as prep}
					<Table.Row>
						<Table.Cell class={`flex flex-col gap-1 border-l-4 ${prep.category.border_color}`}>
							<span>Adel Harrat</span>
							<span class="text-xs opacity-75">
								{formatDate(prep.created_at)}
							</span>
						</Table.Cell>
						<Table.Cell class="w-full">
							{prep.category.name}
						</Table.Cell>
						<Table.Cell class="space-x-2 text-right">
							<Button size="sm" href={paths.admin.prescriptions.show(prep.id)} variant="outline">
								<Eye />
							</Button>
							<Button size="sm" href={paths.admin.prescriptions.edit(prep.id)} variant="outline">
								<Pen />
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
								<Button type="submit" size="sm" variant="destructive">
									<Trash2 />
								</Button>
							</form>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</section>
{/if}

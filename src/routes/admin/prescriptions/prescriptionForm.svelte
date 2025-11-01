<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { paths } from '$lib/paths';
	import { createUploadThing } from '$lib/utils/uploadthing';
	import { Button } from '$lib/components/ui/button';
	import * as Field from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select/index.js';
	import { toast } from 'svelte-sonner';
	import { Plus, Trash2 } from '@lucide/svelte';
	import { invalidateAll } from '$app/navigation';

	type Category = {
		id: string;
		name: string;
		slug: string;
		created_at: Date;
	};

	const { title, desc, submit, categories, oldImageUrl, oldDrugs, oldCategoryId } = $props<{
		title: string;
		desc: string;
		submit: string;
		categories: Category[];
		oldImageUrl?: string;
		oldDrugs?: string[];
		oldCategoryId?: string;
	}>();

	let imageUrl = $state(oldImageUrl ?? '');

	let drugs = $state<{ id: string; value: string }[]>(
		oldDrugs && oldDrugs.length
			? oldDrugs.map((d: { id: string; value: string }) => ({ id: crypto.randomUUID(), value: d }))
			: [
					{
						id: crypto.randomUUID(),
						value: ''
					}
				]
	);

	let drugsString = $derived(
		JSON.stringify(drugs.map((d) => d.value).filter((v) => v.trim() !== ''))
	);

	let categoryValue = $state(oldCategoryId ?? '');
	const triggerContent = $derived(
		categories.find((c: Category) => c.id === categoryValue)?.name ?? 'Select a category'
	);

	const { startUpload } = createUploadThing('imageUploader', {
		onClientUploadComplete: () => {
			toast.success('Image uploaded successfully');
		}
	});

	const handleSubmit: SubmitFunction = () => {
		return async ({ result }) => {
			if (result.type === 'failure') {
				toast.error((result.data as { message?: string })?.message ?? 'Submission failed');
			} else if (result.type === 'success') {
				toast.success((result.data as { message?: string })?.message ?? 'Submitted successfully');
				await invalidateAll();
				if (result.data?.clearForm) {
					imageUrl = '';
					drugs = [
						{
							id: crypto.randomUUID(),
							value: ''
						}
					];
					categoryValue = '';
				}
			}
		};
	};

	const selectFile = async (e: Event) => {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (!file) return;

		const resp = await startUpload([file]);
		if (resp?.[0]?.ufsUrl) {
			imageUrl = resp[0].ufsUrl;
		}
	};

	function deleteItem(id: string) {
		if (drugs.length === 1) {
			const lastItem = drugs[drugs.length - 1];
			lastItem.value = '';
			return;
		}
		drugs = drugs.filter((d) => d.id !== id);
	}

	function addItem() {
		const lastItem = drugs[drugs.length - 1];
		if (lastItem.value.trim() === '' && drugs.length > 0) {
			return;
		}
		drugs = [
			...drugs,
			{
				id: crypto.randomUUID(),
				value: ''
			}
		];
	}
</script>

<form method="POST" use:enhance={handleSubmit} class="mx-auto max-w-xl">
	<Field.Set>
		<Field.Legend>{title}</Field.Legend>
		<Field.Description>{desc}</Field.Description>
		<Field.Group>
			<Field.Field>
				<div class="grid w-full max-w-sm items-center gap-4">
					<Label for="imageUrl">Prescription image</Label>
					<Input id="imageUrl" type="file" onchange={selectFile} />
					<input type="hidden" name="imageUrl" value={imageUrl} />
				</div>
			</Field.Field>

			{#if imageUrl}
				<Field.Field>
					<img src={imageUrl} alt="prescription" />
				</Field.Field>
			{/if}

			<Field.Field>
				<Field.Label for="name">Drugs</Field.Label>
				<input type="hidden" name="drugs" value={drugsString} />
				{#each drugs as drug (drug.id)}
					{@const lastDrug = drugs[drugs.length - 1]}

					<div class="flex items-center gap-2">
						<Button variant="destructive" onclick={() => deleteItem(drug.id)}>
							<Trash2 />
						</Button>
						<Input
							name={`name-${drug.id}`}
							id={`id-${drug.id}`}
							autocomplete="off"
							placeholder="Enter drug name"
							bind:value={drug.value}
						/>

						{#if drug.id === lastDrug.id}
							<Button variant="outline" onclick={addItem}>
								<Plus />
							</Button>
						{/if}
					</div>
				{/each}
			</Field.Field>

			<Field.Field>
				<Field.Label for="category">Category</Field.Label>

				<Select.Root type="single" name="category" bind:value={categoryValue}>
					<Select.Trigger class="w-[180px]">
						{triggerContent}
					</Select.Trigger>
					<Select.Content id="category">
						{#each categories as cat (cat.id)}
							<Select.Item value={cat.id} label={cat.name}>{cat.name}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</Field.Field>

			<Field.Field orientation="responsive">
				<Button type="submit">{submit}</Button>
				<Button href={paths.admin.prescriptions.dashboard} variant="outline">Cancel</Button>
			</Field.Field>
		</Field.Group>
	</Field.Set>
</form>

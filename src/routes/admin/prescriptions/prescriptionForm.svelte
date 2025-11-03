<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { createUploadThing } from '$lib/utils/uploadthing';
	import { Button } from '$lib/components/ui/button';
	import * as Field from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select/index.js';
	import { toast } from 'svelte-sonner';
	import { Plus, Trash2 } from '@lucide/svelte';
	import { invalidateAll } from '$app/navigation';
	import { tick } from 'svelte';

	type Category = {
		id: string;
		name: string;
		slug: string;
		created_at: Date;
	};

	const { title, desc, submit, categories, oldImageUrl, oldDrugs, oldCategoryId, cancelUrl } =
		$props<{
			title: string;
			desc: string;
			submit: string;
			categories: Category[];
			oldImageUrl?: string;
			oldDrugs?: string[];
			oldCategoryId?: string;
			cancelUrl: string;
		}>();

	let imageUrl = $state(oldImageUrl ?? '');

	function removeImageUrl() {
		imageUrl = '';
	}

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

	let refs: HTMLInputElement[] = [];

	async function handleKeydown(e: KeyboardEvent, i: number) {
		if (e.key === 'Enter') {
			e.preventDefault();
			addItem();
			await tick(); // first DOM update
			await tick(); // ensure refs[] updated

			const next = refs[i + 1];
			if (next instanceof HTMLInputElement) next.focus();
		}
	}
</script>

<form method="POST" use:enhance={handleSubmit}>
	<Field.Set>
		<Field.Legend>{title}</Field.Legend>
		<Field.Description>{desc}</Field.Description>

		<Field.Group>
			<section class="grid grid-cols-2 gap-10">
				<div class="flex-1">
					<Field.Field class={imageUrl && 'hidden'}>
						<div class="grid w-full max-w-sm items-center gap-4">
							<Label for="imageUrl">Prescription image</Label>
							<Input id="imageUrl" type="file" onchange={selectFile} />
							<input type="hidden" name="imageUrl" value={imageUrl} />
						</div>
					</Field.Field>

					{#if imageUrl}
						<div class="relative">
							<Field.Field>
								<img src={imageUrl} alt="prescription" class="w-full rounded-xl object-cover" />
							</Field.Field>

							<div class="absolute top-5 right-5">
								<Button onclick={removeImageUrl} variant="destructive" size="icon-lg">
									<Trash2 />
								</Button>
							</div>
						</div>
					{/if}
				</div>

				<div class="flex-1 space-y-5">
					<Field.Field>
						<Field.Label for="name">Drugs</Field.Label>
						<input type="hidden" name="drugs" value={drugsString} />

						{#each drugs as drug, i (drug.id)}
							{@const lastDrug = drugs[drugs.length - 1]}

							<div class="flex items-center gap-2">
								<Input
									name={`name-${drug.id}`}
									id={`id-${drug.id}`}
									autocomplete="on"
									placeholder="Enter drug name"
									bind:value={drug.value}
									onkeydown={(e) => handleKeydown(e, i)}
								/>

								<Button size="icon-sm" variant="ghost" onclick={() => deleteItem(drug.id)}>
									<Trash2 />
								</Button>
							</div>

							{#if drug.id === lastDrug.id}
								<div>
									<Button variant="outline" onclick={addItem}>
										<Plus /> Add new drug
									</Button>
								</div>
							{/if}
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
						<Button href={cancelUrl} variant="outline">Cancel</Button>
					</Field.Field>
				</div>
			</section>
		</Field.Group>
	</Field.Set>
</form>

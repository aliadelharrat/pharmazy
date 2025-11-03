<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import * as Field from '$lib/components/ui/field/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import { Input } from '$lib/components/ui/input';
	import { paths } from '$lib/paths';
	import { slugifyText } from '$lib/utils/slugify-slug';
	import { toast } from 'svelte-sonner';

	import { getColorByBorder, tailwindColors } from '$lib/utils/tailwind-colors';

	const { title, desc, submit, category } = $props<{
		title: string;
		desc: string;
		submit: string;
		category?: {
			id: string;
			name: string;
			slug: string;
			desc: string;
			bg_color: string;
			bg_secondary_color: string;
			border_color: string;
			created_at: Date;
		};
	}>();

	let name = $state(category?.name || '');
	let slug = $derived.by(() => slugifyText(name));
	let selectedColor = $state(getColorByBorder(category?.border_color).name);
</script>

<form
	method="POST"
	use:enhance={() => {
		return ({ result }) => {
			if (result.type === 'failure') {
				toast.error((result.data?.message as string) || 'Failed');
			} else if (result.type === 'success') {
				toast.success((result.data?.message as string) || 'Success');
				if (result.data?.clearForm) {
					name = '';
				}
			}
		};
	}}
	class="mx-auto max-w-xl"
>
	<Field.Set>
		<Field.Legend>{title}</Field.Legend>
		<Field.Description>{desc}</Field.Description>
		<Field.Group>
			<Field.Field>
				<Field.Label for="name">Name</Field.Label>
				<Input
					name="name"
					id="name"
					autocomplete="off"
					placeholder="Enter name"
					bind:value={name}
				/>
			</Field.Field>

			<input type="hidden" name="slug" value={slug} />

			<Field.Field>
				<Field.Label for="desc">Description</Field.Label>
				<Input
					name="desc"
					id="desc"
					autocomplete="off"
					placeholder="Enter description"
					defaultValue={category?.desc}
				/>
			</Field.Field>

			<Field.Field>
				<input type="hidden" name="color_name" value={selectedColor} />
				<Field.Label for="bg_color">Color</Field.Label>
				<RadioGroup.Root class="grid grid-cols-12" bind:value={selectedColor}>
					{#each tailwindColors as color}
						<label for={color.name} class="cursor-pointer">
							<div
								class={`${color.bg} size-10 rounded-full border-2 transition-all ${
									selectedColor === color.name
										? 'border-white ring-2 ring-gray-900 ring-offset-2'
										: 'border-transparent hover:border-white'
								}`}
							>
								<RadioGroup.Item class="hidden" value={color.name} id={color.name} />
							</div>
						</label>
					{/each}
				</RadioGroup.Root>
			</Field.Field>

			<Field.Field orientation="responsive">
				<Button type="submit">{submit}</Button>
				<Button href={paths.admin.categories.dashboard} variant="outline">Cancel</Button>
			</Field.Field>
		</Field.Group>
	</Field.Set>
</form>

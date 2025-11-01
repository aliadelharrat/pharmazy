<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import * as Field from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input';
	import { paths } from '$lib/paths';
	import slugify from 'slugify';
	import { toast } from 'svelte-sonner';

	const { title, desc, submit, nameValue } = $props<{
		title: string;
		desc: string;
		submit: string;
		nameValue?: string;
	}>();

	let name = $state(nameValue || '');
	let slug = $derived.by(() => slugify(name, { lower: true, strict: true }));
</script>

<form
	method="POST"
	use:enhance={() => {
		return ({ result }) => {
			if (result.type === 'failure') {
				toast.error(result.data?.message || 'Something went wrong');
			} else if (result.type === 'success') {
				toast.success(result.data?.message);
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
			<Field.Field>
				<Field.Label for="slug">Slug</Field.Label>
				<Input
					name="slug"
					id="slug"
					autocomplete="off"
					placeholder="Enter slug"
					readonly
					value={slug}
				/>
			</Field.Field>
			<Field.Field orientation="responsive">
				<Button type="submit">{submit}</Button>
				<Button href={paths.admin.categories.dashboard} variant="outline">Cancel</Button>
			</Field.Field>
		</Field.Group>
	</Field.Set>
</form>

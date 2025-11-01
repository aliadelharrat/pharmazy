<script lang="ts">
	import CategoryForm from '../../categoryForm.svelte';
	import type { PageProps } from './$types';
	const { data }: PageProps = $props();
</script>

<CategoryForm
	nameValue={data?.category?.name}
	title="Edit category"
	desc="Start by editing something..."
	submit="update category"
/>

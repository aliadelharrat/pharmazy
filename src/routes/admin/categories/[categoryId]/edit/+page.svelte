<script lang="ts">
	import { PUBLIC_ADMIN_TITLE } from '$env/static/public';
	import CategoryForm from '../../categoryForm.svelte';
	import type { PageProps } from './$types';
	const { data }: PageProps = $props();
</script>

<svelte:head>
	<title>
		Edit category | {PUBLIC_ADMIN_TITLE}
	</title>
</svelte:head>

<CategoryForm
	category={data?.category}
	title="Edit category"
	desc="Start by editing something..."
	submit="update category"
/>

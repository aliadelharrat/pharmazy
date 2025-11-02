<script lang="ts">
	import { PUBLIC_ADMIN_TITLE } from '$env/static/public';
	import CategoryForm from '../categoryForm.svelte';
</script>

<svelte:head>
	<title>
		Create category | {PUBLIC_ADMIN_TITLE}
	</title>
</svelte:head>

<CategoryForm
	title="Create new category"
	desc="Enter name and slug for your category"
	submit="Save"
/>

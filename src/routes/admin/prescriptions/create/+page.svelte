<script lang="ts">
	import PrescriptionForm from '../prescriptionForm.svelte';
	import type { PageProps } from './$types';
	const { data }: PageProps = $props();
</script>

<PrescriptionForm
	categories={data?.categories}
	title="Create new prescription"
	desc="Enter the details of the new prescription below."
	submit="Save"
/>

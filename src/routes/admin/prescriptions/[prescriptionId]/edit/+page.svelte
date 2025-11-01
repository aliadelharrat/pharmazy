<script lang="ts">
	import PrescriptionForm from '../../prescriptionForm.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<PrescriptionForm
	categories={data?.categories}
	title="Edit prescription"
	desc="Enter the new details for your prescription below."
	submit="Update"
	oldImageUrl={data.prescription.imageUrl ?? ''}
	oldDrugs={data.prescription.drugs ?? []}
	oldCategoryId={data.prescription.category.id ?? ''}
/>

<script lang="ts">
	import { PUBLIC_ADMIN_TITLE } from '$env/static/public';
	import { paths } from '$lib/paths';
	import PrescriptionForm from '../../prescriptionForm.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>
		Edit prescription | {PUBLIC_ADMIN_TITLE}
	</title>
</svelte:head>

<PrescriptionForm
	categories={data?.categories}
	title="Edit prescription"
	desc="Enter the new details for your prescription below."
	submit="Update"
	cancelUrl={paths.admin.prescriptions.show(data.prescription.id)}
	oldImageUrl={data.prescription.imageUrl ?? ''}
	oldDrugs={data.prescription.drugs ?? []}
	oldCategoryId={data.prescription.category.id ?? ''}
/>

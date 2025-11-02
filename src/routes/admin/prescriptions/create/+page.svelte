<script lang="ts">
	import { PUBLIC_ADMIN_TITLE } from '$env/static/public';
	import { paths } from '$lib/paths';
	import PrescriptionForm from '../prescriptionForm.svelte';
	import type { PageProps } from './$types';
	const { data }: PageProps = $props();
</script>

<svelte:head>
	<title>
		Create prescription | {PUBLIC_ADMIN_TITLE}
	</title>
</svelte:head>

<PrescriptionForm
	cancelUrl={paths.admin.prescriptions.dashboard}
	categories={data?.categories}
	title="Create new prescription"
	desc="Enter the details of the new prescription below."
	submit="Save"
/>

<script>
	import { paths } from '$lib/paths';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Pill } from '@lucide/svelte';
</script>

<header class="grid grid-cols-4 py-6">
	<nav class="flex items-center gap-3">
		<a href="/" target="_blank">
			<Pill class="size-7 text-primary" />
		</a>
		<a href={paths.admin.dashboard} class="text-2xl font-bold text-primary">Pharmazy</a>
	</nav>

	<nav class="col-span-2 grid place-items-center">
		<ul class="flex items-center gap-5">
			<li>
				<a href={paths.admin.categories.dashboard} class="text-sm opacity-75 hover:opacity-100"
					>Categories</a
				>
			</li>
			<li>
				<a href={paths.admin.prescriptions.dashboard} class="text-sm opacity-75 hover:opacity-100"
					>Prescriptions</a
				>
			</li>
			<li>
				<a href="#" class="text-sm opacity-75 hover:opacity-100">Users</a>
			</li>
		</ul>
	</nav>

	<nav class="grid justify-end">
		<ul class="flex items-center gap-5">
			<li class="opacity-75">Adel Harrat</li>
			<li>
				<Button variant="outline">Log out</Button>
			</li>
		</ul>
	</nav>
</header>

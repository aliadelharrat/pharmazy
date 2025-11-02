<script lang="ts">
	import { paths } from '$lib/paths';
	import type { PageProps } from './$types';
	const { data }: PageProps = $props();
	const category = data.category;
</script>

<section class="container mx-auto my-10 grid grid-cols-6 gap-10">
	{#each category.prescriptions as prescription, index}
		<div class="group relative">
			<article
				class={`overflow-hidden rounded-2xl border-4 border-transparent transition-all duration-300 ease-in-out group-hover:border-primary`}
			>
				<div>
					<img src={prescription.imageUrl} alt="" />
				</div>
			</article>

			<p class="mt-3 text-center text-sm font-bold group-hover:text-primary">{index + 1}</p>

			<a
				href={paths.prescriptions.show(prescription.id)}
				aria-label="go and solve a prescription"
				class="absolute inset-0"
			></a>
		</div>
	{/each}
</section>

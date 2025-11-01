<script lang="ts">
	import { resolve } from '$app/paths';
	import { paths } from '$lib/paths';
	import { twMerge } from 'tailwind-merge';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<section class="grid min-h-dvh grid-cols-5">
	<aside class="col-span-1 border-r border-secondary p-5">
		<h1>
			<a href={resolve('/')} class="text-center text-3xl font-extrabold text-primary">Pharmazy</a>
		</h1>

		<ul class="mt-10">
			{#each data.categories as category (category.id)}
				<li class="group">
					<a
						href={paths.category(category.slug)}
						class={twMerge(
							'flex items-center justify-between rounded-md px-3 py-3 transition-all duration-300 ease-in-out group-hover:indent-2 hover:bg-accent'
						)}
					>
						<span>
							{category.name}
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</aside>
	<main class="col-span-4 p-5">
		<slot />
	</main>
</section>

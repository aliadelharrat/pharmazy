<script lang="ts">
	import { Progress as ProgressPrimitive } from 'bits-ui';
	import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';

	type Props = WithoutChildrenOrChild<ProgressPrimitive.RootProps> & {
		bg?: string;
		bgSecondary?: string;
	};

	let {
		ref = $bindable(null),
		class: className,
		max = 100,
		value,
		bg = 'bg-primary',
		bgSecondary = 'bg-primary/20',
		...restProps
	}: Props = $props();
</script>

<ProgressPrimitive.Root
	bind:ref
	data-slot="progress"
	class={cn(`relative h-2 w-full overflow-hidden rounded-full ${bgSecondary}`, className)}
	{value}
	{max}
	{...restProps}
>
	<div
		data-slot="progress-indicator"
		class={`h-full w-full flex-1 ${bg} transition-all`}
		style="transform: translateX(-{100 - (100 * (value ?? 0)) / (max ?? 1)}%)"
	></div>
</ProgressPrimitive.Root>

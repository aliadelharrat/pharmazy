<script lang="ts">
	import * as Empty from '$lib/components/ui/empty/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Info } from '@lucide/svelte';

	const props = $props();
</script>

<Empty.Root>
	<Empty.Header>
		<Empty.Media variant="icon">
			<Info />
		</Empty.Media>
		<Empty.Title>{props.title}</Empty.Title>
		<Empty.Description>
			{props.description}
		</Empty.Description>
	</Empty.Header>
	<Empty.Content>
		<div class="flex gap-2">
			<Button href={props.action.href} variant="outline">{props.action.label}</Button>
		</div>
	</Empty.Content>
</Empty.Root>

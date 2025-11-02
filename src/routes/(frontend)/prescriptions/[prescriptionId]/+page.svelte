<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as InputOTP from '$lib/components/ui/input-otp';
	import { Check, Copy, Trash2 } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import { paths } from '$lib/paths';
	const { data }: PageProps = $props();
	const prescription = data.prescription;

	let userInputs = $state(prescription.drugs.map(() => ''));
	let errorIndexes = $state<(boolean | null)[]>(prescription.drugs.map(() => null));
	let numTriesLeft = $state(3);
	let disabled = $derived(numTriesLeft <= 0);
	let success = $derived.by(() => errorIndexes.every((v) => v === true));
	let toggleCopiedIndex: null | number = $state(null);

	function checkAnswer() {
		numTriesLeft -= 1;

		const choices: string[] = JSON.parse(JSON.stringify([...userInputs]).toUpperCase());

		for (let i = 0; i < choices.length; i++) {
			const choice = choices[i];
			const drug = prescription.drugs[i];
			if (choice === drug) {
				errorIndexes[i] = true;
			} else {
				errorIndexes[i] = false;
			}
		}
	}

	function resetAnswer() {
		userInputs = prescription.drugs.map(() => '');
		errorIndexes = prescription.drugs.map(() => null);
	}

	function resetNumTriesLeft() {
		numTriesLeft = 3;
		resetAnswer();
	}

	function showSolution() {
		disabled = false;
		resetAnswer();
		userInputs = [...prescription.drugs];
		success = true;
	}
</script>

<section class="container mx-auto my-10 flex flex-col gap-10">
	<h1 class="text-2xl font-bold">Solve this prescription</h1>

	<div class="grid grid-cols-2 gap-10">
		<article class="overflow-hidden rounded-2xl">
			<img src={prescription.imageUrl} alt="prescription" />
		</article>

		<article class="space-y-8">
			<h2 class="text-2xl">Enter the drugs name you see on the prescription:</h2>
			<ul class="space-y-4">
				{#each prescription.drugs as drug, index (index)}
					<div class="group flex items-center gap-3">
						<span class={`text-2xl font-bold ${disabled ? 'opacity-35' : ''}`}>{index + 1}.</span>
						<InputOTP.Root {disabled} bind:value={userInputs[index]} maxlength={drug.length}>
							{#snippet children({ cells })}
								<InputOTP.Group>
									{#each cells as cell, i}
										<InputOTP.Slot
											class={`text-xl font-bold uppercase ${errorIndexes[index] === true ? '!bg-green-500/20' : ''} ${errorIndexes[index] === false ? '!bg-red-500/20' : ''}`}
											{cell}
											autofocus={true}
										/>
									{/each}
								</InputOTP.Group>
							{/snippet}
						</InputOTP.Root>

						{#if success}
							{@const drug = prescription.drugs[index].toLowerCase()}
							<div class="hidden group-hover:inline-block">
								<Button
									onclick={() => {
										navigator.clipboard.writeText(drug);
										toggleCopiedIndex = index;
										setTimeout(() => {
											toggleCopiedIndex = null;
										}, 2000);
									}}
									size="icon"
									variant="ghost"
								>
									{#if toggleCopiedIndex === index}
										<Check />
									{:else}
										<Copy />
									{/if}
								</Button>
							</div>
						{/if}
					</div>
				{/each}
			</ul>

			<div class="space-x-5">
				{#if success}
					{#if data.nextPrescriptionId}
						<a
							data-sveltekit-reload
							class={buttonVariants({ variant: 'outline' })}
							href={paths.prescriptions.show(data.nextPrescriptionId)}
						>
							Go to next prescription
						</a>
					{:else}
						<div class="space-y-5">
							<p>You've reached the end :D</p>
							<Button href={paths.dashboard}>Go Home</Button>
						</div>
					{/if}
				{:else if numTriesLeft <= 0}
					<Button onclick={showSolution} size="lg">Show solution</Button>
					<Button size="lg" variant="ghost" onclick={resetNumTriesLeft}>
						No, Let me try again
					</Button>
				{:else}
					<Button size="lg" onclick={checkAnswer}>Check your answer</Button>
					<Button size="lg" variant="ghost" onclick={resetAnswer}>Reset</Button>
				{/if}
			</div>
		</article>
	</div>
</section>

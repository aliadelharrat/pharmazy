<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import {
		FieldGroup,
		Field,
		FieldLabel,
		FieldDescription
	} from '$lib/components/ui/field/index.js';
	import Logo from '../logo.svelte';
	import { paths } from '$lib/paths';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	const id = $props.id();
</script>

<div class="mb-5 flex items-center justify-center">
	<Logo />
</div>
<Card.Root class="mx-auto w-full max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
		<Card.Description>Enter your email below to login to your account</Card.Description>
	</Card.Header>
	<Card.Content>
		<form
			method="POST"
			use:enhance={() => {
				return ({ result }) => {
					if (result.type === 'redirect') {
						window.location.href = result.location;
						return;
					}

					// Check for types that have a 'data' property
					if (result.type === 'success' || result.type === 'failure') {
						toast.error((result.data as { message?: string })?.message ?? 'Something went wrong!');
					} else if (result.type === 'error') {
						toast.error('Something went wrong!');
					}
				};
			}}
		>
			<FieldGroup>
				<Field>
					<FieldLabel for="email-{id}">Email</FieldLabel>
					<Input name="email" id="email-{id}" type="email" placeholder="m@example.com" required />
				</Field>
				<Field>
					<div class="flex items-center">
						<FieldLabel for="password-{id}">Password</FieldLabel>
						<!-- <a href="##" class="ml-auto inline-block text-sm underline"> Forgot your password? </a> -->
					</div>
					<Input name="password" id="password-{id}" type="password" required />
				</Field>
				<Field>
					<Button type="submit" class="w-full">Login</Button>
					<FieldDescription class="text-center">
						Don't have an account? <a href={paths.auth.register}>Register</a>
					</FieldDescription>
				</Field>
			</FieldGroup>
		</form>
	</Card.Content>
</Card.Root>

<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Field from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { paths } from '$lib/paths';
	import type { ComponentProps } from 'svelte';
	import { toast } from 'svelte-sonner';
	import Logo from '../logo.svelte';
	let { ...restProps }: ComponentProps<typeof Card.Root> = $props();
</script>

<div class="mb-5 flex items-center justify-center">
	<Logo />
</div>
<Card.Root {...restProps}>
	<Card.Header>
		<Card.Title class="text-left text-2xl font-bold tracking-tighter">Create an account</Card.Title>
		<Card.Description class="text-left"
			>Enter your information below to create your account</Card.Description
		>
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
			<Field.Group>
				<Field.Field>
					<Field.Label for="name">Full Name</Field.Label>
					<Input name="name" id="name" type="text" placeholder="John Doe" required />
				</Field.Field>
				<Field.Field>
					<Field.Label for="email">Email</Field.Label>
					<Input name="email" id="email" type="email" placeholder="m@example.com" required />
					<!-- <Field.Description>
						We'll use this to contact you. We will not share your email with anyone else.
					</Field.Description> -->
				</Field.Field>
				<Field.Field>
					<Field.Label for="password">Password</Field.Label>
					<Input name="password" id="password" type="password" required />
					<!-- <Field.Description>Must be at least 8 characters long.</Field.Description> -->
				</Field.Field>
				<!-- <Field.Field>
					<Field.Label for="confirm-password">Confirm Password</Field.Label>
					<Input id="confirm-password" type="password" required />
				<Field.Description>Please confirm your password.</Field.Description>
				</Field.Field> -->
				<Field.Group>
					<Field.Field>
						<Button type="submit">Create Account</Button>
						<Field.Description class="px-6 text-center">
							Already have an account? <a href={paths.auth.login}>Login</a>
						</Field.Description>
					</Field.Field>
				</Field.Group>
			</Field.Group>
		</form>
	</Card.Content>
</Card.Root>

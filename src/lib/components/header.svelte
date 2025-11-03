<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { paths } from '$lib/paths';
	import { User } from '@lucide/svelte';
	import Logo from './logo.svelte';
	import { Button } from './ui/button';

	const session = authClient.useSession();
</script>

<header class="container mx-auto flex items-center gap-10 py-5">
	<div>
		<Logo />
	</div>

	<nav class="flex items-center justify-start">
		<ul class="flex items-center gap-6">
			<li>
				<a class="text-muted-foreground hover:text-foreground" href={paths.categories.dashboard}>
					Categories
				</a>
			</li>

			<li><a class="text-muted-foreground hover:text-foreground" href="/">Contributres</a></li>

			<li>
				<a class="text-muted-foreground hover:text-foreground" href="/">Contact us</a>
			</li>
		</ul>
	</nav>

	<nav class="ml-auto">
		<ul class="flex items-center gap-3">
			{#if $session.data}
				<li class="flex shrink-0 items-center gap-0.5 text-sm text-muted-foreground">
					<User class="size-5" />
					{$session.data?.user.name}
				</li>
				{#if ($session.data?.user as any)?.role === 'admin' || ($session.data?.user as any)?.role === 'super_admin'}
					<li>
						<Button href={paths.admin.dashboard} variant="ghost">Admin</Button>
					</li>
				{/if}
				<li>
					<Button
						onclick={async () => {
							await authClient.signOut({
								fetchOptions: {
									onSuccess: () => {
										window.location.href = paths.auth.login;
									}
								}
							});
						}}
						variant="outline">Log out</Button
					>
				</li>
			{:else}
				<li>
					<Button variant="ghost" href="/register">Register</Button>
				</li>
				<li>
					<Button variant="outline" href="/login">Login</Button>
				</li>
			{/if}
		</ul>
	</nav>
</header>

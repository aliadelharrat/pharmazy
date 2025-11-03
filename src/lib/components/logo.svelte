<script lang="ts">
	import { PUBLIC_SITE_TITLE } from '$env/static/public';
	import logo from '$lib/assets/logo.png';
</script>

<a class="flex items-center gap-3 hover:text-primary" href="/">
	<img src={logo} alt={`${PUBLIC_SITE_TITLE}'s logo`} class="w-10" />
	<span class="text-2xl font-bold tracking-tighter">Pharmazy</span>
</a>

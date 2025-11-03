import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import { auth } from '$lib/server/auth';
import { paths } from '$lib/paths';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	// Skip auth during build
	if (building) return resolve(event);

	// Get session from Better Auth
	const session = await auth.api.getSession({
		headers: event.request.headers
	});

	// Make session/user available in locals
	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}

	const pathname = event.url.pathname;

	// --- Define which routes are public ---
	const publicPaths = [paths.auth.login, paths.auth.register];

	// --- Redirect logged-in users away from auth pages ---
	if (publicPaths.includes(pathname) && session?.user) {
		throw redirect(302, paths.dashboard);
	}

	// --- Restrict /admin pages to admin or super_admin ---
	if (
		pathname.startsWith(paths.admin.dashboard) &&
		(!session?.user || !['admin', 'super_admin'].includes(session.user.role))
	) {
		throw redirect(302, paths.auth.login);
	}

	// --- Lock down all other pages (must be logged in) ---
	const isPublic = publicPaths.some((p) => pathname.startsWith(p));
	if (!isPublic && !session?.user) {
		throw redirect(302, paths.auth.login);
	}

	// Continue normally
	return svelteKitHandler({ event, resolve, auth, building });
}

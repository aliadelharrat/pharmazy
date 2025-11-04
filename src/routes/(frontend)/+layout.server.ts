import { paths } from '$lib/paths';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	// lock against client side navigation
	const user = locals?.user;
	const pathname = url?.pathname as string;
	if ((pathname === paths.auth.login || pathname === paths.auth.register) && user) {
		return redirect(302, paths.dashboard);
	} else if (
		(pathname === paths.home ||
			pathname === paths.dashboard ||
			pathname.startsWith(paths.categories.dashboard) ||
			pathname.startsWith(paths.prescriptions.dashboard)) &&
		!user
	) {
		return redirect(302, paths.auth.login);
	}

	return {
		loggedInUser: user
	};
};

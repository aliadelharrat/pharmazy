import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { paths } from '$lib/paths';
import { auth } from '$lib/server/auth';

export const actions = {
	default: async (event) => {
		const form = await event.request.formData();
		const email = form.get('email')?.toString() || '';
		const password = form.get('password')?.toString() || '';

		// TODO: add zod validation
		const response = await auth.api.signInEmail({
			body: {
				email,
				password
			},
			asResponse: true
		});

		if (response.status === 401) {
			return fail(401, {
				message: 'Invalid email or password'
			});
		}

		if (response.status === 200) {
			return redirect(300, paths.dashboard);
		}

		return fail(500, { message: 'Something went wrong!' });
	}
} satisfies Actions;

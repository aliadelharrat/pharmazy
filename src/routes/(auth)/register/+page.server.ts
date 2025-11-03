import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { paths } from '$lib/paths';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { user } from '$lib/server/db/schema';
import { auth } from '$lib/server/auth';

export const actions = {
	default: async (event) => {
		const form = await event.request.formData();
		const name = form.get('name')?.toString() || '';
		const email = form.get('email')?.toString() || '';
		const password = form.get('password')?.toString() || '';

		// TODO: Zod validation
		// Trim inputs ..etc

		// Check if email alrady exists
		const checkEmail = await db.query.user.findFirst({
			where: eq(user.email, email)
		});

		if (checkEmail) {
			return fail(400, { message: 'Email already exists, Try a different one!' });
		}

		const response = await auth.api.signUpEmail({
			body: {
				name,
				email,
				password
			},
			asResponse: true
		});

		if (response.status === 200) {
			return redirect(300, paths.dashboard);
		}

		return fail(500, { message: "We couldn't register your account, Try again later!" });
	}
} satisfies Actions;

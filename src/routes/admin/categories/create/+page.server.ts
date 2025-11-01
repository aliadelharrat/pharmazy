import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db } from '$lib/server/db/index.js';
import { categories } from '$lib/server/db/schema';

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const name = form.get('name')?.toString() || '';
		const slug = form.get('slug')?.toString() || '';

		if (name?.length < 3 || slug?.length < 3) {
			return fail(400, { message: 'Name and slug must be at least 3 characters long.' });
		}

		const response = await db.insert(categories).values({
			name,
			slug
		});

		if (response.rowCount !== 1) {
			return fail(500, { message: 'Failed to create category.' });
		}

		return {
			message: 'Category created successfully.',
			clearForm: true
		};
	}
} satisfies Actions;

import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';

import { categories } from '$lib/server/db/schema';
import { error, fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const categoryId = params.categoryId;

	const data = await db.query.categories.findFirst({
		where: eq(categories.id, categoryId)
	});

	if (!data) {
		return error(404, 'Category not found');
	}

	return {
		category: data
	};
};

export const actions = {
	default: async ({ request, params }) => {
		const form = await request.formData();
		const name = form.get('name')?.toString() || '';
		const slug = form.get('slug')?.toString() || '';
		const categoryId = params.categoryId!;

		if (name?.length < 3 || slug?.length < 3) {
			return fail(400, { message: 'Name and slug must be at least 3 characters long.' });
		}

		const response = await db
			.update(categories)
			.set({
				name,
				slug
			})
			.where(eq(categories.id, categoryId));

		if (response.rowCount !== 1) {
			return fail(500, { message: 'Failed to update category.' });
		}

		return {
			message: 'Category updated successfully.'
		};
	}
} satisfies Actions;

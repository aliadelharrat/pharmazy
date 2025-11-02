import { db } from '$lib/server/db';
import { and, eq, ne } from 'drizzle-orm';

import { categories } from '$lib/server/db/schema';
import { error, fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { slugifyText } from '$lib/utils/slugify-slug';
import { getColor } from '$lib/utils/tailwind-colors';

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
		const categoryId = params.categoryId!;

		const form = await request.formData();
		const name = form.get('name')?.toString() || '';
		const slug = slugifyText(form.get('slug')?.toString() || '');
		const desc = form.get('desc')?.toString() || '';
		const color = getColor(form.get('color_name')?.toString() || '');

		console.log({
			name,
			slug,
			desc,
			color
		});

		if (name?.length < 3 || slug?.length < 3) {
			return fail(400, { message: 'Name and slug must be at least 3 characters long.' });
		}

		const existing = await db.query.categories.findFirst({
			where: eq(categories.id, categoryId)
		});

		if (!existing) {
			return error(404, 'Category not found');
		}

		if (existing.slug !== slug) {
			const duplicate = await db.query.categories.findFirst({
				where: and(eq(categories.slug, slug), ne(categories.id, categoryId))
			});

			if (duplicate) {
				return fail(400, { message: 'Slug must be unique. This one is taken.' });
			}
		}

		const response = await db
			.update(categories)
			.set({
				name,
				slug,
				desc,
				bg_color: color.bg,
				bg_secondary_color: color.secondary,
				border_color: color.border
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

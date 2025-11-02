import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db } from '$lib/server/db/index.js';
import { categories } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { slugifyText } from '$lib/utils/slugify-slug';
import { getColor } from '$lib/utils/tailwind-colors';

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const name = form.get('name')?.toString() || '';
		const slug = slugifyText(form.get('slug')?.toString() || '');
		const desc = form.get('desc')?.toString() || '';
		const color = getColor(form.get('color_name')?.toString() || '');

		if (name?.length < 3 || slug?.length < 3 || desc?.length < 3) {
			return fail(400, { message: 'Name, slug & description must be at least 3 characters long.' });
		}

		// check if slug is unique or not
		const checkSlugUniqueness = await db.query.categories.findFirst({
			where: eq(categories.slug, slug)
		});

		if (checkSlugUniqueness) {
			return fail(400, { message: 'Slug must be unique. This one is taken.' });
		}

		const response = await db.insert(categories).values({
			name,
			slug,
			desc,
			bg_color: color?.bg,
			bg_secondary_color: color?.secondary,
			border_color: color?.border
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

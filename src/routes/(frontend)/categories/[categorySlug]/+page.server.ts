import { db } from '$lib/server/db';
import { executeWithRetry } from '$lib/server/db-helper';
import { asc, eq } from 'drizzle-orm';
import { categories, prescriptions } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const categorySlug = params.categorySlug;

	const category = await executeWithRetry(() =>
		db.query.categories.findFirst({
			where: eq(categories.slug, categorySlug),
			with: {
				prescriptions: {
					orderBy: asc(prescriptions.created_at)
				}
			}
		})
	);

	if (!category) {
		return error(404, `Category "${categorySlug}" not found`);
	}

	return {
		category
	};
};

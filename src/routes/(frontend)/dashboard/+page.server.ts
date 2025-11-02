import { db } from '$lib/server/db';
import { executeWithRetry } from '$lib/server/db-helper';
import { asc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { prescriptions } from '$lib/server/db/schema';

export const load: PageServerLoad = async () => {
	const data = await executeWithRetry(() =>
		db.query.categories.findMany({
			with: {
				prescriptions: true
			},
			orderBy: asc(prescriptions.created_at)
		})
	);

	const categoriesData = data.filter((category) => category.prescriptions.length > 0);

	return {
		categories: categoriesData
	};
};

import { db } from '$lib/server/db';
import { categories } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { fail, type Actions } from '@sveltejs/kit';
import { executeWithRetry } from '$lib/server/db-helper';

export const load: PageServerLoad = async () => {
	const data = await executeWithRetry(() =>
		db.query.categories.findMany({
			orderBy: desc(categories.created_at),
			with: {
				prescriptions: {
					columns: {
						id: true
					}
				}
			}
		})
	);

	return {
		categories: data
	};
};

export const actions = {
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const response = await db.delete(categories).where(eq(categories.id, id));
		if (response.rowCount !== 1) {
			return fail(400, { message: 'Failed to delete category' });
		}
		return { success: true };
	}
} satisfies Actions;

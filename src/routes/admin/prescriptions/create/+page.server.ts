import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db/index.js';
import { categories, prescriptions } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const data = await db.select().from(categories).orderBy(desc(categories.created_at));
	return {
		categories: data ?? []
	};
};

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();

		const imageUrl = form.get('imageUrl')?.toString() || '';
		const drugs = form.get('drugs')?.toString() || '';
		const drugsArray = JSON.parse(drugs) as string[];
		const categoryId = form.get('category')?.toString() || '';

		if (imageUrl?.length < 3 || drugs?.length < 1 || categoryId?.length < 3) {
			return fail(400, { message: 'All fields are required' });
		}

		const response = await db.insert(prescriptions).values({
			imageUrl,
			drugs: drugsArray,
			categoryId,
			authorId: 'not-implemented-yet',
			views: 0
		});

		if (response.rowCount !== 1) {
			return fail(500, { message: 'Failed to create prescription.' });
		}

		return {
			message: 'Prescription created successfully.',
			clearForm: true
		};
	}
} satisfies Actions;

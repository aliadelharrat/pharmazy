import { db } from '$lib/server/db';
import { desc, eq } from 'drizzle-orm';

import { categories, prescriptions } from '$lib/server/db/schema';
import { error, fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const prescriptionId = params.prescriptionId;

	const prescriptionData = await db.query.prescriptions.findFirst({
		where: eq(prescriptions.id, prescriptionId),
		with: {
			category: true
		}
	});

	const categoriesData = await db.query.categories.findMany({
		orderBy: desc(categories.created_at)
	});

	if (!prescriptionData) {
		return error(404, 'Prescription not found');
	}

	return {
		prescription: prescriptionData,
		categories: categoriesData
	};
};

export const actions = {
	default: async ({ request, params }) => {
		const prescriptionId = params.prescriptionId!;

		const form = await request.formData();
		const imageUrl = form.get('imageUrl')?.toString() || '';
		const drugs = form.get('drugs')?.toString() || '';
		const drugsArray = JSON.parse(drugs) as string[];
		const categoryId = form.get('category')?.toString() || '';

		if (imageUrl?.length < 3 || drugs?.length < 1 || categoryId?.length < 3) {
			return fail(400, { message: 'All fields are required' });
		}

		const response = await db
			.update(prescriptions)
			.set({
				categoryId,
				drugs: drugsArray,
				imageUrl: imageUrl
			})
			.where(eq(prescriptions.id, prescriptionId));

		if (response.rowCount !== 1) {
			return fail(500, { message: 'Failed to update prescription.' });
		}

		return {
			message: 'Prescription updated successfully.'
		};
	}
} satisfies Actions;

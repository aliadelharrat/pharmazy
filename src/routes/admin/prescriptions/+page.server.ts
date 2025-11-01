import { db } from '$lib/server/db';
import { prescriptions } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { fail, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const data = await db.query.prescriptions.findMany({
		with: {
			category: true
		},
		orderBy: [desc(prescriptions.created_at)]
	});
	return {
		prescriptions: data
	};
};

export const actions = {
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const response = await db.delete(prescriptions).where(eq(prescriptions.id, id));
		if (response.rowCount !== 1) {
			return fail(400, { message: 'Failed to delete prescription' });
		}
		return { success: true };
	}
} satisfies Actions;

import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { prescriptions } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const prescriptionId = params.prescriptionId;

	const data = await db.query.prescriptions.findFirst({
		where: eq(prescriptions.id, prescriptionId),
		with: {
			category: true
		}
	});

	if (!data) {
		return error(404, 'Prescription not found');
	}

	return {
		prescription: data
	};
};

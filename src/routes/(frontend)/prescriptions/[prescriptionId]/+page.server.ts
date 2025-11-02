import { db } from '$lib/server/db';
import { executeWithRetry } from '$lib/server/db-helper';
import { eq, gt, and, asc, ne } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { prescriptions } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const prescriptionId = params.prescriptionId;
	const prescription = await executeWithRetry(() =>
		db.query.prescriptions.findFirst({
			where: eq(prescriptions.id, prescriptionId)
		})
	);
	if (!prescription) {
		return error(404, 'Prescription not found');
	}

	const nextPrescription = await executeWithRetry(() =>
		db.query.prescriptions.findFirst({
			where: and(
				eq(prescriptions.categoryId, prescription.categoryId),
				gt(prescriptions.created_at, prescription.created_at),
				ne(prescriptions.id, prescription.id)
			),
			orderBy: asc(prescriptions.created_at)
		})
	);

	let nextPrescriptionId = undefined;
	if (nextPrescription) {
		nextPrescriptionId = nextPrescription.id;
	}

	return {
		prescription,
		nextPrescriptionId
	};
};

// src/lib/server/db-retry.ts
import { error } from '@sveltejs/kit';

interface NeonError extends Error {
	code?: string;
}

export async function executeWithRetry<T>(
	queryFn: () => Promise<T>,
	maxRetries = 3,
	delayMs = 1000
): Promise<T> {
	let lastError: unknown;

	for (let attempt = 1; attempt <= maxRetries; attempt++) {
		try {
			return await queryFn();
		} catch (err) {
			lastError = err;
			const dbError = err as NeonError;

			console.error(`Database query attempt ${attempt} failed:`, err);

			// Don't retry for constraint violations or logical errors
			if (dbError.code?.startsWith('23')) {
				throw err;
			}

			// Only retry for connection/timeout errors
			const shouldRetry =
				dbError.message?.includes('connect') ||
				dbError.message?.includes('timeout') ||
				dbError.message?.includes('ECONNREFUSED');

			if (!shouldRetry || attempt >= maxRetries) {
				break;
			}

			// Exponential backoff
			await new Promise((resolve) => setTimeout(resolve, delayMs * attempt));
		}
	}

	console.error('All retry attempts failed:', lastError);
	throw error(503, 'Database temporarily unavailable. Please try again later.');
}

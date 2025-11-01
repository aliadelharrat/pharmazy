export const paths = {
	home: '/',
	dashboard: '/dashboard',
	prescription: (/** @type {string} */ id) => {
		return `/prescription/${id}`;
	},
	category: (/** @type {string} */ slug) => {
		return `/category/${slug}`;
	},
	// Admin routes
	admin: {
		dashboard: '/admin',
		categories: {
			dashboard: '/admin/categories',
			create: '/admin/categories/create',
			show: (/** @type {string} */ id) => {
				return `/admin/categories/${id}`;
			},
			edit: (/** @type {string} */ id) => {
				return `/admin/categories/${id}/edit`;
			}
		},
		prescriptions: {
			dashboard: '/admin/prescriptions',
			create: '/admin/prescriptions/create',
			show: (/** @type {string} */ id) => {
				return `/admin/prescriptions/${id}`;
			},
			edit: (/** @type {string} */ id) => {
				return `/admin/prescriptions/${id}/edit`;
			}
		}
	}
};

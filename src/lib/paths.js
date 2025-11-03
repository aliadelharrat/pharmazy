export const paths = {
	home: '/',
	dashboard: '/dashboard',
	prescriptions: {
		show: (/** @type {string} */ id) => {
			return `/prescriptions/${id}`;
		}
	},
	categories: {
		dashboard: '/dashboard',
		show: (/** @type {string} */ slug) => {
			return `/categories/${slug}`;
		}
	},
	// Auth routes
	auth: {
		register: '/register',
		login: '/login'
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

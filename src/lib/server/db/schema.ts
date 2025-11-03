import { relations } from 'drizzle-orm';
import { integer, boolean, pgTable, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	slug: text('slug').unique().notNull(),
	desc: text('desc').notNull(),
	bg_color: text('bg_color').notNull().default('bg-primary'),
	bg_secondary_color: text('bg_secondary_color').notNull().default('bg-primary/20'),
	border_color: text('border_color').notNull().default('border-primary'),
	created_at: timestamp().defaultNow().notNull()
});

export const categoriesRelations = relations(categories, ({ many }) => ({
	prescriptions: many(prescriptions)
}));

export const prescriptions = pgTable('prescriptions', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	authorId: text('user_id'),
	categoryId: text('categoryId')
		.references(() => categories.id, { onDelete: 'cascade' })
		.notNull(),
	imageUrl: text('image_url').notNull(),
	views: integer('views').default(0).notNull(),
	drugs: text('drugs').array().notNull(),
	created_at: timestamp().defaultNow().notNull()
});

export const prescriptionsRelations = relations(prescriptions, ({ one }) => ({
	category: one(categories, {
		fields: [prescriptions.categoryId],
		references: [categories.id]
	})
}));

export const roleEnum = pgEnum('role', ['user', 'moderator', 'admin', 'super_admin']);

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	role: roleEnum().default('user').notNull(),
	emailVerified: boolean('email_verified').default(false).notNull(),
	image: text('image'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	expiresAt: timestamp('expires_at').notNull(),
	token: text('token').notNull().unique(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' })
});

export const account = pgTable('account', {
	id: text('id').primaryKey(),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	accessTokenExpiresAt: timestamp('access_token_expires_at'),
	refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
	scope: text('scope'),
	password: text('password'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull()
});

export const verification = pgTable('verification', {
	id: text('id').primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull()
});

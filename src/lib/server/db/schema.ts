import { relations } from 'drizzle-orm';
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

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

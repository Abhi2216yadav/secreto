import { mysqlTable, serial, varchar, text, timestamp, index } from 'drizzle-orm/mysql-core'

export const contactEnquiries = mysqlTable('contact_enquiries', {
  id: serial('id').primaryKey(),
  reference: varchar('reference', { length: 24 }).notNull().unique(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 320 }).notNull(),
  phone: varchar('phone', { length: 24 }),
  topic: varchar('topic', { length: 80 }).notNull(),
  message: text('message').notNull(),
  status: varchar('status', { length: 24 }).notNull().default('new'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  emailIdx: index('contact_email_idx').on(table.email),
  createdAtIdx: index('contact_created_at_idx').on(table.createdAt),
}))

export type ContactEnquiry = typeof contactEnquiries.$inferSelect

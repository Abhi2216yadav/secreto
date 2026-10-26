import { contactEnquiries } from '@db/schema'
import { getDb } from './connection'

export async function createContactEnquiry(data: {
  reference: string
  name: string
  email: string
  phone?: string
  topic: string
  message: string
}) {
  const [{ id }] = await getDb().insert(contactEnquiries).values(data).$returningId()
  return getDb().query.contactEnquiries.findFirst({ where: (table, { eq }) => eq(table.id, id) })
}

import { randomBytes } from 'node:crypto'
import { z } from 'zod'
import { createRouter, publicQuery } from './middleware'
import { createContactEnquiry } from './queries/contact'

export const contactRouter = createRouter({
  submit: publicQuery
    .input(z.object({
      name: z.string().trim().min(2).max(100),
      email: z.string().trim().email().max(320),
      phone: z.string().trim().max(24).optional(),
      topic: z.enum(['Product question', 'Order support', 'Care guidance', 'Feedback', 'Something else']),
      message: z.string().trim().min(10).max(2000),
      consent: z.literal(true),
      website: z.string().max(0).optional(),
    }))
    .mutation(async ({ input }) => {
      const reference = `SC-${new Date().getFullYear()}-${randomBytes(3).toString('hex').toUpperCase()}`
      await createContactEnquiry({
        reference,
        name: input.name,
        email: input.email,
        phone: input.phone || undefined,
        topic: input.topic,
        message: input.message,
      })
      return { ok: true as const, reference }
    }),
})

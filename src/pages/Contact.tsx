import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight, ArrowUpRight, Check, LoaderCircle, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { trpc } from '@/providers/trpc'

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please tell us your name.').max(100),
  email: z.string().trim().email('Please enter a valid email address.').max(320),
  phone: z.string().trim().max(24).optional(),
  topic: z.enum(['Product question', 'Order support', 'Care guidance', 'Feedback', 'Something else'], 'Please choose a topic.'),
  message: z.string().trim().min(10, 'Please share a little more so we can help.').max(2000),
  consent: z.literal(true, 'Please confirm that we may respond to your enquiry.'),
  website: z.string().max(0).optional(),
})

type ContactValues = z.infer<typeof contactSchema>

const contactMethods = [
  {
    icon: MessageCircle,
    title: 'Secreto Care — WhatsApp',
    subtitle: 'Private. Personal. Effortless.',
    action: 'Chat on WhatsApp',
    href: 'https://wa.me/917009777205',
  },
  {
    icon: Phone,
    title: 'Call Us',
    subtitle: 'For conversations that deserve a human touch.',
    action: '+91 70097 77205',
    href: 'tel:+917009777205',
  },
  {
    icon: Mail,
    title: 'Email',
    subtitle: 'For everything that needs intention.',
    action: 'secreto@secretocare.com',
    href: 'mailto:secreto@secretocare.com',
  },
]

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', phone: '', topic: undefined, message: '', consent: undefined, website: '' },
  })
  const enquiry = trpc.contact.submit.useMutation()

  const onSubmit = (values: ContactValues) => enquiry.mutate(values)
  const reference = enquiry.data?.reference

  return (
    <>
      <section className="dark-surface relative isolate overflow-hidden bg-[hsl(var(--olive))] text-[hsl(var(--white))]">
        <div className="grain" />
        <div className="page-shell relative grid min-h-[530px] gap-12 py-16 md:grid-cols-12 md:items-end md:py-20">
          <div className="reveal md:col-span-8">
            <p className="eyebrow mb-10 text-white/65">Contact Secreto</p>
            <h1 className="display-title text-[clamp(4.3rem,9.3vw,9rem)]">Let’s talk,<br /><em className="font-normal">quietly.</em></h1>
          </div>
          <div className="reveal reveal-delay md:col-span-4 md:pb-3">
            <p className="max-w-sm text-lg leading-8 text-white/80">Need help, have a question, or just want to ask something quietly? We’re here.</p>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">Whether it’s a question, a concern, or a quiet conversation about care—we’re here, thoughtfully.</p>
          </div>
        </div>
      </section>

      <section className="page-shell grid gap-16 py-16 md:grid-cols-12 md:gap-10 md:py-24">
        <div className="md:col-span-5 lg:col-span-4">
          <p className="eyebrow mb-8 text-[hsl(var(--olive))]">Choose what feels comfortable</p>
          <div className="border-t border-[hsl(var(--line))]">
            {contactMethods.map(({ icon: Icon, title, subtitle, action, href }) => (
              <a
                key={title}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                className="group block border-b border-[hsl(var(--line))] py-7"
              >
                <div className="flex items-start gap-4">
                  <Icon className="mt-1 shrink-0 text-[hsl(var(--olive))]" size={20} strokeWidth={1.5} />
                  <div className="min-w-0">
                    <h2 className="font-display text-2xl leading-tight text-[hsl(var(--olive))]">{title}</h2>
                    <p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{subtitle}</p>
                    <span className="mt-4 inline-flex min-h-11 items-center gap-2 break-all text-sm font-medium text-[hsl(var(--olive))] group-hover:underline">{action}<ArrowUpRight size={15} className="shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <p className="mt-6 text-xs leading-6 text-[hsl(var(--muted-foreground))]">Your details are used only to respond to your enquiry. Please avoid sharing sensitive medical information.</p>
        </div>

        <div className="md:col-span-7 md:col-start-7 lg:col-span-7 lg:col-start-6">
          <div className="border-t-2 border-[hsl(var(--olive))] pt-7 md:pt-9">
            <p className="eyebrow text-[hsl(var(--olive))]">Write to us</p>
            <h2 className="font-display mt-3 text-4xl text-[hsl(var(--olive))] md:text-5xl">How can we help?</h2>
          </div>

          {reference ? (
            <div className="mt-10 flex min-h-[420px] flex-col items-start justify-center border-y border-[hsl(var(--line))] py-12" role="status">
              <span className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--olive))] text-white"><Check size={22} /></span>
              <p className="eyebrow text-[hsl(var(--olive))]">Enquiry received</p>
              <h3 className="font-display mt-3 text-4xl text-[hsl(var(--olive))] md:text-5xl">Thank you for trusting us.</h3>
              <p className="mt-5 max-w-md text-[hsl(var(--muted-foreground))]">Your message has been saved. Our care team will respond using the contact details you provided.</p>
              <p className="mt-6 text-xs uppercase tracking-[.15em] text-[hsl(var(--olive))]">Reference: {reference}</p>
              <button type="button" className="arrow-link mt-8 text-[hsl(var(--olive))]" onClick={() => { enquiry.reset(); reset() }}>Send another message <ArrowRight size={16} /></button>
            </div>
          ) : (
            <form className="mt-9" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                <div>
                  <label className="field-label" htmlFor="name">Your name *</label>
                  <input className="field-input" id="name" autoComplete="name" placeholder="How should we address you?" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} {...register('name')} />
                  {errors.name && <p id="name-error" className="mt-2 text-xs text-red-800">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="field-label" htmlFor="email">Email address *</label>
                  <input className="field-input" id="email" type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} {...register('email')} />
                  {errors.email && <p id="email-error" className="mt-2 text-xs text-red-800">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="field-label" htmlFor="phone">Phone <span className="normal-case tracking-normal opacity-60">(optional)</span></label>
                  <input className="field-input" id="phone" type="tel" autoComplete="tel" placeholder="+91" aria-invalid={!!errors.phone} {...register('phone')} />
                </div>
                <div>
                  <label className="field-label" htmlFor="topic">What is this about? *</label>
                  <select className="field-input" id="topic" aria-invalid={!!errors.topic} aria-describedby={errors.topic ? 'topic-error' : undefined} {...register('topic')}>
                    <option value="">Select a topic</option>
                    <option value="Product question">Product question</option>
                    <option value="Order support">Order support</option>
                    <option value="Care guidance">Care guidance</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Something else">Something else</option>
                  </select>
                  {errors.topic && <p id="topic-error" className="mt-2 text-xs text-red-800">{errors.topic.message}</p>}
                </div>
              </div>
              <div className="mt-7">
                <label className="field-label" htmlFor="message">Your message *</label>
                <textarea className="field-input" id="message" placeholder="Share as much or as little as you feel comfortable with." aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} {...register('message')} />
                {errors.message && <p id="message-error" className="mt-2 text-xs text-red-800">{errors.message.message}</p>}
              </div>
              <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" tabIndex={-1} autoComplete="off" {...register('website')} /></div>
              <label className="mt-7 flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                <input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-[#303D11]" {...register('consent')} />
                <span>I’m happy for Secreto Care to contact me about this enquiry.</span>
              </label>
              {errors.consent && <p className="mt-1 text-xs text-red-800">{errors.consent.message}</p>}
              {enquiry.error && <div className="mt-6 border border-red-800/25 bg-red-900/5 p-4 text-sm text-red-900" role="alert">We couldn’t save your message just now. Please try again, or reach us by phone or email.</div>}
              <button type="submit" className="primary-button mt-8 w-full sm:w-auto" disabled={enquiry.isPending}>
                {enquiry.isPending ? <><LoaderCircle size={17} className="animate-spin" /> Sending privately…</> : <>Send enquiry <ArrowRight size={17} /></>}
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="border-t border-[hsl(var(--line))]">
        <div className="grid md:grid-cols-2">
          <div className="flex min-h-[360px] flex-col justify-center px-5 py-14 md:px-[max(40px,calc((100vw-1360px)/2))] md:py-20">
            <MapPin size={24} strokeWidth={1.4} className="mb-8 text-[hsl(var(--olive))]" />
            <p className="eyebrow text-[hsl(var(--olive))]">Where we care</p>
            <h2 className="display-title mt-4 text-5xl text-[hsl(var(--olive))] md:text-6xl">Across India.</h2>
            <p className="mt-5 max-w-sm text-[hsl(var(--muted-foreground))]">Wherever you are, a thoughtful conversation is only a message away.</p>
          </div>
          <a
            href="https://www.openstreetmap.org/#map=5/22.500/82.500"
            target="_blank"
            rel="noreferrer"
            className="group relative block min-h-[360px] overflow-hidden bg-[hsl(var(--forest))]"
            aria-label="Explore the map of India on OpenStreetMap (opens in a new tab)"
          >
            <img src="/india-care-map.svg" alt="Illustrated map of India showing Secreto Care’s nationwide support" className="h-full min-h-[360px] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
            <span className="absolute bottom-6 right-6 flex min-h-11 items-center gap-2 bg-[hsl(var(--paper))] px-4 text-xs font-semibold uppercase tracking-[.12em] text-[hsl(var(--olive))]">Explore map <ArrowUpRight size={15} /></span>
          </a>
        </div>
      </section>
    </>
  )
}

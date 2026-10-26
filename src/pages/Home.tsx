import { Link } from 'react-router'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export default function Home() {
  return (
    <>
      <section className="dark-surface relative isolate overflow-hidden bg-[hsl(var(--olive))] text-[hsl(var(--white))]">
        <div className="grain" />
        <img src="/secreto-mark.png" alt="" aria-hidden="true" className="pointer-events-none absolute -right-[14%] top-[8%] w-[74vw] max-w-[660px] opacity-[0.055] invert md:-right-[2%] md:top-[2%] md:w-[48vw]" />
        <div className="page-shell relative flex min-h-[calc(100svh-88px)] flex-col justify-between py-10 md:py-14">
          <div className="flex items-center justify-between border-t border-white/25 pt-4">
            <p className="eyebrow text-white/70">Personal care, considered</p>
            <p className="hidden text-[11px] uppercase tracking-[.18em] text-white/50 sm:block">Est. with intention</p>
          </div>
          <div className="reveal py-16 md:py-10">
            <h1 className="display-title max-w-[1100px] text-[clamp(4.4rem,11vw,10.5rem)]">
              Care, in<br /><em className="font-normal">confidence.</em>
            </h1>
            <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
              <p className="max-w-md text-base leading-7 text-white/75 md:col-start-2 md:justify-self-end md:text-lg md:leading-8">
                A more thoughtful approach to intimate care. Personal questions are welcome here—always met with privacy, warmth and intention.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5 border-b border-white/25 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <Link to="/contact" className="arrow-link text-[hsl(var(--white))]">Begin a conversation <ArrowUpRight size={18} /></Link>
            <p className="text-xs tracking-wide text-white/55">Private. Personal. Effortless.</p>
          </div>
        </div>
      </section>

      <section id="philosophy" className="scroll-mt-6 py-20 md:py-32">
        <div className="page-shell grid gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <p className="eyebrow text-[hsl(var(--olive))]">Our philosophy</p>
          </div>
          <div className="md:col-span-9">
            <h2 className="display-title max-w-[900px] text-[clamp(3.3rem,6.8vw,6.7rem)] text-[hsl(var(--olive))]">
              Intimacy starts<br />with <em className="font-normal">trust.</em>
            </h2>
            <div className="mt-12 grid gap-10 border-t border-[hsl(var(--line))] pt-8 sm:grid-cols-2 md:mt-16">
              <p className="max-w-md text-[hsl(var(--olive))]">We believe care should feel less clinical and more human. That means making room for questions, listening without judgment, and treating every conversation with discretion.</p>
              <p className="max-w-md text-[hsl(var(--olive))]">From your first thought to the moment you reach out, every detail is designed to feel calm, clear and quietly reassuring.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[hsl(var(--sage))]/45 py-20 md:py-28">
        <div className="page-shell grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="eyebrow mb-8 text-[hsl(var(--olive))]">Here when you need us</p>
            <h2 className="display-title text-[clamp(3.5rem,7vw,7rem)] text-[hsl(var(--olive))]">Ask anything.<br /><em className="font-normal">Quietly.</em></h2>
          </div>
          <div className="md:col-span-4 md:pb-3">
            <p className="mb-6 max-w-sm text-[hsl(var(--olive))]">A question, a concern, or a conversation about care—we’re here, thoughtfully.</p>
            <Link to="/contact" className="primary-button">Contact Secreto <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>
    </>
  )
}

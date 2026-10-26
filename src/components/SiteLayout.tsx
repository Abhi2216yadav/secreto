import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { ArrowUpRight, Menu, X } from 'lucide-react'

export function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
    if (location.hash) {
      window.requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView())
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!menuOpen) return
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [menuOpen])

  return (
    <div className="min-h-[100dvh] bg-[hsl(var(--paper))]">
      <header className="dark-surface relative z-30 bg-[hsl(var(--olive))] text-[hsl(var(--white))]">
        <div className="page-shell flex h-[88px] items-center justify-between gap-6">
          <Link to="/" aria-label="Secreto home" className="flex min-h-11 items-center">
            <img src="/secreto-wordmark.png" alt="Secreto" className="h-auto w-[156px] md:w-[184px]" />
          </Link>
          <nav className="hidden items-center gap-10 md:flex" aria-label="Main navigation">
            <NavLink to="/" className={({ isActive }) => `flex min-h-11 items-center text-[12px] uppercase tracking-[.16em] transition-opacity hover:opacity-70 ${isActive ? 'opacity-100' : 'opacity-70'}`}>Home</NavLink>
            <Link to="/#philosophy" className="flex min-h-11 items-center text-[12px] uppercase tracking-[.16em] opacity-70 transition-opacity hover:opacity-100">Our philosophy</Link>
            <NavLink to="/contact" className={({ isActive }) => `flex min-h-11 items-center gap-2 text-[12px] uppercase tracking-[.16em] transition-opacity hover:opacity-70 ${isActive ? 'opacity-100' : 'opacity-70'}`}>Contact <ArrowUpRight size={14} /></NavLink>
          </nav>
          <button
            type="button"
            className="flex min-h-11 min-w-11 items-center justify-end md:hidden"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={25} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="absolute left-0 right-0 top-full border-t border-white/20 bg-[hsl(var(--olive))] px-5 py-5 shadow-xl md:hidden" aria-label="Mobile navigation">
            <NavLink to="/" className="flex min-h-12 items-center border-b border-white/15 text-sm uppercase tracking-[.16em]">Home</NavLink>
            <Link to="/#philosophy" className="flex min-h-12 items-center border-b border-white/15 text-sm uppercase tracking-[.16em]">Our philosophy</Link>
            <NavLink to="/contact" className="flex min-h-12 items-center justify-between text-sm uppercase tracking-[.16em]">Contact <ArrowUpRight size={17} /></NavLink>
          </nav>
        )}
      </header>
      <main><Outlet /></main>
      <footer className="dark-surface bg-[hsl(var(--forest))] text-[hsl(var(--white))]">
        <div className="page-shell grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
          <div>
            <img src="/secreto-wordmark.png" alt="Secreto" className="w-[180px]" />
            <p className="font-display mt-5 text-3xl">Care, elevated.</p>
            <p className="mt-2 max-w-xs text-sm leading-7 text-white/70">Because intimacy starts with trust.</p>
          </div>
          <div>
            <p className="eyebrow mb-5 text-white/60">Explore</p>
            <div className="flex flex-col items-start gap-2 text-sm">
              <Link className="flex min-h-11 items-center hover:underline" to="/">Home</Link>
              <Link className="flex min-h-11 items-center hover:underline" to="/#philosophy">Our philosophy</Link>
              <Link className="flex min-h-11 items-center hover:underline" to="/contact">Contact Secreto</Link>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-5 text-white/60">A quiet conversation</p>
            <a href="mailto:secreto@secretocare.com" className="flex min-h-11 items-center text-sm hover:underline">secreto@secretocare.com</a>
            <a href="tel:+917009777205" className="flex min-h-11 items-center text-sm hover:underline">+91 70097 77205</a>
          </div>
        </div>
        <div className="page-shell flex flex-col gap-2 border-t border-white/15 py-6 text-[11px] uppercase tracking-[.12em] text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Secreto Care</p>
          <p>Private. Personal. Effortless.</p>
        </div>
      </footer>
    </div>
  )
}

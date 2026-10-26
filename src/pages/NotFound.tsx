import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'

export default function NotFound() {
  return (
    <section className="page-shell flex min-h-[65vh] flex-col items-start justify-center py-20">
      <p className="eyebrow text-[hsl(var(--olive))]">404 — Page not found</p>
      <h1 className="display-title mt-6 text-6xl text-[hsl(var(--olive))] md:text-8xl">A quiet wrong turn.</h1>
      <p className="mt-6 max-w-md text-[hsl(var(--muted-foreground))]">The page you’re looking for isn’t here. Let’s take you back to a familiar place.</p>
      <Link to="/" className="primary-button mt-8"><ArrowLeft size={17} /> Return home</Link>
    </section>
  )
}

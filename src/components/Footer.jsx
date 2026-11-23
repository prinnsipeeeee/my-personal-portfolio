import { ArrowUp } from 'lucide-react'
import { profileData } from '../data/profile'

const START_YEAR = 2026
const BUILT_WITH = ['React', 'Tailwind', 'Motion']

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const yearLabel =
    currentYear > START_YEAR ? `${START_YEAR}–${currentYear}` : String(currentYear)

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const firstLetters = profileData.firstName.toUpperCase().split('')
  const lastLetters = profileData.lastName.toUpperCase().split('')

  return (
    <footer
      role="contentinfo"
      className="border-t border-line bg-canvas text-ink overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 pt-10 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-muted">
          <p data-testid="footer-copyright">
            © {yearLabel} {profileData.name}
          </p>

          <p data-testid="footer-stack">
            Built with {BUILT_WITH.join(' · ')}
          </p>

          <button
            type="button"
            onClick={handleBackToTop}
            data-testid="footer-back-to-top"
            className="group inline-flex items-center gap-1.5 self-start sm:self-auto min-h-[32px] text-muted hover:text-ink transition-colors duration-150"
          >
            <ArrowUp
              className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-150"
              aria-hidden="true"
            />
            <span>Back to top</span>
          </button>
        </div>
      </div>

      {/* Giant Decorative Outline Name (cropped subtly at bottom) */}
      <div
        aria-hidden="true"
        data-testid="footer-giant-name"
        className="max-w-6xl mx-auto px-4 sm:px-8 pt-2 -mb-3 sm:-mb-5 md:-mb-7 select-none overflow-hidden footer-giant-fade"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 font-display font-bold uppercase tracking-tighter leading-[0.88] text-[clamp(2.8rem,10.5vw,8.75rem)]">
          <span className="inline-flex">
            {firstLetters.map((char, i) => (
              <span key={`f-${i}`} className="footer-outline-letter inline-block">
                {char}
              </span>
            ))}
          </span>
          <span className="inline-flex">
            {lastLetters.map((char, i) => (
              <span key={`l-${i}`} className="footer-outline-letter inline-block">
                {char}
              </span>
            ))}
          </span>
        </div>
      </div>
    </footer>
  )
}

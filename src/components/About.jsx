import portraitImg from '../../assets/formal-pic.jpg'
import { profileData } from '../data/profile'
import Section from './Section'
import Reveal from './Reveal'

export default function About() {
  const { about } = profileData
  const paragraphs = (about?.paragraphs || []).filter(Boolean)
  const facts = (about?.quickFacts || []).filter((item) => item.label && item.value)

  return (
    <Section
      id="about"
      label="02 — about"
      heading={about?.heading || 'About'}
      headingAccent={about?.headingAccent}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
        {/* Left: Front-End Narrative + Quick Facts */}
        <div className="lg:col-span-7 space-y-10">
          {paragraphs.length > 0 && (
            <div className="space-y-5 text-sm sm:text-base text-muted leading-relaxed">
              {paragraphs.map((text, idx) => (
                <Reveal key={idx} delay={idx * 0.05} as="p">
                  {text}
                </Reveal>
              ))}
            </div>
          )}

          {facts.length > 0 && (
            <Reveal delay={0.12}>
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-subtle mb-3">
                Quick facts
              </h3>
              <dl className="border-t border-line divide-y divide-line">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="py-3 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 text-sm"
                  >
                    <dt className="sm:col-span-4 font-mono text-xs text-subtle">
                      {fact.label}
                    </dt>
                    <dd className="sm:col-span-8 text-ink font-sans">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>

        {/* Right: Framed Monochrome Portrait */}
        <Reveal delay={0.08} className="lg:col-span-5">
          <figure className="max-w-xs sm:max-w-sm lg:max-w-none mx-auto lg:mx-0">
            <div className="relative border border-line p-2 bg-canvas">
              <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                <img
                  src={portraitImg}
                  alt={about?.portraitAlt || `${profileData.name} portrait`}
                  width={640}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top grayscale contrast-[1.06] hover:grayscale-0 transition-[filter] duration-500"
                />
                {/* Subtle editorial film grain over portrait */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")",
                  }}
                />
              </div>
            </div>
            {about?.portraitCaption && (
              <figcaption className="mt-2.5 flex items-center justify-between font-mono text-[11px] text-subtle">
                <span>{about.portraitCaption}</span>
                <span>01 / 01</span>
              </figcaption>
            )}
          </figure>
        </Reveal>
      </div>
    </Section>
  )
}

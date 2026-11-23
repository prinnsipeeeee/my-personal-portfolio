import Reveal from './Reveal'

export default function Section({
  id,
  label,
  heading,
  headingAccent,
  headingEnd = '',
  description,
  texture = 'none', // 'none' | 'dots' | 'grid'
  className = '',
  children,
}) {
  const textureClass =
    texture === 'dots'
      ? 'bg-dot-grid'
      : texture === 'grid'
        ? 'bg-hairline-grid'
        : ''

  return (
    <section
      id={id}
      className={`relative scroll-mt-20 lg:scroll-mt-8 py-20 sm:py-28 border-b border-line ${textureClass} ${className}`}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
        {(label || heading) && (
          <Reveal className="mb-12 sm:mb-14">
            {label && (
              <p className="font-mono text-xs tracking-wider text-muted mb-3">
                // {label}
              </p>
            )}
            {heading && (
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-ink leading-[1.15]">
                {heading}
                {headingAccent && (
                  <>
                    {' '}
                    <span className="font-serif-accent italic font-normal text-[1.12em]">
                      {headingAccent}
                    </span>
                  </>
                )}
                {headingEnd && <> {headingEnd}</>}
              </h2>
            )}
            {description && (
              <p className="mt-3 max-w-xl text-sm sm:text-base text-muted leading-relaxed">
                {description}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}

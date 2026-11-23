import { skillsData } from '../data/skills'
import Section from './Section'
import Reveal from './Reveal'

export function getSkillInitials(name = '') {
  const parts = String(name).trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }
  return String(name).trim().slice(0, 2).toUpperCase() || '?'
}

function SkillIcon({ skill, size = 'md' }) {
  const boxClass = size === 'lg' ? 'w-9 h-9' : 'w-7 h-7'
  const svgClass = size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'

  return (
    <span
      aria-hidden="true"
      className={`${boxClass} shrink-0 border border-line flex items-center justify-center text-muted group-hover:text-ink group-hover:border-line-strong transition-colors duration-150`}
    >
      {skill.icon?.path ? (
        <svg className={`${svgClass} fill-current`} viewBox="0 0 24 24">
          <path d={skill.icon.path} />
        </svg>
      ) : (
        <span className="font-mono text-[10px] font-medium tracking-tight">
          {getSkillInitials(skill.name)}
        </span>
      )}
    </span>
  )
}

export default function Stack({ data = skillsData }) {
  const source =
    (typeof window !== 'undefined' && window.__PORTFOLIO_TEST_OVERRIDES__?.skills) || data

  const visibleGroups = (source?.groups || [])
    .map((group) => ({
      ...group,
      skills: (group.skills || []).filter((skill) => skill && skill.name && skill.name.trim()),
    }))
    .filter((group) => group.skills.length > 0)

  return (
    <Section
      id="stack"
      label="03 — stack"
      heading="Tools I reach for"
      headingAccent="every day."
      description="Front-end craft first—React, semantic HTML/CSS, and Tailwind—backed by dependable tooling and web systems fundamentals."
      texture="grid"
    >
      {visibleGroups.length === 0 ? (
        <p className="font-mono text-xs text-muted py-8 border-t border-line">
          // no stack items configured yet
        </p>
      ) : (
        <div className="space-y-14">
          {visibleGroups.map((group, groupIdx) => {
            const isPrimary = group.emphasis === 'primary' || groupIdx === 0
            const isCompact = group.emphasis === 'compact'

            return (
              <Reveal
                key={group.id || group.label}
                delay={groupIdx * 0.05}
                className="border-t border-line pt-8"
              >
                <div
                  data-testid={`stack-group-${group.id}`}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start"
                >
                  {/* Left: Group Label & Short Description */}
                  <div className="lg:col-span-4 space-y-2 min-w-0">
                    <div className="flex items-baseline justify-between lg:justify-start lg:gap-3">
                      <h3
                        className={`font-display tracking-tight text-ink ${
                          isPrimary ? 'text-2xl font-semibold' : 'text-lg font-medium'
                        }`}
                      >
                        {group.label}
                      </h3>
                      <span className="font-mono text-[11px] text-subtle tabular-nums">
                        ({String(group.skills.length).padStart(2, '0')})
                      </span>
                    </div>
                    {group.description && (
                      <p className="text-sm text-muted leading-relaxed">
                        {group.description}
                      </p>
                    )}
                  </div>

                  {/* Right: Hairline Rows / Grid (No cards, no shadows, no level bars) */}
                  <div className="lg:col-span-8 min-w-0">
                    {isCompact ? (
                      <ul className="divide-y divide-line border-t border-line lg:border-t-0">
                        {group.skills.map((skill) => (
                          <li
                            key={skill.name}
                            className="group py-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 min-w-0"
                          >
                            <span
                              title={skill.name}
                              className="inline-flex items-center gap-2.5 font-display text-sm font-medium text-ink min-w-0"
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full bg-ink shrink-0"
                                aria-hidden="true"
                              />
                              <span className="truncate">{skill.name}</span>
                            </span>
                            {skill.note && (
                              <span className="text-xs sm:text-sm text-muted sm:text-right min-w-0">
                                {skill.note}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul
                        className={`grid grid-cols-1 ${
                          isPrimary ? 'sm:grid-cols-2 gap-x-8' : 'sm:grid-cols-2 gap-x-8'
                        }`}
                      >
                        {group.skills.map((skill) => (
                          <li
                            key={skill.name}
                            className={`group flex items-start gap-3.5 border-b border-line min-w-0 transition-colors duration-150 ${
                              isPrimary ? 'py-5' : 'py-4'
                            }`}
                          >
                            <SkillIcon skill={skill} size={isPrimary ? 'lg' : 'md'} />
                            <div className="min-w-0 flex-1">
                              <h4
                                title={skill.name}
                                className={`font-display text-ink truncate ${
                                  isPrimary
                                    ? 'text-base sm:text-lg font-semibold'
                                    : 'text-sm sm:text-[15px] font-medium'
                                }`}
                              >
                                {skill.name}
                              </h4>
                              {skill.note && (
                                <p className="mt-1 text-xs sm:text-sm text-muted leading-snug">
                                  {skill.note}
                                </p>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      )}
    </Section>
  )
}

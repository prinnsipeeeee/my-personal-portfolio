/**
 * Experience, Education, and Certifications Data
 *
 * Paano i-edit:
 * - Magdagdag o magbawas ng entry sa `experience`, `education`, o `certifications`.
 * - Format ng petsa: "YYYY-MM". Ilagay ang `end: null` kung kasalukuyan pa.
 * - Awtomatikong inaayos mula pinakabago at kinukuwenta ang tagal (duration).
 * - Palitan ang mga linyang may `// EDIT ME` kung may update o kulang na detalye.
 */

export const formatPeriodDate = (dateStr) => {
  if (!dateStr) return 'Present'
  const parts = String(dateStr).split('-')
  if (parts.length < 2) return dateStr
  const year = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10)
  if (Number.isNaN(year) || Number.isNaN(month) || month < 1 || month > 12) return dateStr
  const date = new Date(year, month - 1, 1)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export const calculateDuration = (startStr, endStr, referenceDate = new Date()) => {
  if (!startStr) return ''
  const [sYear, sMonth] = String(startStr).split('-').map(Number)
  if (Number.isNaN(sYear) || Number.isNaN(sMonth)) return ''

  let eYear
  let eMonth
  if (endStr) {
    const parsed = String(endStr).split('-').map(Number)
    eYear = parsed[0]
    eMonth = parsed[1]
    if (Number.isNaN(eYear) || Number.isNaN(eMonth)) return ''
  } else {
    eYear = referenceDate.getFullYear()
    eMonth = referenceDate.getMonth() + 1
  }

  // Inclusive month count (e.g., 2026-06 to 2026-11 = 6 mos; 2026-06 to 2026-06 = 1 mo)
  const totalMonths = (eYear - sYear) * 12 + (eMonth - sMonth) + 1
  if (totalMonths <= 1) return '1 mo'

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  if (years === 0) return `${months} ${months === 1 ? 'mo' : 'mos'}`
  if (months === 0) return `${years} ${years === 1 ? 'yr' : 'yrs'}`
  return `${years} ${years === 1 ? 'yr' : 'yrs'} ${months} ${months === 1 ? 'mo' : 'mos'}`
}

export const sortEntriesNewestFirst = (entries = []) => {
  return [...entries].sort((a, b) => {
    const aCurrent = a.end === null || a.end === undefined
    const bCurrent = b.end === null || b.end === undefined
    if (aCurrent !== bCurrent) return aCurrent ? -1 : 1
    const aKey = a.start || a.year || ''
    const bKey = b.start || b.year || ''
    return String(bKey).localeCompare(String(aKey))
  })
}

export const experienceData = {
  experience: [
    {
      id: 'part-time-frontend-dev',
      role: 'Part-Time Front-End Developer',
      company: 'Client & Web Projects', // EDIT ME: Palitan ng totoong company name kung meron
      location: 'Philippines',
      type: 'Part-time',
      start: '2026-06',
      end: '2026-11', // EDIT ME: Gawing `null` kung kasalukuyan pa
      highlights: [
        'Developed and maintained responsive websites using modern front-end technologies.',
        'Converted UI designs and project requirements into functional, user-friendly interfaces.',
        'Tested and debugged website components across desktop, tablet, and mobile devices.',
      ],
      tech: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Vue.js', 'Tailwind CSS'],
    },
  ],

  education: [
    {
      id: 'bsit-informatics',
      school: 'Informatics College – Manila',
      degree: 'Bachelor of Science in Information Technology',
      start: '2026-08',
      end: null,
      note: 'Undergraduate studies focused on IT and front-end web development.', // EDIT ME
    },
    {
      id: 'bscoe-urs',
      school: 'University of Rizal System – Antipolo Campus',
      degree: 'Bachelor of Science in Computer Engineering',
      start: '2023-09',
      end: '2025-04',
      note: 'Completed coursework through Second Year.',
    },
  ],

  certifications: [
    {
      id: 'java-nc3-sil',
      name: 'Supervised Industry Learning (SIL) — Programming (Java) NC III',
      issuer: 'SpringValleyTech Corp.',
      year: '2026',
      note: '120 Training Hours (May 2026)',
    },
    {
      id: 'java-nc3-training',
      name: 'Programming (Java) NC III — Competency Training',
      issuer: 'Center for International Industries Competence Corp. (CIICC)',
      year: '2026',
      note: '241 Training Hours (Mar – May 2026)',
    },
  ],
}

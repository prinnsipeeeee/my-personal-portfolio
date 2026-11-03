/**
 * =======================================================================
 * EXPERIENCE & EDUCATION DATA CONFIGURATION
 * =======================================================================
 * Gabay:
 * - `experience`: Trabaho, internship, o project work mula sa CV.
 * - `education`: Paaralan, degree, at opsyonal na `note`.
 * - `certifications`: Mga sertipikasyon at competency trainings.
 * - Format ng petsa: "YYYY-MM". Kung kasalukuyan pa, ilagay ang `end: null`.
 * - Ang tagal (duration) at "Present" ay awtomatikong kinakalkula.
 * =======================================================================
 */

// Helper: Formatter ng buwan at taon (hal. "Jun 2026")
export const formatPeriodDate = (dateStr) => {
  if (!dateStr) return 'Present'
  const [year, month] = dateStr.split('-')
  const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

// Helper: Pagkuwenta ng tagal (hal. "6 mos" o "1 yr 4 mos")
export const calculateDuration = (startStr, endStr) => {
  if (!startStr) return ''
  const [sYear, sMonth] = startStr.split('-').map(Number)
  const start = new Date(sYear, sMonth - 1)
  
  let end
  if (endStr) {
    const [eYear, eMonth] = endStr.split('-').map(Number)
    end = new Date(eYear, eMonth)
  } else {
    end = new Date()
  }

  const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
  if (totalMonths <= 0) return '1 mo'
  
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  if (years === 0) return `${months} ${months === 1 ? 'mo' : 'mos'}`
  if (months === 0) return `${years} ${years === 1 ? 'yr' : 'yrs'}`
  return `${years} ${years === 1 ? 'yr' : 'yrs'} ${months} ${months === 1 ? 'mo' : 'mos'}`
}

export const experienceData = {
  // Trabaho at Professional Experience mula sa CV
  experience: [
    {
      id: 'part-time-frontend-dev',
      role: 'Part-Time Front-End Developer',
      company: 'Client & Web Projects', // Walang partikular na company name sa CV
      location: 'Philippines',
      type: 'Part-time',
      start: '2026-06',
      end: '2026-11',
      highlights: [
        'Developed and maintained responsive websites using modern front-end technologies.',
        'Converted UI designs and project requirements into functional, user-friendly interfaces.',
        'Tested and debugged website components to improve functionality and usability.',
      ],
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Vue.js', 'React.js', 'Tailwind CSS'],
    },
  ],

  // Edukasyon mula sa CV
  education: [
    {
      id: 'bsit-informatics',
      school: 'Informatics College – Manila',
      degree: 'Bachelor of Science in Information Technology',
      start: '2026-08',
      end: null, // "Present" sa CV
      note: 'Undergraduate studies focused on IT and software development.',
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

  // Certifications & Trainings mula sa CV
  certifications: [
    {
      id: 'java-nc3-sil',
      name: 'Certificate of Enterprise Training Completion — Supervised Industry Learning (SIL) in Programming (Java) NC III',
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
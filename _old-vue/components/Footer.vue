<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { motion } from 'motion-v'
import { contactData } from '../data/contact'
import { footerData } from '../data/footer'
import { springTransition, standardEase, heroMaskWord } from '../lib/motion'

// Navigation links matching the Navbar
const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
]

// Name letters array para sa individual hover at stagger effect
const giantNameWords = [
  { word: 'PRINCE', letters: 'PRINCE'.split('') },
  { word: 'PEÑAFLOR', letters: 'PEÑAFLOR'.split('') },
]

// Dynamic Copyright Year calculation
const currentYear = new Date().getFullYear()
const copyrightYearText = computed(() => {
  if (footerData.startYear && footerData.startYear !== currentYear) {
    return `${footerData.startYear}–${currentYear}`
  }
  return String(currentYear)
})

// Live Clock sa Asia/Manila (walang layout shift)
const localTime = ref('')
let timer = null

const updateClock = () => {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: footerData.timezone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    localTime.value = formatter.format(new Date())
  } catch {
    localTime.value = '12:00 PM'
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

onMounted(() => {
  updateClock()
  // Update every 30 seconds
  timer = setInterval(updateClock, 30000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <footer
    role="contentinfo"
    class="relative border-t border-gray-200 dark:border-gray-800/80 pt-16 sm:pt-20 overflow-hidden font-sans"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- 1. TAAS NA STRIP: Headline & Direct Connect -->
      <motion.div
        :initial="{ opacity: 0, y: 15 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, amount: 0.3 }"
        :transition="{ duration: 0.6, ease: standardEase }"
        class="pb-12 border-b border-gray-100 dark:border-gray-800/60 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <!-- Left: Serif Italic Headline -->
        <h2 class="font-serif-accent italic text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-white leading-[1.2] tracking-tight">
          Let's work
          <span class="text-brand-orange font-normal not-italic sm:italic">
            together
          </span>.
        </h2>

        <!-- Right: Email & Status -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <!-- Availability Pill -->
          <div class="inline-flex items-center gap-2 font-mono text-xs">
            <span class="relative flex h-2 w-2">
              <span
                v-if="contactData.availability.open"
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
              />
              <span
                :class="[
                  'relative inline-flex rounded-full h-2 w-2',
                  contactData.availability.open ? 'bg-emerald-500' : 'bg-gray-400'
                ]"
              />
            </span>
            <span class="text-gray-600 dark:text-gray-400">
              {{ contactData.availability.open ? contactData.availability.label : contactData.availability.closedLabel }}
            </span>
          </div>

          <!-- Email Quick Link -->
          <a
            :href="`mailto:${contactData.email}`"
            class="group inline-flex items-center gap-1 font-mono text-xs font-medium text-gray-900 dark:text-white hover:text-brand-orange transition-colors focus:outline-none"
          >
            <span>{{ contactData.email }}</span>
            <span class="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 text-brand-orange">↗</span>
          </a>
        </div>
      </motion.div>

      <!-- 2. GITNANG GRID (4 Columns) -->
      <motion.div
        :initial="{ opacity: 0, y: 15 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, amount: 0.3 }"
        :transition="{ duration: 0.6, delay: 0.1, ease: standardEase }"
        class="py-12 border-b border-gray-100 dark:border-gray-800/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        <!-- Col 1: Identity & Tagline -->
        <div class="space-y-3">
          <span class="font-display font-bold text-base text-gray-900 dark:text-white tracking-tight">
            Prince Peñaflor
          </span>
          <p class="font-sans text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
            {{ footerData.tagline }}
          </p>
        </div>

        <!-- Col 2: Navigate -->
        <nav aria-label="Footer" class="space-y-3">
          <span class="font-mono text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 block">
            // navigate
          </span>
          <ul class="space-y-2">
            <li v-for="link in navLinks" :key="link.name">
              <a
                :href="link.href"
                class="group relative inline-block font-sans text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-brand-orange transition-colors focus:outline-none"
              >
                <span>{{ link.name }}</span>
                <span class="absolute bottom-0 left-0 w-0 h-px bg-brand-orange group-hover:w-full transition-all duration-200" />
              </a>
            </li>
          </ul>
        </nav>

        <!-- Col 3: Elsewhere (Socials) -->
        <div class="space-y-3">
          <span class="font-mono text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 block">
            // elsewhere
          </span>
          <ul class="space-y-2">
            <li v-for="social in contactData.socials" :key="social.name">
              <a
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="group inline-flex items-center gap-1 font-sans text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-brand-orange transition-colors focus:outline-none"
              >
                <span>{{ social.name }}</span>
                <span class="text-xs text-gray-400 group-hover:text-brand-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">↗</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Col 4: Local Time & Back to Top -->
        <div class="space-y-3 flex flex-col justify-between">
          <div>
            <span class="font-mono text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-1">
              // local time
            </span>
            <div
              aria-live="off"
              class="font-mono text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tabular-nums"
            >
              {{ localTime }}
            </div>
            <span class="font-mono text-xs text-gray-400 dark:text-gray-500">
              {{ footerData.timezoneLabel }}
            </span>
          </div>

          <!-- Back to Top Button -->
          <div class="pt-4">
            <button
              type="button"
              @click="scrollToTop"
              class="group inline-flex items-center gap-1.5 font-mono text-xs text-gray-500 dark:text-gray-400 hover:text-brand-orange transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-orange rounded"
            >
              <span class="group-hover:-translate-y-1 transition-transform duration-200">↑</span>
              <span>Back to top</span>
            </button>
          </div>
        </div>
      </motion.div>

      <!-- 3. HULING LINYA: Copyright & Credits -->
      <motion.div
        :initial="{ opacity: 0 }"
        :while-in-view="{ opacity: 1 }"
        :viewport="{ once: true, amount: 0.3 }"
        :transition="{ duration: 0.5, delay: 0.2, ease: standardEase }"
        class="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs text-gray-400 dark:text-gray-500"
      >
        <div>
          © {{ copyrightYearText }} Prince Peñaflor
        </div>
        <div>
          Designed & built by me with {{ footerData.stack.join(' · ') }}
        </div>
      </motion.div>

    </div>

    <!-- 4. GIANT OUTLINE NAME (Bold Decorative Footer Crop) -->
    <div
      aria-hidden="true"
      class="w-full overflow-hidden select-none pointer-events-auto max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-0 flex justify-center -mb-4 sm:-mb-6 md:-mb-8 lg:-mb-10"
    >
      <div class="flex flex-col sm:flex-row items-center justify-between w-full font-display font-extrabold uppercase tracking-tighter leading-none text-[clamp(3.8rem,13vw,11.5rem)]">
        
        <!-- Word 1: PRINCE -->
        <div class="flex overflow-hidden">
          <motion.span
            v-for="(letter, lIdx) in giantNameWords[0].letters"
            :key="`w1-${lIdx}`"
            :initial="{ y: '110%', opacity: 0 }"
            :while-in-view="{ y: '0%', opacity: 1 }"
            :viewport="{ once: true, amount: 0.1 }"
            :transition="{ duration: 0.65, delay: lIdx * 0.03, ease: standardEase }"
            class="letter-outline inline-block cursor-default transition-colors duration-200 hover:text-brand-orange hover:[-webkit-text-stroke-color:#F77F00]"
          >
            {{ letter }}
          </motion.span>
        </div>

        <!-- Word 2: PEÑAFLOR -->
        <div class="flex overflow-hidden sm:ml-4">
          <motion.span
            v-for="(letter, lIdx) in giantNameWords[1].letters"
            :key="`w2-${lIdx}`"
            :initial="{ y: '110%', opacity: 0 }"
            :while-in-view="{ y: '0%', opacity: 1 }"
            :viewport="{ once: true, amount: 0.1 }"
            :transition="{ duration: 0.65, delay: (lIdx + 6) * 0.03, ease: standardEase }"
            class="letter-outline inline-block cursor-default transition-colors duration-200 hover:text-brand-orange hover:[-webkit-text-stroke-color:#F77F00]"
          >
            {{ letter }}
          </motion.span>
        </div>

      </div>
    </div>
  </footer>
</template>

<style scoped>
/**
 * Giant Name Stroke Styling
 * Transparent fill by default with subtle theme-adaptive hairline stroke,
 * fills with brand-orange on hover with a smooth return.
 */
.letter-outline {
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(100, 116, 139, 0.25);
}

.dark .letter-outline {
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.14);
}

@media (hover: hover) and (pointer: fine) {
  .letter-outline:hover {
    color: #F77F00 !important;
    -webkit-text-stroke-color: #F77F00 !important;
  }
}
</style>
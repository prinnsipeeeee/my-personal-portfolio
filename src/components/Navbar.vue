<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { springTransition, mobileMenuVariant } from '../lib/motion'

/**
 * State Management
 * - isVisible: controls hide-on-top behavior (hidden when scrollY <= 80, revealed when scrolled)
 * - isScrolled: adds depth and compresses padding deeper down the page
 * - isMobileMenuOpen: controls mobile navigation drawer
 * - isDarkMode: tracks theme state
 * - activeSection: tracks currently visible section for shared layout animation
 */
const isVisible = ref(false)
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const isDarkMode = ref(false)
const activeSection = ref('home')

/**
 * Navigation items.
 */
const navLinks = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Experience', href: '#experience', id: 'experience' },
]

/**
 * Window scroll listener:
 * Keeps navbar hidden when at the top (scrollY <= 80) and reveals it when scrolled.
 */
const handleScroll = () => {
  const currentScroll = window.scrollY
  isVisible.value = currentScroll > 80
  isScrolled.value = currentScroll > 140

  if (!isVisible.value) {
    isMobileMenuOpen.value = false
  }
}

/**
 * Theme toggle handler syncing DOM root and localStorage.
 */
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value

  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

/**
 * Closes mobile drawer when a link is clicked.
 */
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

let observer = null

/**
 * Sets up IntersectionObserver for dynamic active section tracking.
 */
const setupIntersectionObserver = () => {
  const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'contact']
  const options = {
    root: null,
    rootMargin: '-25% 0px -55% 0px',
    threshold: 0,
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    })
  }, options)

  sectionIds.forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  } else {
    isDarkMode.value = false
    document.documentElement.classList.remove('dark')
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
  setupIntersectionObserver()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (observer) observer.disconnect()
})
</script>

<template>
  <!-- Fixed Scroll-Triggered Navbar: Hidden on top, slides down on scroll -->
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md border-b transition-all duration-300 ease-in-out font-sans',
      isVisible
        ? 'translate-y-0 opacity-100 shadow-lg shadow-black/5 dark:shadow-black/25'
        : '-translate-y-full opacity-0 pointer-events-none',
      isScrolled
        ? 'py-2.5 bg-white/80 dark:bg-brand-dark/85 border-brand-orange/20 dark:border-blue-500/20'
        : 'py-3.5 bg-white/70 dark:bg-brand-dark/75 border-gray-200/50 dark:border-gray-800/50'
    ]"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 3-Part Balanced Grid -->
      <div class="grid grid-cols-2 md:grid-cols-[1fr_auto_1fr] items-center">
        
        <!-- LEFT: Minimalist Logo Link -->
        <div class="flex items-center justify-start">
          <motion.a
            href="#home"
            aria-label="Back to top"
            :while-hover="{ scale: 1.05 }"
            :while-tap="{ scale: 0.95 }"
            class="relative w-9 h-9 rounded-lg p-[1.5px] bg-gradient-to-br from-brand-orange via-brand-orange/60 to-brand-dark dark:to-blue-600 focus:outline-none transition-shadow hover:shadow-[0_0_14px_rgba(247,127,0,0.45)] group"
          >
            <div class="w-full h-full rounded-[6.5px] bg-white dark:bg-brand-dark flex items-center justify-center">

              <img src="/assets/logo_1.png" alt="Logo" class="w-full h-full object-cover rounded-[6.5px]" />
             
            </div>
          </motion.a>
        </div>

        <!-- CENTER: Centered Navigation Links with Shared Layout Indicator -->
        <nav class="hidden md:flex items-center justify-center space-x-1">
          <a
            v-for="link in navLinks"
            :key="link.id"
            :href="link.href"
            :class="[
              'relative px-3.5 py-1.5 text-sm font-medium tracking-wide rounded-full transition-colors duration-200 focus:outline-none',
              activeSection === link.id
                ? 'text-brand-orange dark:text-brand-orange'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
            ]"
          >
            <!-- Animated Shared Layout Active Pill -->
            <motion.span
              v-if="activeSection === link.id"
              layout-id="active-nav-indicator"
              :transition="springTransition"
              class="absolute inset-0 bg-brand-orange/10 dark:bg-brand-orange/15 border border-brand-orange/30 rounded-full -z-10"
            />
            
            <motion.span
              :while-hover="{ y: -1 }"
              class="inline-block"
            >
              {{ link.name }}
            </motion.span>
          </a>
        </nav>

        <!-- RIGHT: Contact / Let's Work CTA Button + Theme Toggle -->
        <div class="flex items-center justify-end space-x-3">
          
          <!-- Contact / Let's Work Button (Desktop) -->
          <motion.a
            href="#contact"
            :while-hover="{ scale: 1.03, y: -1 }"
            :while-tap="{ scale: 0.97 }"
            :class="[
              'hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 focus:outline-none',
              activeSection === 'contact'
                ? 'bg-brand-orange text-white border-brand-orange shadow-[0_0_12px_rgba(247,127,0,0.4)]'
                : 'border-brand-orange/70 text-brand-orange hover:bg-brand-orange hover:text-white hover:shadow-[0_0_14px_rgba(247,127,0,0.35)]'
            ]"
          >
            <span>Let's Work</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.a>

          <!-- Theme Mode Switcher with Smooth Rotation/Fade -->
          <motion.button
            type="button"
            @click="toggleDarkMode"
            aria-label="Toggle Color Theme"
            :while-hover="{ scale: 1.08 }"
            :while-tap="{ scale: 0.92 }"
            class="relative p-2 rounded-lg text-gray-600 hover:text-brand-orange dark:text-gray-300 dark:hover:text-brand-orange focus:outline-none transition-colors hover:bg-gray-100/60 dark:hover:bg-brand-dark-surface/60"
          >
            <AnimatePresence mode="wait">
              <motion.div
                v-if="isDarkMode"
                key="sun"
                :initial="{ rotate: -90, opacity: 0, scale: 0.8 }"
                :animate="{ rotate: 0, opacity: 1, scale: 1 }"
                :exit="{ rotate: 90, opacity: 0, scale: 0.8 }"
                :transition="{ duration: 0.25 }"
              >
                <svg class="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </motion.div>

              <motion.div
                v-else
                key="moon"
                :initial="{ rotate: 90, opacity: 0, scale: 0.8 }"
                :animate="{ rotate: 0, opacity: 1, scale: 1 }"
                :exit="{ rotate: -90, opacity: 0, scale: 0.8 }"
                :transition="{ duration: 0.25 }"
              >
                <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </motion.div>
            </AnimatePresence>
          </motion.button>

          <!-- Animated Hamburger Button for Mobile -->
          <button
            type="button"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            aria-label="Toggle Navigation Drawer"
            class="p-2 md:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
          >
            <div class="w-6 h-5 relative flex flex-col justify-between">
              <span
                :class="[
                  'w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-left',
                  isMobileMenuOpen ? 'rotate-45 translate-x-1 -translate-y-0.5' : ''
                ]"
              ></span>
              <span
                :class="[
                  'w-full h-0.5 bg-current rounded-full transition-all duration-200',
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                ]"
              ></span>
              <span
                :class="[
                  'w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-left',
                  isMobileMenuOpen ? '-rotate-45 translate-x-1 translate-y-0.5' : ''
                ]"
              ></span>
            </div>
          </button>

        </div>

      </div>
    </div>

    <!-- Mobile Navigation Drawer via AnimatePresence -->
    <AnimatePresence>
      <motion.div
        v-if="isMobileMenuOpen"
        :initial="mobileMenuVariant.hidden"
        :animate="mobileMenuVariant.visible"
        :exit="mobileMenuVariant.hidden"
        class="md:hidden border-b border-gray-200/50 dark:border-gray-800/60 bg-white/95 dark:bg-brand-dark/95 backdrop-blur-xl px-5 pt-3 pb-6 space-y-2.5 mt-2"
      >
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="link.href"
          @click="closeMobileMenu"
          :class="[
            'block px-3.5 py-2.5 rounded-xl text-sm font-medium tracking-wide transition-colors',
            activeSection === link.id
              ? 'text-brand-orange bg-brand-orange/10 dark:bg-brand-orange/15 font-semibold border border-brand-orange/20'
              : 'text-gray-700 hover:text-brand-orange hover:bg-gray-100/60 dark:text-gray-200 dark:hover:bg-brand-dark-surface/60'
          ]"
        >
          {{ link.name }}
        </a>

        <!-- Mobile Let's Work CTA Button -->
        <a
          href="#contact"
          @click="closeMobileMenu"
          class="block text-center mt-3 px-4 py-2.5 rounded-xl text-sm font-semibold tracking-wide bg-brand-orange text-white shadow-md shadow-brand-orange/25"
        >
          Let's Work
        </a>
      </motion.div>
    </AnimatePresence>
  </header>
</template>
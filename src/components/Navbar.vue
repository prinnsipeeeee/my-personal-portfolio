<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

/**
 * State Management
 * - isVisible: controls sliding reveal when scrolling past the top section
 * - isScrolled: triggers compressed height & deeper shadow when deeper in the page
 * - isMobileMenuOpen: controls mobile slide-down drawer
 * - isDarkMode: tracks current theme mode
 * - activeSection: tracks currently viewed section for active indicator
 */
const isVisible = ref(false)
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const isDarkMode = ref(false)
const activeSection = ref('hero')

/**
 * Navigation items.
 */
const navLinks = [
  { name: 'Home', href: '#hero', id: 'hero' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Experience', href: '#experience', id: 'experience' },
]

/**
 * Window scroll listener:
 * - Keeps navbar completely hidden at top (scrollY <= 80)
 * - Reveals navbar smoothly with slide-down once user scrolls (scrollY > 80)
 */
const handleScroll = () => {
  const currentScroll = window.scrollY
  isVisible.value = currentScroll > 80
  isScrolled.value = currentScroll > 140

  // Auto-close mobile menu if scrolled back to the very top
  if (!isVisible.value) {
    isMobileMenuOpen.value = false
  }
}

/**
 * Toggles dark mode state, updates DOM root element, and persists to localStorage.
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
 * Sets up IntersectionObserver to detect the section currently in view.
 */
const setupIntersectionObserver = () => {
  const sectionIds = ['hero', 'about', 'skills', 'projects', 'experience', 'contact']
  const options = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
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
  // Theme resolution: check localStorage, fallback to system preference
  const savedTheme = localStorage.getItem('theme')
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  } else {
    isDarkMode.value = false
    document.documentElement.classList.remove('dark')
  }

  // Scroll listener for visibility toggling
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()

  // Active section tracking
  setupIntersectionObserver()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (observer) observer.disconnect()
})
</script>

<template>
  <!-- Fixed Header: Completely hidden at top; slides down smoothly upon scrolling -->
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 w-full font-sans backdrop-blur-md border-b transition-all duration-300 ease-in-out',
      isVisible
        ? 'translate-y-0 opacity-100 shadow-lg shadow-black/5 dark:shadow-black/25'
        : '-translate-y-full opacity-0 pointer-events-none',
      isScrolled
        ? 'py-2.5 bg-white/80 dark:bg-brand-dark/85 border-brand-orange/20 dark:border-blue-500/20'
        : 'py-3.5 bg-white/70 dark:bg-brand-dark/75 border-gray-200/50 dark:border-gray-800/50'
    ]"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        
        <!-- Brand Block: Gradient-Border Logo + Modern Typography + Blinking Cursor -->
        <a href="#hero" class="flex items-center space-x-3 group focus:outline-none">
          
          <!-- Logo Container -->
          <div class="relative w-9 h-9 rounded-lg p-[1.5px] bg-gradient-to-br from-brand-orange via-brand-orange/60 to-brand-dark dark:to-blue-600 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_14px_rgba(247,127,0,0.4)]">
            <div class="w-full h-full rounded-[6.5px] bg-white dark:bg-brand-dark flex items-center justify-center">
              <img src="/assets/logo_1.png" alt="Logo" class="w-full h-full object-cover rounded-[6.5px]" />
            </div>
          </div>
        </a>

        <!-- Desktop Navigation Items -->
        <nav class="hidden md:flex items-center space-x-7">
          <a
            v-for="link in navLinks"
            :key="link.name"
            :href="link.href"
            :class="[
              'relative text-[14px] font-medium tracking-wide transition-colors duration-200 py-1 group focus:outline-none',
              activeSection === link.id
                ? 'text-brand-orange dark:text-brand-orange'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
            ]"
          >
            {{ link.name }}

            <!-- Modern Animated Center-out Underline -->
            <span
              :class="[
                'absolute bottom-0 left-0 w-full h-[2px] bg-brand-orange rounded-full transition-all duration-300 ease-out origin-center',
                activeSection === link.id
                  ? 'scale-x-100 opacity-100'
                  : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
              ]"
            ></span>
          </a>

          <!-- Pill-Shaped Contact Action Button -->
          <a
            href="#contact"
            :class="[
              'px-4 py-1.5 rounded-full text-[14px] font-medium tracking-wide border transition-all duration-300 focus:outline-none',
              activeSection === 'contact'
                ? 'bg-brand-orange text-white border-brand-orange shadow-[0_0_12px_rgba(247,127,0,0.4)]'
                : 'border-brand-orange/70 text-brand-orange hover:bg-brand-orange hover:text-white hover:shadow-[0_0_14px_rgba(247,127,0,0.35)]'
            ]"
          >
            Contact
          </a>

          <!-- Theme Mode Switcher Button -->
          <button
            type="button"
            @click="toggleDarkMode"
            aria-label="Toggle Color Theme"
            class="relative p-2 rounded-lg text-gray-500 hover:text-brand-orange dark:text-gray-400 dark:hover:text-brand-orange focus:outline-none transition-all duration-300 hover:bg-gray-100/60 dark:hover:bg-brand-dark-surface/60"
          >
            <!-- Sun Icon (Dark Mode active) -->
            <svg
              v-if="isDarkMode"
              class="w-5 h-5 transition-transform duration-500 rotate-0 hover:rotate-45"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <!-- Moon Icon (Light Mode active) -->
            <svg
              v-else
              class="w-5 h-5 transition-transform duration-500 -rotate-12 hover:rotate-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </nav>

        <!-- Mobile Controls (Theme Toggle + Animated Hamburger) -->
        <div class="flex items-center space-x-2 md:hidden">
          <button
            type="button"
            @click="toggleDarkMode"
            aria-label="Toggle Color Theme"
            class="p-2 rounded-lg text-gray-600 dark:text-gray-300 focus:outline-none"
          >
            <svg v-if="isDarkMode" class="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>

          <!-- Animated Hamburger Button -->
          <button
            type="button"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            aria-label="Toggle Menu"
            class="p-2 text-gray-700 dark:text-gray-200 focus:outline-none"
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

    <!-- Mobile Drawer -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden border-b border-gray-200/50 dark:border-gray-800/60 bg-white/95 dark:bg-brand-dark/95 backdrop-blur-xl px-5 pt-3 pb-6 space-y-2.5 mt-2"
      >
        <a
          v-for="(link, index) in navLinks"
          :key="link.name"
          :href="link.href"
          @click="closeMobileMenu"
          :style="{ transitionDelay: `${index * 30}ms` }"
          :class="[
            'block px-3 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-200',
            activeSection === link.id
              ? 'text-brand-orange bg-brand-orange/10 dark:bg-brand-orange/15 font-semibold'
              : 'text-gray-700 hover:text-brand-orange hover:bg-gray-100/60 dark:text-gray-200 dark:hover:bg-brand-dark-surface/60'
          ]"
        >
          {{ link.name }}
        </a>

        <!-- Mobile Contact Button -->
        <a
          href="#contact"
          @click="closeMobileMenu"
          class="block text-center mt-3 px-4 py-2 rounded-lg text-sm font-medium tracking-wide bg-brand-orange text-white shadow-md shadow-brand-orange/20"
        >
          Contact Me
        </a>
      </div>
    </transition>
  </header>
</template>
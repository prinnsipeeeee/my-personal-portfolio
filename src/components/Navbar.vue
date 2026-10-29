<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Component Reactive States
 * - isVisible: Triggers sliding navbar visibility past the scroll threshold.
 * - isMobileMenuOpen: Controls mobile navigation drawer visibility.
 * - isDarkMode: Reflects and persists theme mode preference.
 */
const isVisible = ref(false)
const isMobileMenuOpen = ref(false)
const isDarkMode = ref(false)

/**
 * Portfolio navigation anchor mapping.
 */
const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
]

/**
 * Window scroll listener to auto-reveal navbar past 80px.
 */
const handleScroll = () => {
  isVisible.value = window.scrollY > 80
  if (!isVisible.value) {
    isMobileMenuOpen.value = false
  }
}

/**
 * Toggles theme mode and updates localStorage and document root classes.
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
 * Closes mobile drawer on anchor link interaction.
 */
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

/**
 * Lifecycle Hook: Mount listeners and resolve initial theme state.
 */
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
})

/**
 * Lifecycle Hook: Clean up event listener to prevent memory leaks.
 */
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <!-- Fixed Scroll-Reveal Navbar with Frosted Glassmorphism -->
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-lg bg-white/75 dark:bg-brand-dark/80 border-b border-gray-200/50 dark:border-gray-800/60 transition-all duration-300 ease-in-out',
      isVisible ? 'translate-y-0 opacity-100 shadow-sm' : '-translate-y-full opacity-0 pointer-events-none'
    ]"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        
        <!-- Brand Identity Block (Logo + Name + Tagline) -->
        <a href="#hero" class="flex items-center space-x-3 group cursor-pointer focus:outline-none">
          
          <!-- 
            LOGO CONTAINER:
            Currently renders styled placeholder initials with an orange accent border.
            HOW TO REPLACE WITH AN IMAGE:
            1. Place your logo image into 'src/assets/logo.png'
            2. Uncomment the <img> tag below and remove or comment out the initials span.
          -->
          <div class="w-10 h-10 rounded-xl border-2 border-brand-orange/80 bg-brand-orange/10 dark:bg-brand-orange/15 flex items-center justify-center text-brand-orange font-black text-sm tracking-tighter group-hover:border-brand-orange group-hover:scale-105 transition-all duration-200 overflow-hidden shadow-sm">
            <!-- PLACEHOLDER INITIALS (Palitan ang [PR] ng iyong initials, hal. PR) -->
            <span>[PR]</span>

            <!-- OPTIONAL IMAGE REPLACEMENT:
            <img src="../assets/logo.png" alt="Logo" class="w-full h-full object-cover" />
            -->
          </div>

          <!-- Name & Tagline Block -->
          <div class="flex flex-col text-left">
            <span class="text-base font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-brand-orange transition-colors">
              Prince <span class="font-light text-gray-500 dark:text-gray-400">[Apelyido]</span>
            </span>
            <span class="text-[10px] uppercase tracking-wider font-semibold text-gray-600 dark:text-gray-300 group-hover:text-brand-orange transition-colors">
              [Job Title, hal. Web Developer]
            </span>
          </div>
        </a>

        <!-- Desktop Navigation Items -->
        <nav class="hidden md:flex items-center space-x-8">
          <a
            v-for="link in navLinks"
            :key="link.name"
            :href="link.href"
            class="text-sm font-medium text-gray-600 hover:text-brand-orange dark:text-gray-300 dark:hover:text-brand-orange transition-colors"
          >
            {{ link.name }}
          </a>

          <!-- Theme Mode Switcher -->
          <button
            type="button"
            @click="toggleDarkMode"
            aria-label="Toggle Color Theme"
            class="p-2 rounded-xl bg-gray-100/80 hover:bg-gray-200/80 dark:bg-gray-800/80 dark:hover:bg-gray-700/80 text-gray-700 dark:text-gray-300 transition-colors"
          >
            <svg v-if="isDarkMode" class="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </nav>

        <!-- Mobile Controls -->
        <div class="flex items-center space-x-2 md:hidden">
          <button
            type="button"
            @click="toggleDarkMode"
            aria-label="Toggle Color Theme"
            class="p-2 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300"
          >
            <svg v-if="isDarkMode" class="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>

          <button
            type="button"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            aria-label="Toggle Navigation Drawer"
            class="p-2 rounded-xl text-gray-700 dark:text-gray-300"
          >
            <svg v-if="isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

      </div>
    </div>

    <!-- Mobile Drawer -->
    <div
      v-show="isMobileMenuOpen"
      class="md:hidden border-b border-gray-200/50 dark:border-gray-800/60 bg-white/95 dark:bg-brand-dark/95 backdrop-blur-lg px-4 pt-2 pb-4 space-y-1"
    >
      <a
        v-for="link in navLinks"
        :key="link.name"
        :href="link.href"
        @click="closeMobileMenu"
        class="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-brand-orange hover:bg-gray-100/60 dark:text-gray-200 dark:hover:text-brand-orange dark:hover:bg-brand-dark-surface/60 transition-colors"
      >
        {{ link.name }}
      </a>
    </div>
  </header>
</template>
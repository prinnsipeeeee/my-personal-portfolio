<script setup>
import { ref } from 'vue'
import { motion, useScroll, useTransform } from 'motion-v'
import {
  heroStaggerContainer,
  heroFadeUpItem,
  heroMaskWord,
  floatingLoop,
  springTransition
} from '../lib/motion'

/**
 * Profile identity configuration.
 * Easily update email and asset paths here.
 */
const profileConfig = {
  nameFirst: 'PRINCE',
  nameLast: 'PEÑAFLOR',
  taglineStart: 'I build fast,',
  taglineAccent: 'clean',
  taglineEnd: ', and user-friendly websites and web apps.',
  email: 'prynzpenaflor@gmail.com', // Palitan ng iyong totoong email
  cvPath: '/cv/Prince-Penaflor-CV.pdf',
}

/**
 * Social media links configuration with inline SVG vectors.
 */
const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/prinnsipeeeee',
    svg: `M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z`
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/[iyong-linkedin]', // Palitan ng LinkedIn profile URL
    svg: `M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.46 1.46 0 1 0 0-2.92 1.46 1.46 0 0 0 0 2.92M7.86 18.5v-8.37H5.07v8.37h2.79z`
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/[iyong-facebook]', // Palitan ng Facebook profile URL
    svg: `M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z`
  }
]

/**
 * State for clipboard copy indicator.
 */
const isCopied = ref(false)

const copyEmailToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(profileConfig.email)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy email:', err)
  }
}

/**
 * Scroll Motion Hooks:
 * - subtle parallax opacity and vertical displacement as user scrolls past hero
 * - smooth fade-out for bottom scroll indicator
 */
const { scrollY } = useScroll()
const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.4])
const heroY = useTransform(scrollY, [0, 400], [0, 45])
const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [1, 0])
</script>

<template>
  <section
    id="home"
    class="relative min-h-[100svh] w-full flex items-center justify-center pt-16 pb-20 overflow-hidden"
  >
    <!-- Staggered Main Hero Container with Subtle Scroll Parallax -->
    <motion.div
      variants={heroStaggerContainer}
      initial="hidden"
      animate="visible"
      :style="{ opacity: heroOpacity, y: heroY }"
      class="w-full flex flex-col items-center md:items-start text-center md:text-left select-none"
    >
      <!-- Row 1: Availability Badge + Floating Portrait -->
      <motion.div
        variants={heroFadeUpItem}
        class="flex flex-col-reverse sm:flex-row items-center gap-4 mb-8"
      >
        <!-- Availability Pill -->
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-500/15 backdrop-blur-sm">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span class="font-mono text-xs tracking-tight font-medium text-emerald-700 dark:text-emerald-400">
            Available for work
          </span>
        </div>
      </motion.div>

      <!-- Row 2: Masked Giant Responsive Name Typography -->
      <h1 class="font-display tracking-tighter uppercase leading-[0.92] text-5xl sm:text-7xl md:text-8xl lg:text-[clamp(4.5rem,9vw,7.8rem)] mb-6">
        <!-- Masked Word 1: PRINCE -->
        <span class="inline-block overflow-hidden align-top">
          <motion.span
            variants={heroMaskWord}
            class="inline-block font-extrabold text-gray-900 dark:text-white"
          >
            {{ profileConfig.nameFirst }}
          </motion.span>
        </span>

        <!-- Masked Word 2: PEÑAFLOR. -->
        <span class="block sm:inline sm:ml-4 overflow-hidden align-top">
          <motion.span
            variants={heroMaskWord}
            class="inline-block font-light text-gray-600 dark:text-gray-300"
          >
            {{ profileConfig.nameLast }}<span class="text-brand-orange font-bold">.</span>
          </motion.span>
        </span>
      </h1>

      <!-- Row 3: Elegant Serif Italic Subheadline -->
      <motion.p
        variants={heroFadeUpItem}
        class="font-serif-accent italic text-2xl sm:text-3xl md:text-4xl text-slate-600 dark:text-slate-300 max-w-2xl leading-snug mb-9"
      >
        {{ profileConfig.taglineStart }}
        <span class="text-brand-orange font-normal not-italic sm:italic">
          {{ profileConfig.taglineAccent }}
        </span>{{ profileConfig.taglineEnd }}
      </motion.p>

      <!-- Row 4: Action Buttons with whileHover and whileTap -->
      <motion.div
        variants={heroFadeUpItem}
        class="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-8"
      >
        <!-- Primary Action: Download CV -->
        <motion.a
          :href="profileConfig.cvPath"
          download
          :while-hover="{ y: -2, scale: 1.02 }"
          :while-tap="{ scale: 0.97 }"
          :transition="springTransition"
          class="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-brand-orange text-white font-medium text-sm tracking-wide shadow-md shadow-brand-orange/25 hover:bg-brand-orange-hover hover:shadow-lg hover:shadow-brand-orange/40 transition-shadow focus:outline-none"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Download CV</span>
        </motion.a>

        <!-- Secondary Action: Email Me -->
        <motion.a
          :href="`mailto:${profileConfig.email}`"
          :while-hover="{ y: -2, scale: 1.02 }"
          :while-tap="{ scale: 0.97 }"
          :transition="springTransition"
          class="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white dark:hover:text-white hover:shadow-lg hover:shadow-brand-orange/25 transition-all duration-200 focus:outline-none"
        >
          <svg class="w-4 h-4 text-brand-orange group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span class="text-brand-orange group-hover:text-white transition-colors duration-200">Email Me</span>
        </motion.a>
      </motion.div>

      <!-- Row 5: Adaptive Social Icons & Interactive Clipboard Email -->
      <motion.div
        variants={heroFadeUpItem}
        class="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
      >
        <!-- Social Icon Buttons -->
        <div class="flex items-center space-x-3">
          <motion.a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="social.name"
            :while-hover="{ y: -3, scale: 1.08 }"
            :while-tap="{ scale: 0.92 }"
            :transition="springTransition"
            class="p-2.5 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-brand-orange hover:border-brand-orange/60 dark:hover:text-brand-orange dark:hover:border-brand-orange/60 transition-colors focus:outline-none"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path :d="social.svg" />
            </svg>
          </motion.a>
        </div>

        <span class="hidden sm:inline-block w-px h-5 bg-slate-200 dark:bg-slate-800"></span>

        <!-- Adaptive Copyable Email Button -->
        <button
          type="button"
          @click="copyEmailToClipboard"
          class="inline-flex items-center gap-2 font-mono text-xs text-slate-700 dark:text-slate-200 hover:text-brand-orange dark:hover:text-brand-orange transition-colors group focus:outline-none"
          aria-label="Copy email address"
        >
          <span>{{ profileConfig.email }}</span>
          
          <span v-if="isCopied" class="inline-flex items-center text-emerald-500 font-sans text-xs">
            <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
            Copied!
          </span>

          <svg
            v-else
            class="w-3.5 h-3.5 text-current group-hover:text-brand-orange transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </motion.div>
    </motion.div>

    <!-- Row 6: Centered Bottom Scroll Indicator with Scroll Fade-Out -->
    <motion.div
      :style="{ opacity: scrollIndicatorOpacity }"
      class="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
    >
      <a
        href="#about"
        aria-label="Scroll to about section"
        class="inline-flex flex-col items-center gap-1.5 font-mono text-[11px] text-slate-500 dark:text-slate-400 hover:text-brand-orange dark:hover:text-brand-orange transition-colors group focus:outline-none"
      >
        <span>scroll down</span>
        <motion.svg
          :animate="{ y: [0, 5, 0] }"
          :transition="{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }"
          class="w-4 h-4 text-brand-orange"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </motion.svg>
      </a>
    </motion.div>
  </section>
</template>
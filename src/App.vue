<script setup>
import Navbar from './components/Navbar.vue'

/**
 * Section registry for the single-page portfolio layout.
 */
const sections = [
  { id: 'hero', title: 'Hero Section', fullHeight: true },
  { id: 'about', title: 'About Section', fullHeight: false },
  { id: 'skills', title: 'Skills Section', fullHeight: false },
  { id: 'projects', title: 'Projects Section', fullHeight: false },
  { id: 'experience', title: 'Experience / Education Section', fullHeight: false },
  { id: 'contact', title: 'Contact Section', fullHeight: false },
]
</script>

<template>
  <div class="relative min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-500 overflow-x-hidden">
    
    <!-- Global Ambient Gradient Layer (Fixed, No waves) -->
    <div class="bg-site-ambient"></div>

    <!-- Global Subtle SVG Grain Texture Layer -->
    <div class="bg-site-grain"></div>

    <!-- Fixed Scroll-Triggered Navbar -->
    <Navbar />

    <!-- Page Content Flow -->
    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      <section
        v-for="section in sections"
        :key="section.id"
        :id="section.id"
        :class="[
          'p-8 rounded-2xl border border-dashed border-gray-300/60 dark:border-gray-800/60 backdrop-blur-[1px] flex flex-col justify-center items-center text-center',
          section.fullHeight ? 'min-h-screen' : 'min-h-[50vh]'
        ]"
      >
        <span class="text-sm font-semibold tracking-wide uppercase text-brand-orange mb-2">Section Placeholder</span>
        <h2 class="text-3xl font-bold">{{ section.title }}</h2>
        <p v-if="section.fullHeight" class="mt-4 text-sm text-gray-500 dark:text-gray-400">
          (Mag-scroll pababa para makita ang bagong logo block ng Navbar at ang textured gradient background)
        </p>
      </section>
    </main>
  </div>
</template>
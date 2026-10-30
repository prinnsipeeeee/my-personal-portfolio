<script setup>
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'

/**
 * Subsequent portfolio section placeholders (hero is now mounted as a dedicated component).
 */
const sections = [
  { id: 'about', title: 'About Section' },
  { id: 'skills', title: 'Skills Section' },
  { id: 'projects', title: 'Projects Section' },
  { id: 'experience', title: 'Experience / Education Section' },
  { id: 'contact', title: 'Contact Section' },
]
</script>

<template>
  <div class="relative min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-500 overflow-x-hidden">
    
    <!-- Global Ambient Gradient Layer -->
    <div class="bg-site-ambient"></div>

    <!-- Global Subtle SVG Grain Texture Layer -->
    <div class="bg-site-grain"></div>

    <!-- Fixed Scroll-Triggered Navbar -->
    <Navbar />

    <!-- Main Content Flow -->
    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Dedicated Hero Component -->
      <Hero />

      <!-- Remaining Section Placeholders -->
      <div class="space-y-24 py-16">
        <section
          v-for="section in sections"
          :key="section.id"
          :id="section.id"
          class="min-h-[50vh] p-8 rounded-2xl border border-dashed border-gray-300/60 dark:border-gray-800/60 backdrop-blur-[1px] flex flex-col justify-center items-center text-center"
        >
          <span class="text-sm font-semibold tracking-wide uppercase text-brand-orange mb-2">Section Placeholder</span>
          <h2 class="text-3xl font-bold">{{ section.title }}</h2>
        </section>
      </div>

    </main>
  </div>
</template>
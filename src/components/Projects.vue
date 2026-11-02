<script setup>
import { ref } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { projectsData } from '../data/projects'
import ProjectModal from './ProjectModal.vue'
import { standardEase, springTransition } from '../lib/motion'

const selectedProject = ref(null)

const openModal = (project) => {
  selectedProject.value = project
}

const closeModal = () => {
  selectedProject.value = null
}
</script>

<template>
  <section
    id="projects"
    class="relative py-24 sm:py-28 md:py-36 scroll-mt-20 focus:outline-none"
  >
    <!-- Section Eyebrow Label -->
    <div class="mb-12 flex items-center gap-2">
      <span class="font-mono text-xs sm:text-sm text-gray-500 dark:text-gray-400 tracking-wider">
        // selected projects
      </span>
      <span class="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
    </div>

    <!-- Section Headline in Instrument Serif Italic -->
    <div class="max-w-2xl mb-12">
      <h2 class="font-serif-accent italic text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-white leading-[1.2] tracking-tight">
        A selection of digital products built with
        <span class="text-brand-orange font-normal not-italic sm:italic">
          care & precision
        </span>.
      </h2>
    </div>

    <!-- Responsive Projects Grid (Scalable Cards) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      <motion.div
        v-for="(project, index) in projectsData"
        :key="project.id"
        @click="openModal(project)"
        :while-hover="{ y: -6, scale: 1.01 }"
        :while-tap="{ scale: 0.98 }"
        :transition="springTransition"
        class="group cursor-pointer rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/80 dark:bg-brand-dark-surface/80 backdrop-blur-md overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-brand-orange/5 transition-all select-none"
      >
        <!-- Card Image Header -->
        <div class="relative w-full aspect-[16/10] overflow-hidden bg-slate-900">
          <img
            :src="project.images[0]"
            :alt="project.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <!-- Overlay Badge: Category -->
          <div class="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-md border border-white/10 text-white font-mono text-[10px] tracking-wider uppercase">
            {{ project.category }}
          </div>

          <!-- Click Prompt Indicator -->
          <div class="absolute inset-0 bg-brand-orange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span class="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white font-mono text-xs tracking-wide">
              View Project Details ↗
            </span>
          </div>
        </div>

        <!-- Card Body Content -->
        <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="font-display font-bold text-lg sm:text-xl text-gray-900 dark:text-white group-hover:text-brand-orange transition-colors mb-2">
              {{ project.title }}
            </h3>
            <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-sans line-clamp-2 leading-relaxed mb-4">
              {{ project.tagline }}
            </p>
          </div>

          <!-- Bottom Tags List -->
          <div class="pt-3 border-t border-gray-100 dark:border-gray-800/60 flex flex-wrap gap-1.5">
            <span
              v-for="tag in project.tags.slice(0, 3)"
              :key="tag"
              class="px-2 py-0.5 rounded text-[10px] font-mono bg-gray-100 dark:bg-brand-dark text-gray-600 dark:text-gray-400"
            >
              {{ tag }}
            </span>
            <span
              v-if="project.tags.length > 3"
              class="px-2 py-0.5 rounded text-[10px] font-mono text-brand-orange font-semibold"
            >
              +{{ project.tags.length - 3 }}
            </span>
          </div>
        </div>
      </motion.div>
    </div>

    <!-- Project Pop-up Modal Container -->
    <AnimatePresence>
      <ProjectModal
        v-if="selectedProject"
        :project="selectedProject"
        @close="closeModal"
      />
    </AnimatePresence>
  </section>
</template>
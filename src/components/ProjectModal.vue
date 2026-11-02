<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { springTransition, standardEase } from '../lib/motion'

const props = defineProps({
  project: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close'])

const currentPhotoIndex = ref(0)

// Reset carousel index when opened with a new project
watch(
  () => props.project,
  () => {
    currentPhotoIndex.value = 0
  }
)

const nextPhoto = () => {
  if (!props.project) return
  currentPhotoIndex.value = (currentPhotoIndex.value + 1) % props.project.images.length
}

const prevPhoto = () => {
  if (!props.project) return
  currentPhotoIndex.value = (currentPhotoIndex.value - 1 + props.project.images.length) % props.project.images.length
}

const handleKeyDown = (e) => {
  if (e.key === 'Escape') emit('close')
  if (e.key === 'ArrowRight') nextPhoto()
  if (e.key === 'ArrowLeft') prevPhoto()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
    <!-- Backdrop Overlay with Blur -->
    <motion.div
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0 }"
      @click="emit('close')"
      class="fixed inset-0 bg-black/70 backdrop-blur-md -z-10"
    />

    <!-- Modal Content Card -->
    <motion.div
      :initial="{ opacity: 0, scale: 0.95, y: 15 }"
      :animate="{ opacity: 1, scale: 1, y: 0 }"
      :exit="{ opacity: 0, scale: 0.95, y: 15 }"
      :transition="springTransition"
      class="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white dark:bg-brand-dark-surface shadow-2xl p-6 sm:p-8 font-sans scrollbar-thin"
    >
      <!-- Close Button (Top-Right) -->
      <button
        type="button"
        @click="emit('close')"
        aria-label="Close project modal"
        class="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-brand-orange hover:bg-gray-100 dark:hover:bg-brand-dark transition-colors z-20 focus:outline-none"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Category Eyebrow -->
      <div class="flex items-center gap-2 mb-2 font-mono text-xs text-brand-orange tracking-wider uppercase font-semibold">
        <span>// {{ project.category }}</span>
      </div>

      <!-- Project Title -->
      <h3 class="font-display font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white mb-6">
        {{ project.title }}
      </h3>

      <!-- Slideshow Carousel Container -->
      <div class="relative w-full aspect-video rounded-xl overflow-hidden bg-black/90 mb-6 border border-gray-200/40 dark:border-gray-800/60 group">
        <AnimatePresence mode="wait">
          <motion.img
            :key="project.images[currentPhotoIndex]"
            :src="project.images[currentPhotoIndex]"
            :alt="`${project.title} screenshot ${currentPhotoIndex + 1}`"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :exit="{ opacity: 0 }"
            :transition="{ duration: 0.35, ease: standardEase }"
            class="w-full h-full object-cover"
          />
        </AnimatePresence>

        <!-- Carousel Navigation Controls -->
        <div
          v-if="project.images.length > 1"
          class="absolute inset-y-0 inset-x-3 flex items-center justify-between pointer-events-none"
        >
          <button
            type="button"
            @click.stop="prevPhoto"
            aria-label="Previous image"
            class="pointer-events-auto p-2 rounded-full bg-black/50 hover:bg-brand-orange text-white backdrop-blur-md transition-colors focus:outline-none"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            @click.stop="nextPhoto"
            aria-label="Next image"
            class="pointer-events-auto p-2 rounded-full bg-black/50 hover:bg-brand-orange text-white backdrop-blur-md transition-colors focus:outline-none"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Slide Indicators & Counter -->
        <div class="absolute bottom-3 inset-x-0 flex items-center justify-between px-4 pointer-events-none">
          <!-- Dots -->
          <div class="flex items-center gap-1.5 pointer-events-auto">
            <span
              v-for="(_, idx) in project.images"
              :key="idx"
              @click="currentPhotoIndex = idx"
              class="cursor-pointer h-1.5 rounded-full transition-all duration-300"
              :class="currentPhotoIndex === idx ? 'w-6 bg-brand-orange' : 'w-1.5 bg-white/50'"
            />
          </div>

          <!-- Counter -->
          <div class="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white font-mono text-[10px]">
            {{ currentPhotoIndex + 1 }} / {{ project.images.length }}
          </div>
        </div>
      </div>

      <!-- Description & Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="md:col-span-2 space-y-4">
          <h4 class="font-mono text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500">
            // project overview
          </h4>
          <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {{ project.description }}
          </p>

          <!-- Key Features Bullet List -->
          <div class="pt-2">
            <h5 class="font-mono text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
              // key highlights
            </h5>
            <ul class="space-y-1.5">
              <li
                v-for="(feature, fIdx) in project.features"
                :key="fIdx"
                class="flex items-start text-xs sm:text-sm text-slate-700 dark:text-slate-300"
              >
                <span class="text-brand-orange mr-2">›</span>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Technology Stack Tags -->
        <div class="space-y-3">
          <h4 class="font-mono text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500">
            // stack & tools
          </h4>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-gray-100 dark:bg-brand-dark border border-gray-200 dark:border-gray-800 text-slate-700 dark:text-slate-300"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <!-- Action Buttons: Live Review Link & Source Code -->
      <div class="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-800/80">
        <!-- Live Demo / Review URL -->
        <a
          v-if="project.liveUrl"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-orange text-white font-medium text-xs sm:text-sm tracking-wide shadow-md shadow-brand-orange/25 hover:bg-brand-orange-hover hover:shadow-lg transition-all focus:outline-none"
        >
          <span>Visit Live Website</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>

        <!-- GitHub Repository Link -->
        <a
          v-if="project.githubUrl"
          :href="project.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-slate-700 dark:text-slate-200 font-medium text-xs sm:text-sm tracking-wide hover:border-brand-orange hover:text-brand-orange transition-colors focus:outline-none"
        >
          <span>View Source Code</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </a>
      </div>
    </motion.div>
  </div>
</template>
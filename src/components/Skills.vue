<script setup>
import { ref, computed } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { skillsData } from '../data/skills'
import SkillTerminal from './SkillTerminal.vue'
import SkillModule from './SkillModule.vue'
import SkillRadar from './SkillRadar.vue'
import { blurWordReveal, standardEase } from '../lib/motion'

// Active Category State
const categories = skillsData.categories
const activeCategoryId = ref(categories[0]?.id || 'frontend')

const activeCategory = computed(() => {
  return categories.find(c => c.id === activeCategoryId.value) || categories[0]
})

const handleCategorySelect = (id) => {
  activeCategoryId.value = id
}
</script>

<template>
  <section
    id="skills"
    class="relative py-24 sm:py-28 md:py-36 scroll-mt-20 focus:outline-none overflow-hidden"
  >
    <!-- Background Ambient Glow & Subtle Grid -->
    <div class="absolute top-1/4 -right-32 w-80 h-80 rounded-full bg-brand-orange/5 dark:bg-brand-orange/10 blur-3xl pointer-events-none -z-10" />

    <!-- Section Eyebrow Label -->
    <div class="mb-12 flex items-center gap-2">
      <span class="font-mono text-xs sm:text-sm text-gray-500 dark:text-gray-400 tracking-wider">
        // skills
      </span>
      <span class="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
    </div>

    <!-- Main Responsive Grid: Sticky Left Column + Modules Grid on Right -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
      
      <!-- LEFT COLUMN: Sticky Headline + Terminal + Radar (Desktop Sticky) -->
      <div class="lg:col-span-5 flex flex-col space-y-8 lg:sticky lg:top-28">
        
        <!-- Headline in Instrument Serif Italic with Word Reveal -->
        <h2 class="font-serif-accent italic text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-white leading-[1.2] tracking-tight">
          Tools I use to build
          <span class="relative inline-block text-brand-orange font-normal not-italic sm:italic mx-1.5">
            things
            <!-- Subtle accent underline -->
            <motion.svg
              class="absolute -bottom-1 left-0 w-full h-1.5 text-brand-orange overflow-visible"
              viewBox="0 0 100 8"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M0 4 Q 50 8 100 4"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                :initial="{ pathLength: 0 }"
                :while-in-view="{ pathLength: 1 }"
                :viewport="{ once: true }"
                :transition="{ duration: 0.8, delay: 0.3, ease: standardEase }"
              />
            </motion.svg>
          </span>
          that work.
        </h2>

        <!-- Interactive Terminal Component -->
        <SkillTerminal
          :categories="categories"
          :active-id="activeCategoryId"
          @select="handleCategorySelect"
        />

        <!-- Pure SVG Dynamic Radar Component -->
        <SkillRadar
          :categories="categories"
          :active-id="activeCategoryId"
          @select="handleCategorySelect"
        />
      </div>

      <!-- RIGHT COLUMN: Active Modules Grid -->
      <div class="lg:col-span-7 flex flex-col">
        
        <!-- Modules Grid Header & Counter -->
        <div class="flex items-center justify-between pb-4 mb-6 border-b border-gray-200/50 dark:border-gray-800/80 font-mono">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
            <span class="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Active Category: <strong class="text-gray-900 dark:text-white">{{ activeCategory.label }}</strong>
            </span>
          </div>

          <!-- Module Count with Rolling Transition -->
          <div class="flex items-center text-xs text-brand-orange font-semibold">
            <AnimatePresence mode="wait">
              <motion.span
                :key="activeCategory.id"
                :initial="{ y: 10, opacity: 0 }"
                :animate="{ y: 0, opacity: 1 }"
                :exit="{ y: -10, opacity: 0 }"
                :transition="{ duration: 0.2 }"
              >
                {{ activeCategory.skills.length }}
              </motion.span>
            </AnimatePresence>
            <span class="ml-1 text-gray-400 dark:text-gray-500">modules</span>
          </div>
        </div>

        <!-- Cards Container with AnimatePresence popLayout -->
        <div class="min-h-[300px]">
          <AnimatePresence mode="popLayout">
            <motion.div
              :key="activeCategory.id"
              :initial="{ opacity: 0, y: 16, filter: 'blur(4px)' }"
              :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
              :exit="{ opacity: 0, y: -16, filter: 'blur(4px)' }"
              :transition="{ duration: 0.4, ease: standardEase }"
              class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
            >
              <!-- Module Card Item -->
              <SkillModule
                v-for="(skill, index) in activeCategory.skills"
                :key="skill.name"
                :skill="skill"
                :index="index"
              />

              <!-- Empty State Fallback -->
              <div
                v-if="activeCategory.skills.length === 0"
                class="col-span-full py-16 text-center rounded-xl border border-dashed border-gray-300 dark:border-gray-800 text-gray-400 dark:text-gray-500 font-mono text-xs"
              >
                // no modules loaded in this directory yet
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <!-- Currently Learning Strip at the Bottom -->
        <div
          v-if="skillsData.learning && skillsData.learning.length > 0"
          class="mt-10 p-4 rounded-xl border border-gray-200/60 dark:border-gray-800/80 bg-white/60 dark:bg-brand-dark-surface/60 backdrop-blur-md flex flex-wrap items-center gap-3 font-mono text-xs"
        >
          <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <span class="w-2 h-2 rounded-full bg-brand-orange animate-ping"></span>
            <span>Currently learning:</span>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <span
              v-for="item in skillsData.learning"
              :key="item"
              class="px-2.5 py-1 rounded-md bg-brand-orange/10 dark:bg-brand-orange/15 border border-brand-orange/30 text-brand-orange font-medium text-[11px]"
            >
              {{ item }}
            </span>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>
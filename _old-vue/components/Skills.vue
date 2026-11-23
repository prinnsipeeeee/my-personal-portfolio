<script setup>
import { ref, computed } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { skillsData } from '../data/skills'
import SkillTabs from './SkillTabs.vue'
import SkillRow from './SkillRow.vue'
import { blurWordReveal, skillRowStagger, standardEase } from '../lib/motion'

const categories = skillsData.categories
const activeCategoryId = ref(categories[0]?.id || '')

const activeCategory = computed(() => {
  return categories.find((c) => c.id === activeCategoryId.value) || categories[0] || {
    id: 'empty',
    label: '',
    description: '',
    skills: [],
  }
})

const handleCategorySelect = (id) => {
  activeCategoryId.value = id
}

const headlineWords = [
  { text: 'Tools', accent: false },
  { text: 'I', accent: false },
  { text: 'use', accent: false },
  { text: 'to', accent: false },
  { text: 'build', accent: false },
  { text: 'things', accent: true },
  { text: 'that', accent: false },
  { text: 'work.', accent: false },
]
</script>

<template>
  <section
    id="skills"
    class="relative py-24 sm:py-28 md:py-36 scroll-mt-20 focus:outline-none"
  >
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

      <div class="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
        <div class="flex items-center gap-2">
          <span class="font-mono text-xs sm:text-sm text-gray-400 dark:text-gray-400 tracking-wider">
            // skills
          </span>
          <span class="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
        </div>

        <h2 class="font-serif-accent italic text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-white leading-[1.2] tracking-tight">
          <motion.span
            v-for="(word, index) in headlineWords"
            :key="word.text"
            :variants="blurWordReveal"
            initial="hidden"
            while-in-view="visible"
            :viewport="{ once: true }"
            :transition="{ delay: index * 0.06 }"
            :class="[
              'inline-block mr-[0.28em]',
              word.accent ? 'text-brand-orange font-normal not-italic sm:italic' : '',
            ]"
          >
            {{ word.text }}
          </motion.span>
        </h2>

        <p class="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-sans leading-relaxed max-w-sm">
          A short index of the stack I reach for when building, checking, and shipping web work.
        </p>

        <SkillTabs
          :categories="categories"
          :active-id="activeCategoryId"
          @select="handleCategorySelect"
        />
      </div>

      <div class="lg:col-span-8 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            :key="activeCategory.id"
            :id="`skill-panel-${activeCategory.id}`"
            role="tabpanel"
            :aria-labelledby="`skill-tab-${activeCategory.id}`"
            :initial="{ opacity: 0, y: 8 }"
            :animate="{ opacity: 1, y: 0 }"
            :exit="{ opacity: 0, y: -8 }"
            :transition="{ duration: 0.2, ease: standardEase }"
          >
            <div class="mb-6">
              <h3 class="font-display text-2xl sm:text-3xl text-gray-900 dark:text-white tracking-tight">
                {{ activeCategory.label }}
              </h3>
              <p
                v-if="activeCategory.description"
                class="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400 font-sans leading-relaxed"
              >
                {{ activeCategory.description }}
              </p>
            </div>

            <motion.div
              :variants="skillRowStagger"
              initial="hidden"
              while-in-view="visible"
              :viewport="{ once: true, amount: 0.15 }"
              class="min-h-[280px] grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8 max-sm:[&>*:last-child]:border-b-0 sm:[&>*:nth-last-child(-n+2)]:border-b-0"
            >
              <SkillRow
                v-for="skill in activeCategory.skills"
                :key="skill.name"
                :skill="skill"
              />

              <p
                v-if="!activeCategory.skills.length"
                class="col-span-full py-16 text-sm text-gray-400 dark:text-gray-500 font-sans"
              >
                nothing here yet
              </p>
            </motion.div>

            <div class="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11px] font-mono text-gray-400 dark:text-gray-500">
              <span class="inline-flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-brand-orange" aria-hidden="true" />
                Core — used often
              </span>
              <span class="inline-flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full border border-gray-400/70 dark:border-gray-500" aria-hidden="true" />
                Familiar — comfortable with
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        <div
          v-if="skillsData.learning?.length"
          class="mt-12 pt-8 border-t border-gray-200/70 dark:border-white/[0.08]"
        >
          <div class="flex flex-wrap items-baseline gap-x-3 gap-y-2">
            <span class="inline-flex items-center gap-2 font-serif-accent italic text-lg text-gray-900 dark:text-white">
              <span class="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span class="absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-60 animate-pulse"></span>
                <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-orange"></span>
              </span>
              Currently learning
            </span>
            <p class="text-sm text-gray-500 dark:text-gray-400 font-sans">
              <template v-for="(item, index) in skillsData.learning" :key="item">
                <span>{{ item }}</span>
                <span v-if="index < skillsData.learning.length - 1" class="mx-2 text-gray-300 dark:text-gray-600">/</span>
              </template>
            </p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

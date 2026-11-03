<script setup>
import { ref, computed } from 'vue'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion-v'
import { experienceData } from '../data/experience'
import ExperienceTabs from './ExperienceTabs.vue'
import TimelineItem from './TimelineItem.vue'
import { standardEase } from '../lib/motion'

const sectionRef = ref(null)

// Compute available tabs dynamically (hide empty tabs)
const tabs = computed(() => {
  const list = []
  if (experienceData.experience && experienceData.experience.length > 0) {
    list.push({ id: 'experience', label: 'Experience', count: experienceData.experience.length })
  }
  if (experienceData.education && experienceData.education.length > 0) {
    list.push({ id: 'education', label: 'Education', count: experienceData.education.length })
  }
  if (experienceData.certifications && experienceData.certifications.length > 0) {
    list.push({ id: 'certifications', label: 'Certifications', count: experienceData.certifications.length })
  }
  return list
})

const activeTab = ref(tabs.value[0]?.id || 'experience')

const activeItems = computed(() => {
  return experienceData[activeTab.value] || []
})

// Scroll progress for vertical timeline line fill
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ['start center', 'end center'],
})
const timelineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])
</script>

<template>
  <section
    id="experience"
    ref="sectionRef"
    class="relative py-24 sm:py-28 md:py-36 scroll-mt-20 focus:outline-none"
  >
    <!-- Section Eyebrow Label -->
    <div class="mb-12 flex items-center gap-2">
      <span class="font-mono text-xs sm:text-sm text-gray-500 dark:text-gray-400 tracking-wider">
        // experience
      </span>
      <span class="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
    </div>

    <!-- 12-Column Responsive Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
      
      <!-- LEFT COLUMN: Sticky Headline & Text Tabs (col-span-4) -->
      <div class="lg:col-span-4 flex flex-col space-y-6 lg:sticky lg:top-28">
        <!-- Headline in Instrument Serif Italic with Accent Word -->
        <h2 class="font-serif-accent italic text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-white leading-[1.2] tracking-tight">
          Where I've worked and what I've
          <span class="text-brand-orange font-normal not-italic sm:italic">
            learned
          </span>.
        </h2>

        <p class="font-sans text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          My academic foundation, software testing trainings, and hands-on developer roles.
        </p>

        <!-- Tabs Switcher (Hidden if only 1 tab) -->
        <ExperienceTabs
          v-if="tabs.length > 1"
          :tabs="tabs"
          :active-tab="activeTab"
          @select="(id) => activeTab = id"
          class="pt-2"
        />
      </div>

      <!-- RIGHT COLUMN: Vertical Timeline (col-span-8) -->
      <div
        :id="`panel-${activeTab}`"
        role="tabpanel"
        :aria-labelledby="`tab-${activeTab}`"
        class="lg:col-span-8 relative pt-2"
      >
        <!-- Background Static Hairline -->
        <div class="absolute left-0 top-3 bottom-0 w-px bg-gray-200 dark:bg-gray-800" />

        <!-- Scroll-Linked Progress Line -->
        <motion.div
          :style="{ scaleY: timelineScaleY }"
          class="absolute left-0 top-3 bottom-0 w-px bg-brand-orange origin-top pointer-events-none"
        />

        <!-- Items with Stagger and Tab Transition -->
        <AnimatePresence mode="wait">
          <motion.div
            :key="activeTab"
            :initial="{ opacity: 0, y: 12 }"
            :animate="{ opacity: 1, y: 0 }"
            :exit="{ opacity: 0, y: -12 }"
            :transition="{ duration: 0.25, ease: standardEase }"
          >
            <!-- Normal Items -->
            <template v-if="activeItems.length > 0">
              <TimelineItem
                v-for="(item, index) in activeItems"
                :key="item.id"
                :item="item"
                :type="activeTab"
                :default-open="index === 0"
              />
            </template>

            <!-- Clean Empty State -->
            <div
              v-else
              class="pl-8 py-12 text-sm font-mono text-gray-400 dark:text-gray-500"
            >
              // Open to my first role
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  </section>
</template>
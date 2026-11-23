<script setup>
import { ref } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { formatPeriodDate, calculateDuration } from '../data/experience'
import { standardEase } from '../lib/motion'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  type: {
    type: String, // 'experience', 'education', o 'certifications'
    required: true,
  },
  defaultOpen: {
    type: Boolean,
    default: false,
  },
})

const isExpanded = ref(props.defaultOpen)
const isCurrent = props.item.end === null

const hasDetails = Boolean(
  (props.item.highlights && props.item.highlights.length > 0) ||
  (props.item.tech && props.item.tech.length > 0) ||
  props.item.note
)

const toggleExpand = () => {
  if (hasDetails) {
    isExpanded.value = !isExpanded.value
  }
}
</script>

<template>
  <div class="relative pl-7 sm:pl-9 pb-12 last:pb-2 group">
    <!-- Timeline Dot -->
    <div
      class="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full transition-colors duration-200"
      :class="[
        isCurrent
          ? 'bg-brand-orange ring-4 ring-brand-orange/20 animate-pulse'
          : 'bg-white dark:bg-brand-dark border-2 border-gray-300 dark:border-gray-700 group-hover:border-brand-orange'
      ]"
    />

    <!-- Header Block -->
    <div class="flex flex-col space-y-1">
      <!-- Period / Year (JetBrains Mono) -->
      <span class="font-mono text-xs text-gray-400 dark:text-gray-500 tracking-wider">
        <template v-if="type === 'experience'">
          {{ formatPeriodDate(item.start) }} — {{ formatPeriodDate(item.end) }}
        </template>
        <template v-else-if="type === 'education'">
          {{ formatPeriodDate(item.start) }} — {{ formatPeriodDate(item.end) }}
        </template>
        <template v-else>
          {{ item.year }}
        </template>
      </span>

      <!-- Role / Degree / Name (Space Grotesk) -->
      <h3
        @click="toggleExpand"
        class="font-display text-lg sm:text-xl font-bold text-gray-900 dark:text-white transition-colors duration-150 cursor-pointer hover:text-brand-orange inline-block"
      >
        {{ item.role || item.degree || item.name }}
      </h3>

      <!-- Company / School / Issuer + Meta (Inter) -->
      <div class="font-sans text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex flex-wrap items-center gap-x-2">
        <span class="font-medium text-gray-700 dark:text-gray-300">
          {{ item.company || item.school || item.issuer }}
        </span>

        <template v-if="item.location">
          <span>·</span>
          <span>{{ item.location }}</span>
        </template>

        <template v-if="item.type">
          <span>·</span>
          <span>{{ item.type }}</span>
        </template>

        <template v-if="item.start">
          <span>·</span>
          <span class="font-mono text-xs">{{ calculateDuration(item.start, item.end) }}</span>
        </template>
      </div>

      <!-- Education Note (kung may note at walang details button) -->
      <p
        v-if="type === 'education' && item.note && !item.highlights"
        class="font-sans text-xs text-gray-400 dark:text-gray-500 pt-1"
      >
        {{ item.note }}
      </p>

      <!-- Certification Note -->
      <p
        v-if="type === 'certifications' && item.note"
        class="font-sans text-xs text-gray-400 dark:text-gray-500 pt-1"
      >
        {{ item.note }}
      </p>
    </div>

    <!-- Expand / Collapse Details Button -->
    <div v-if="hasDetails && (item.highlights || item.tech)" class="pt-3">
      <button
        type="button"
        @click="toggleExpand"
        :aria-expanded="isExpanded"
        :aria-controls="`details-${item.id}`"
        class="inline-flex items-center gap-1.5 font-mono text-[11px] text-gray-400 dark:text-gray-500 hover:text-brand-orange dark:hover:text-brand-orange transition-colors focus-visible:ring-1 focus-visible:ring-brand-orange rounded focus:outline-none"
      >
        <span>{{ isExpanded ? 'Hide details' : 'Details' }}</span>
        <svg
          class="w-3 h-3 transition-transform duration-200"
          :class="{ 'rotate-180': isExpanded }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <!-- Collapsible Section -->
      <AnimatePresence>
        <motion.div
          v-if="isExpanded"
          :id="`details-${item.id}`"
          :initial="{ opacity: 0, height: 0 }"
          :animate="{ opacity: 1, height: 'auto' }"
          :exit="{ opacity: 0, height: 0 }"
          :transition="{ duration: 0.25, ease: standardEase }"
          class="overflow-hidden pt-3 space-y-3"
        >
          <!-- Highlights List -->
          <ul v-if="item.highlights && item.highlights.length > 0" class="space-y-1.5 font-sans text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            <li
              v-for="(point, idx) in item.highlights"
              :key="idx"
              class="flex items-start"
            >
              <span class="text-brand-orange mr-2 select-none">›</span>
              <span>{{ point }}</span>
            </li>
          </ul>

          <!-- Tech Stack (Separated by dot, no chips) -->
          <div v-if="item.tech && item.tech.length > 0" class="pt-1 font-mono text-xs text-gray-400 dark:text-gray-500">
            <span class="text-gray-500 dark:text-gray-400 font-semibold mr-1">Tech:</span>
            <span>{{ item.tech.slice(0, 6).join(' · ') }}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>

    <!-- Hairline Divider -->
    <div class="mt-8 border-b border-gray-100 dark:border-gray-800/60" />
  </div>
</template>
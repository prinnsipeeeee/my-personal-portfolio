<script setup>
import { computed } from 'vue'
import { motion } from 'motion-v'
import { skillRowItem } from '../lib/motion'

const props = defineProps({
  skill: {
    type: Object,
    required: true,
  },
})

const initials = computed(() => {
  const name = props.skill?.name || ''
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase() || '?'
})

const isCore = computed(() => props.skill.tier === 'core')
</script>

<template>
  <motion.div
    :variants="skillRowItem"
    :title="skill.name"
    class="group flex items-start gap-3 py-4 px-2 -mx-2 rounded-sm border-b border-gray-200/70 dark:border-white/[0.08] transition-colors duration-200 hover:bg-gray-900/[0.03] dark:hover:bg-white/[0.03]"
  >
    <div
      class="mt-0.5 w-6 h-6 shrink-0 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:text-brand-orange transition-colors duration-200"
      aria-hidden="true"
    >
      <svg
        v-if="skill.icon"
        class="w-5 h-5 fill-current"
        viewBox="0 0 24 24"
      >
        <path :d="skill.icon.path" />
      </svg>
      <span v-else class="font-mono text-[10px] font-medium tracking-tight">
        {{ initials }}
      </span>
    </div>

    <div class="min-w-0 flex-1">
      <div class="flex items-start justify-between gap-3">
        <h4
          class="font-display text-[15px] sm:text-base text-gray-900 dark:text-white truncate transition-transform duration-200 group-hover:translate-x-0.5"
        >
          {{ skill.name }}
        </h4>

        <span class="shrink-0 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wide text-gray-400 dark:text-gray-500 mt-1">
          <span
            :class="[
              'w-1.5 h-1.5 rounded-full',
              isCore
                ? 'bg-brand-orange'
                : 'border border-gray-400/70 dark:border-gray-500 bg-transparent',
            ]"
            aria-hidden="true"
          />
          {{ isCore ? 'Core' : 'Familiar' }}
        </span>
      </div>

      <p
        v-if="skill.note"
        class="mt-0.5 text-sm text-gray-500 dark:text-gray-400 leading-snug line-clamp-2"
      >
        {{ skill.note }}
      </p>
    </div>
  </motion.div>
</template>

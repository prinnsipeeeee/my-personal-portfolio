<script setup>
import { motion } from 'motion-v'
import { springTransition } from '../lib/motion'

defineProps({
  social: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <motion.a
    :href="social.url"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="`Visit ${social.name} profile (${social.handle})`"
    :while-hover="{ x: 4 }"
    :transition="springTransition"
    class="group flex items-center justify-between py-3.5 border-b border-gray-100 dark:border-gray-800/60 text-sm transition-colors focus-visible:ring-1 focus-visible:ring-brand-orange rounded-sm focus:outline-none"
  >
    <!-- Left: Icon & Label -->
    <div class="flex items-center gap-3">
      <div class="w-5 h-5 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:text-brand-orange transition-colors">
        <svg
          v-if="social.icon"
          class="w-4 h-4 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path :d="social.icon.path" />
        </svg>
        <span v-else class="font-mono text-xs font-bold">↗</span>
      </div>

      <span class="font-sans font-medium text-gray-800 dark:text-gray-200 group-hover:text-brand-orange transition-colors">
        {{ social.name }}
      </span>

      <span class="font-mono text-xs text-gray-400 dark:text-gray-500">
        {{ social.handle }}
      </span>
    </div>

    <!-- Right: Diagonal Arrow with Hover Glide -->
    <div class="text-gray-400 dark:text-gray-500 group-hover:text-brand-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7V17" />
      </svg>
    </div>
  </motion.a>
</template>
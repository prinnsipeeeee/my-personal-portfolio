<script setup>
import { motion } from 'motion-v'
import { springTransition } from '../lib/motion'

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  activeTab: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['select'])

const handleKeyDown = (e) => {
  const currentIndex = props.tabs.findIndex((t) => t.id === props.activeTab)
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    e.preventDefault()
    const next = (currentIndex + 1) % props.tabs.length
    emit('select', props.tabs[next].id)
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    e.preventDefault()
    const prev = (currentIndex - 1 + props.tabs.length) % props.tabs.length
    emit('select', props.tabs[prev].id)
  }
}
</script>

<template>
  <div
    role="tablist"
    aria-label="Experience and education sections"
    @keydown="handleKeyDown"
    class="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none focus:outline-none"
    tabindex="0"
  >
    <button
      v-for="tab in tabs"
      :key="tab.id"
      :id="`tab-${tab.id}`"
      role="tab"
      :aria-selected="tab.id === activeTab"
      :aria-controls="`panel-${tab.id}`"
      @click="emit('select', tab.id)"
      class="relative px-3.5 py-2 text-left text-xs font-mono tracking-wide rounded-md transition-colors duration-150 flex items-center justify-between gap-3 whitespace-nowrap focus-visible:ring-1 focus-visible:ring-brand-orange focus:outline-none group"
    >
      <!-- Desktop Active Left Vertical Line Indicator -->
      <motion.span
        v-if="tab.id === activeTab"
        layout-id="exp-active-indicator"
        :transition="springTransition"
        class="hidden lg:block absolute left-0 top-1 bottom-1 w-[2px] bg-brand-orange rounded-full"
      />

      <!-- Mobile Active Underline Indicator -->
      <motion.span
        v-if="tab.id === activeTab"
        layout-id="exp-active-underline"
        :transition="springTransition"
        class="block lg:hidden absolute bottom-0 left-2 right-2 h-[2px] bg-brand-orange rounded-full"
      />

      <span
        :class="[
          'transition-colors',
          tab.id === activeTab
            ? 'text-brand-dark dark:text-white font-semibold'
            : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
        ]"
      >
        {{ tab.label }}
      </span>

      <!-- Count Badge -->
      <span
        :class="[
          'text-[10px] px-1.5 py-0.2 rounded transition-colors',
          tab.id === activeTab
            ? 'text-brand-orange'
            : 'text-gray-400 dark:text-gray-500'
        ]"
      >
        {{ tab.count }}
      </span>
    </button>
  </div>
</template>
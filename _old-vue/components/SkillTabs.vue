<script setup>
import { computed, nextTick } from 'vue'
import { motion } from 'motion-v'
import { springTransition } from '../lib/motion'

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
  activeId: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['select'])

const activeIndex = computed(() =>
  props.categories.findIndex((cat) => cat.id === props.activeId)
)

const selectByIndex = (index) => {
  const last = props.categories.length - 1
  if (last < 0) return
  const next = Math.min(Math.max(index, 0), last)
  const id = props.categories[next].id
  emit('select', id)
  nextTick(() => {
    document.getElementById(`skill-tab-${id}`)?.focus()
  })
}

const handleKeyDown = (event) => {
  const index = activeIndex.value < 0 ? 0 : activeIndex.value

  if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
    event.preventDefault()
    selectByIndex(index + 1)
  } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
    event.preventDefault()
    selectByIndex(index - 1)
  } else if (event.key === 'Home') {
    event.preventDefault()
    selectByIndex(0)
  } else if (event.key === 'End') {
    event.preventDefault()
    selectByIndex(props.categories.length - 1)
  }
}
</script>

<template>
  <div
    role="tablist"
    aria-label="Skill categories"
    class="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0 scrollbar-none -mx-1 px-1"
    @keydown="handleKeyDown"
  >
    <button
      v-for="cat in categories"
      :id="`skill-tab-${cat.id}`"
      :key="cat.id"
      type="button"
      role="tab"
      :aria-selected="cat.id === activeId"
      :aria-controls="`skill-panel-${cat.id}`"
      :tabindex="cat.id === activeId ? 0 : -1"
      @click="emit('select', cat.id)"
      class="group relative shrink-0 px-3 py-2.5 lg:px-3 lg:pl-4 text-left transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-brand-dark rounded-sm"
    >
      <motion.span
        v-if="cat.id === activeId"
        layout-id="skill-tab-indicator"
        :transition="springTransition"
        class="pointer-events-none absolute left-3 right-3 bottom-0 h-px bg-brand-orange lg:left-0 lg:right-auto lg:top-2 lg:bottom-2 lg:h-auto lg:w-px"
      />

      <span class="flex items-baseline justify-between gap-6">
        <span
          :class="[
            'font-sans text-sm whitespace-nowrap transition-[color,transform] duration-200',
            cat.id === activeId
              ? 'text-gray-900 dark:text-white'
              : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-200 group-hover:translate-x-0.5',
          ]"
        >
          {{ cat.label }}
        </span>
        <span class="font-mono text-[11px] tabular-nums text-gray-400 dark:text-gray-500">
          {{ cat.skills.length }}
        </span>
      </span>
    </button>
  </div>
</template>

<style scoped>
.scrollbar-none {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
</style>

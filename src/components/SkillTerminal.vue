<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
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

// Typewriter state for CLI terminal
const displayedCommand = ref('')
const activeCategory = ref(props.categories.find(c => c.id === props.activeId) || props.categories[0])
let typeTimer = null

const typeCommand = (text) => {
  if (typeTimer) clearInterval(typeTimer)
  displayedCommand.value = ''
  let idx = 0
  typeTimer = setInterval(() => {
    if (idx < text.length) {
      displayedCommand.value += text[idx]
      idx++
    } else {
      clearInterval(typeTimer)
      typeTimer = null
    }
  }, 35)
}

watch(
  () => props.activeId,
  (newId) => {
    const found = props.categories.find(c => c.id === newId)
    if (found) {
      activeCategory.value = found
      typeCommand(`$ ${found.command}`)
    }
  },
  { immediate: true }
)

const handleKeyDown = (e) => {
  const currentIndex = props.categories.findIndex(c => c.id === props.activeId)
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    e.preventDefault()
    const next = (currentIndex + 1) % props.categories.length
    emit('select', props.categories[next].id)
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    e.preventDefault()
    const prev = (currentIndex - 1 + props.categories.length) % props.categories.length
    emit('select', props.categories[prev].id)
  }
}

onUnmounted(() => {
  if (typeTimer) clearInterval(typeTimer)
})
</script>

<template>
  <div
    class="w-full rounded-2xl border border-gray-200/60 dark:border-gray-800/80 bg-white/70 dark:bg-brand-dark-surface/75 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20 overflow-hidden font-mono"
    tabindex="0"
    role="tablist"
    aria-label="Skill categories selector"
    @keydown="handleKeyDown"
  >
    <!-- Terminal Titlebar -->
    <div class="px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-800/80 flex items-center justify-between bg-gray-100/60 dark:bg-brand-dark/60 select-none">
      <div class="flex items-center space-x-2">
        <span class="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
        <span class="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
        <span class="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
      </div>
      <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">stack.sh</span>
      <div class="w-10"></div>
    </div>

    <!-- Terminal Body / Interactive Shell -->
    <div class="p-4 sm:p-5 space-y-4">
      <!-- Command Typing Output -->
      <div class="min-h-[44px]">
        <div class="text-xs sm:text-sm text-gray-800 dark:text-gray-200 flex items-center flex-wrap">
          <span class="text-brand-orange font-bold mr-2">&gt;</span>
          <span>{{ displayedCommand }}</span>
          <span class="inline-block w-2 h-4 bg-brand-orange ml-1 animate-cursor-blink"></span>
        </div>
        <div class="text-[11px] sm:text-xs text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
          <span>{{ activeCategory.skills.length }} modules loaded</span>
        </div>
      </div>

      <!-- Categories Directory List (role="tablist") -->
      <div class="pt-2 border-t border-gray-100 dark:border-gray-800/60">
        <div class="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
          // directory: select category
        </div>

        <!-- Desktop / Tablet Vertical Stack & Mobile Horizontal Scroll -->
        <div class="flex flex-row sm:flex-col gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            v-for="cat in categories"
            :key="cat.id"
            type="button"
            role="tab"
            :aria-selected="cat.id === activeId"
            @click="emit('select', cat.id)"
            class="relative px-3 py-2 rounded-lg text-left text-xs whitespace-nowrap transition-colors duration-200 focus:outline-none flex items-center justify-between group"
          >
            <!-- Active Moving Highlight Pill -->
            <motion.span
              v-if="cat.id === activeId"
              layout-id="terminal-active-cat"
              :transition="springTransition"
              class="absolute inset-0 bg-brand-orange/15 dark:bg-brand-orange/20 border border-brand-orange/40 rounded-lg -z-10"
            />

            <span
              :class="[
                'flex items-center gap-2 font-medium tracking-wide transition-colors',
                cat.id === activeId
                  ? 'text-brand-orange font-semibold'
                  : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
              ]"
            >
              <span class="text-brand-orange text-xs" v-if="cat.id === activeId">&gt;</span>
              <span class="opacity-40" v-else>•</span>
              {{ cat.label }}
            </span>

            <span
              :class="[
                'ml-2 text-[10px] px-1.5 py-0.5 rounded transition-colors',
                cat.id === activeId
                  ? 'bg-brand-orange/20 text-brand-orange'
                  : 'bg-gray-200/50 dark:bg-gray-800/80 text-gray-500'
              ]"
            >
              {{ cat.skills.length }}
            </span>
          </button>
        </div>
      </div>

      <!-- Category Description Comment -->
      <div class="text-[11px] text-gray-500 dark:text-gray-400 italic pt-1 border-t border-gray-100 dark:border-gray-800/60 truncate">
        // {{ activeCategory.description }}
      </div>
    </div>
  </div>
</template>
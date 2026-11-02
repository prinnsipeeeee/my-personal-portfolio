<script setup>
import { ref } from 'vue'
import { motion } from 'motion-v'
import { getLevelLabel } from '../data/skills'
import { springTransition } from '../lib/motion'

const props = defineProps({
  skill: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    default: 0,
  },
})

// Numbering formatted as MOD_01, MOD_02
const moduleCode = `MOD_${String(props.index + 1).padStart(2, '0')}`

// Fallback initials if no icon provided
const initials = props.skill.name.substring(0, 2).toUpperCase()

// Spotlight mouse tracking state
const cardRef = ref(null)
const mouseX = ref(0)
const mouseY = ref(0)
const isHovered = ref(false)

const handleMouseMove = (e) => {
  if (!cardRef.value || window.matchMedia('(pointer: coarse)').matches) return
  const rect = cardRef.value.getBoundingClientRect()
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
}
</script>

<template>
  <motion.div
    ref="cardRef"
    @mousemove="handleMouseMove"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    :while-hover="{ y: -4, scale: 1.01 }"
    :while-tap="{ scale: 0.98 }"
    :transition="springTransition"
    class="relative rounded-xl p-4 sm:p-5 border border-gray-200/80 dark:border-gray-800/80 bg-white/80 dark:bg-brand-dark-surface/80 backdrop-blur-md overflow-hidden group select-none transition-shadow hover:shadow-lg hover:shadow-brand-orange/5"
    :title="skill.name"
  >
    <!-- Spotlight Orange Radial Glow (CSS Variables) -->
    <div
      v-if="isHovered"
      class="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300 opacity-100"
      :style="{
        background: `radial-gradient(160px circle at ${mouseX}px ${mouseY}px, rgba(247, 127, 0, 0.15), transparent 70%)`
      }"
    />

    <!-- Corner Brackets (HUD Tech Accents: ⌜ ⌝ ⌞ ⌟) -->
    <div class="pointer-events-none absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-gray-400/30 dark:border-gray-600/40 group-hover:border-brand-orange group-hover:scale-110 transition-all duration-300"></div>
    <div class="pointer-events-none absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-gray-400/30 dark:border-gray-600/40 group-hover:border-brand-orange group-hover:scale-110 transition-all duration-300"></div>
    <div class="pointer-events-none absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-gray-400/30 dark:border-gray-600/40 group-hover:border-brand-orange group-hover:scale-110 transition-all duration-300"></div>
    <div class="pointer-events-none absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-gray-400/30 dark:border-gray-600/40 group-hover:border-brand-orange group-hover:scale-110 transition-all duration-300"></div>

    <!-- Header Row: Module Code & Icon -->
    <div class="flex items-center justify-between mb-3">
      <span class="font-mono text-[10px] tracking-wider text-gray-600 dark:text-gray-400 font-semibold">
        {{ moduleCode }}
      </span>

      <!-- Skill Icon or Initials Badge -->
      <div class="w-7 h-7 rounded-lg flex items-center justify-center p-1 bg-gray-100 dark:bg-brand-dark text-slate-700 dark:text-slate-200 group-hover:text-brand-orange group-hover:bg-brand-orange/10 transition-colors">
        <svg
          v-if="skill.icon"
          class="w-4 h-4 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path :d="skill.icon.path" />
        </svg>
        <span v-else class="font-mono font-bold text-xs tracking-tighter">
          {{ initials }}
        </span>
      </div>
    </div>

    <!-- Skill Name (Space Grotesk, truncate with title) -->
    <h3 class="font-display font-bold text-base text-gray-900 dark:text-white truncate group-hover:text-brand-orange transition-colors">
      {{ skill.name }}
    </h3>

    <!-- Level Bar: 5 Segment Indicators -->
    <div class="mt-3.5 space-y-1.5">
      <div class="flex items-center justify-between text-[11px] font-mono">
        <span class="text-gray-400 dark:text-gray-500">LEVEL</span>
        <span class="font-medium text-brand-orange">{{ getLevelLabel(skill.level) }}</span>
      </div>

      <div class="grid grid-cols-5 gap-1 h-1.5">
        <div
          v-for="seg in 5"
          :key="seg"
          :class="[
            'rounded-full transition-all duration-300',
            seg <= skill.level
              ? 'bg-brand-orange shadow-[0_0_6px_rgba(247,127,0,0.5)]'
              : 'bg-gray-200 dark:bg-gray-800'
          ]"
        />
      </div>
    </div>

    <!-- Note Description (Optional, max 2 lines) -->
    <p
      v-if="skill.note"
      class="mt-3 text-xs font-sans text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed"
    >
      {{ skill.note }}
    </p>
  </motion.div>
</template>
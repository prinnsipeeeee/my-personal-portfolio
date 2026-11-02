<script setup>
import { computed } from 'vue'
import { motion } from 'motion-v'

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

// Don't render radar if less than 3 categories
const isVisible = computed(() => props.categories.length >= 3 && props.categories.length <= 8)

// Radar Geometry Configuration
const size = 260
const center = size / 2
const radius = 85
const totalCategories = computed(() => props.categories.length)
const angleStep = computed(() => (Math.PI * 2) / totalCategories.value)

// Average level computation per category (scaled to 0-1)
const categoryStats = computed(() => {
  return props.categories.map((cat, i) => {
    const angle = i * angleStep.value - Math.PI / 2
    const totalLevel = cat.skills.reduce((acc, s) => acc + (s.level || 3), 0)
    const avgLevel = cat.skills.length > 0 ? totalLevel / cat.skills.length : 3
    const normalized = avgLevel / 5 // 1 to 5 scale

    // Value coordinates
    const valX = center + radius * normalized * Math.cos(angle)
    const valY = center + radius * normalized * Math.sin(angle)

    // Axis outer coordinates
    const axisX = center + radius * Math.cos(angle)
    const axisY = center + radius * Math.sin(angle)

    // Label coordinates
    const labelX = center + (radius + 24) * Math.cos(angle)
    const labelY = center + (radius + 24) * Math.sin(angle)

    return {
      id: cat.id,
      label: cat.label,
      avgLevel: avgLevel.toFixed(1),
      valX,
      valY,
      axisX,
      axisY,
      labelX,
      labelY,
      isActive: cat.id === props.activeId,
    }
  })
})

// SVG Polygon Points String
const polygonPoints = computed(() => {
  return categoryStats.value.map(s => `${s.valX},${s.valY}`).join(' ')
})

// Background concentric rings
const rings = [0.25, 0.5, 0.75, 1.0]
</script>

<template>
  <div
    v-if="isVisible"
    class="w-full rounded-2xl border border-gray-200/60 dark:border-gray-800/80 bg-white/70 dark:bg-brand-dark-surface/75 backdrop-blur-xl p-5 shadow-lg shadow-black/5 dark:shadow-black/20 font-mono select-none"
  >
    <div class="flex items-center justify-between mb-2">
      <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">// skill-radar</span>
      <span class="text-[10px] text-brand-orange uppercase">avg prof: 1-5</span>
    </div>

    <!-- SVG Radar Canvas -->
    <div class="flex justify-center items-center">
      <svg :width="size" :height="size" class="overflow-visible">
        <!-- Concentric Guideline Rings -->
        <circle
          v-for="r in rings"
          :key="r"
          :cx="center"
          :cy="center"
          :r="radius * r"
          class="stroke-gray-200 dark:stroke-gray-800 fill-none"
          stroke-width="1"
          stroke-dasharray="3 3"
        />

        <!-- Category Axis Lines -->
        <line
          v-for="stat in categoryStats"
          :key="stat.id"
          :x1="center"
          :y1="center"
          :x2="stat.axisX"
          :y2="stat.axisY"
          :class="[
            'transition-colors duration-300',
            stat.isActive ? 'stroke-brand-orange' : 'stroke-gray-200 dark:stroke-gray-800'
          ]"
          :stroke-width="stat.isActive ? 2 : 1"
        />

        <!-- Radar Filled Polygon with Scale Reveal -->
        <motion.polygon
          :points="polygonPoints"
          :initial="{ scale: 0, opacity: 0 }"
          :while-in-view="{ scale: 1, opacity: 1 }"
          :viewport="{ once: true }"
          :transition="{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }"
          class="fill-brand-orange/20 stroke-brand-orange stroke-2"
          style="transform-origin: center;"
        />

        <!-- Interactive Category Radar Nodes & Labels -->
        <g
          v-for="stat in categoryStats"
          :key="`node-${stat.id}`"
          @click="emit('select', stat.id)"
          class="cursor-pointer group"
        >
          <!-- Vertex Point -->
          <circle
            :cx="stat.valX"
            :cy="stat.valY"
            r="4.5"
            :class="[
              'transition-all duration-300',
              stat.isActive
                ? 'fill-brand-orange stroke-white dark:stroke-brand-dark stroke-2 shadow-[0_0_8px_rgba(247,127,0,0.8)]'
                : 'fill-gray-400 dark:fill-gray-600'
            ]"
          />

          <!-- Category Label (Clickable) -->
          <text
            :x="stat.labelX"
            :y="stat.labelY"
            text-anchor="middle"
            dominant-baseline="central"
            :class="[
              'text-[10px] font-mono transition-colors duration-200',
              stat.isActive
                ? 'fill-brand-orange font-bold'
                : 'fill-gray-500 hover:fill-brand-orange'
            ]"
          >
            {{ stat.label }}
          </text>
        </g>
      </svg>
    </div>
  </div>
</template>
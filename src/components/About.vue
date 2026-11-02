<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
  useTransform
} from 'motion-v'
import {
  directionalSlideVariants,
  kenBurnsZoom,
  signatureReveal,
  standardEase,
  springTransition
} from '../lib/motion'

/**
 * Section Reference for Scoped Scroll Tracking
 */
const sectionRef = ref(null)
const isInView = useInView(sectionRef, { amount: 0.2 })

/**
 * Gallery Items with Captions
 */
const photos = [
  {
    src: '/assets/photo-1.png',
    alt: 'Prince Peñaflor building web projects',
    caption: '// focus & coding',
  },
  {
    src: '/assets/photo-2.jpg',
    alt: 'Prince Peñaflor desk and setup',
    caption: '// workspace environment',
  },
  {
    src: '/assets/photo-3.png',
    alt: 'Prince Peñaflor developer portrait',
    caption: '// behind the craft',
  },
]

/**
 * Narrative Paragraphs
 */
const narrativeParagraphs = [
  {
    before: 'I specialize in bridging design vision with performant engineering. As a developer, my focus is delivering ',
    accent: 'thoughtful digital products',
    after: ' that never compromise on speed, accessibility, or visual precision.',
  },
  {
    before: 'Whether architecting single-page web applications or refining fluid component interfaces, I treat every project with a ',
    accent: 'craftsman mindset',
    after: '—focusing on minimalist design, clean maintainable code, and seamless client interactions.',
  },
  {
    before: 'When I am not in front of my code editor, I spend my time exploring modern web standards, fine-tuning user interactions, and ',
    accent: 'learning evolving tools',
    after: ' to keep every build modern and future-proof.',
  },
]

/**
 * Carousel Reactive State & Direction Tracking
 */
const currentIndex = ref(0)
const direction = ref(1) // 1 = forward (right-to-left), -1 = backward (left-to-right)
const isPaused = ref(false)
const totalPhotos = computed(() => photos.length)

// Stacked Peek Card index
const nextIndex = computed(() => (currentIndex.value + 1) % totalPhotos.value)

let timer = null
const progressKey = ref(0)

const startAutoplay = () => {
  stopAutoplay()
  if (totalPhotos.value <= 1) return
  progressKey.value++
  timer = setInterval(() => {
    if (!isPaused.value && isInView.value && document.visibilityState === 'visible') {
      nextPhoto()
    }
  }, 5000)
}

const stopAutoplay = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const nextPhoto = () => {
  direction.value = 1
  currentIndex.value = (currentIndex.value + 1) % totalPhotos.value
  progressKey.value++
}

const prevPhoto = () => {
  direction.value = -1
  currentIndex.value = (currentIndex.value - 1 + totalPhotos.value) % totalPhotos.value
  progressKey.value++
}

const setPhoto = (index) => {
  if (index === currentIndex.value) return
  direction.value = index > currentIndex.value ? 1 : -1
  currentIndex.value = index
  progressKey.value++
}

/**
 * Drag swipe threshold calculation
 */
const handleDragEnd = (event, info) => {
  const swipeThreshold = 45
  const velocityThreshold = 400
  if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
    nextPhoto()
  } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
    prevPhoto()
  }
}

/**
 * Desktop 3D Tilt Interaction
 */
const mouseX = useMotionValue(0)
const mouseY = useMotionValue(0)
const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 250, damping: 25 })
const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 250, damping: 25 })

const handleMouseMove = (e) => {
  if (window.matchMedia('(pointer: coarse)').matches) return
  const rect = e.currentTarget.getBoundingClientRect()
  mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
  mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
}

const handleMouseLeave = () => {
  isPaused.value = false
  mouseX.set(0)
  mouseY.set(0)
}

const handleVisibilityChange = () => {
  if (document.visibilityState !== 'visible') {
    stopAutoplay()
  } else {
    startAutoplay()
  }
}

onMounted(() => {
  // Preload gallery assets
  photos.forEach((photo) => {
    const img = new Image()
    img.src = photo.src
  })

  startAutoplay()
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onUnmounted(() => {
  stopAutoplay()
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<template>
  <section
    id="about"
    ref="sectionRef"
    tabindex="0"
    @keydown.right="nextPhoto"
    @keydown.left="prevPhoto"
    class="relative py-24 sm:py-28 md:py-36 scroll-mt-20 focus:outline-none"
  >
    <!-- Section Eyebrow Label -->
    <div class="mb-12 flex items-center gap-2">
      <span class="font-mono text-xs sm:text-sm text-gray-400 dark:text-gray-400 tracking-wider">
        // about me
      </span>
      <span class="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
    </div>

    <!-- 2-Column Responsive Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      
      <!-- LEFT COLUMN: Framed Photo Carousel -->
      <div class="lg:col-span-5 flex justify-center w-full">
        <div
          class="relative w-full max-w-sm sm:max-w-md aspect-[4/5] [perspective:1000px] select-none"
          @mouseenter="isPaused = true"
          @mousemove="handleMouseMove"
          @mouseleave="handleMouseLeave"
        >

          <!-- 3. Main Framed Card with Spring Tilt -->
          <motion.div
            :style="{ rotateX: tiltX, rotateY: tiltY }"
            class="relative w-full h-full rounded-2xl overflow-hidden p-[1.5px] bg-gradient-to-br from-brand-orange/80 via-gray-300/40 dark:via-gray-700/40 to-brand-dark dark:to-blue-600 shadow-2xl shadow-black/10 dark:shadow-brand-orange/10 [transform-style:preserve-3d]"
          >
            <div class="relative w-full h-full rounded-[14px] overflow-hidden bg-white dark:bg-brand-dark-surface">
              
              <!-- Draggable Image Surface with Directional Slide & Ken Burns Zoom -->
              <motion.div
                drag="x"
                :drag-constraints="{ left: 0, right: 0 }"
                drag-elastic="0.2"
                @dragend="handleDragEnd"
                class="w-full h-full cursor-grab active:cursor-grabbing relative overflow-hidden"
              >
                <AnimatePresence :custom="direction" mode="wait">
                  <motion.div
                    :key="photos[currentIndex].src"
                    :custom="direction"
                    :variants="directionalSlideVariants"
                    initial="enter"
                    animate="center"
                    exit="exit"
                    class="absolute inset-0 w-full h-full overflow-hidden"
                  >
                    <!-- Ken Burns slow zoom container -->
                    <motion.img
                      :src="photos[currentIndex].src"
                      :alt="photos[currentIndex].alt"
                      :animate="kenBurnsZoom"
                      class="w-full h-full object-cover select-none pointer-events-none origin-center"
                      @error="(e) => e.target.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <!-- Dark Gradient Bottom Shade for Readability -->
              <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

              <!-- Rolling Counter Pill (Top-Right) -->
              <div class="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white font-mono text-[11px] tracking-widest flex items-center overflow-hidden h-6">
                <span class="overflow-hidden inline-block h-4 leading-4">
                  <AnimatePresence mode="wait">
                    <motion.span
                      :key="currentIndex"
                      :initial="{ y: 12, opacity: 0 }"
                      :animate="{ y: 0, opacity: 1 }"
                      :exit="{ y: -12, opacity: 0 }"
                      :transition="{ duration: 0.25 }"
                      class="inline-block"
                    >
                      {{ String(currentIndex + 1).padStart(2, '0') }}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span class="mx-1 text-white/50">/</span>
                <span>{{ String(totalPhotos).padStart(2, '0') }}</span>
              </div>

              <!-- Animated Caption Pill (Bottom-Left) -->
              <div
                class="absolute bottom-4 left-4 max-w-[55%] overflow-hidden pointer-events-none"
                aria-live="polite"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    :key="photos[currentIndex].caption"
                    :initial="{ y: 14, opacity: 0 }"
                    :animate="{ y: 0, opacity: 1 }"
                    :exit="{ y: -14, opacity: 0 }"
                    :transition="{ duration: 0.35, ease: standardEase }"
                    class="inline-block font-mono text-xs text-white/90 drop-shadow-sm font-medium tracking-wide truncate"
                  >
                    {{ photos[currentIndex].caption }}
                  </motion.span>
                </AnimatePresence>
              </div>

              <!-- Magnetic Prev / Next Arrow Buttons -->
              <div
                v-if="totalPhotos > 1"
                class="absolute inset-y-0 inset-x-3 flex items-center justify-between pointer-events-none"
              >
                <motion.button
                  type="button"
                  @click.stop="prevPhoto"
                  aria-label="Previous photograph"
                  :while-hover="{ scale: 1.1, x: -2 }"
                  :while-tap="{ scale: 0.9 }"
                  class="pointer-events-auto p-2 rounded-full bg-black/40 hover:bg-brand-orange text-white backdrop-blur-md transition-colors opacity-95 lg:opacity-0 lg:group-hover:opacity-100 focus:opacity-100 focus:outline-none"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>

                <motion.button
                  type="button"
                  @click.stop="nextPhoto"
                  aria-label="Next photograph"
                  :while-hover="{ scale: 1.1, x: 2 }"
                  :while-tap="{ scale: 0.9 }"
                  class="pointer-events-auto p-2 rounded-full bg-black/40 hover:bg-brand-orange text-white backdrop-blur-md transition-colors opacity-95 lg:opacity-0 lg:group-hover:opacity-100 focus:opacity-100 focus:outline-none"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>

              <!-- Bottom Indicator Dots with Autoplay Fill Progress -->
              <div
                v-if="totalPhotos > 1"
                class="absolute bottom-4 right-4 flex items-center gap-1.5 z-10"
              >
                <button
                  v-for="(photo, index) in photos"
                  :key="index"
                  type="button"
                  :aria-label="`Navigate to photo ${index + 1}`"
                  @click.stop="setPhoto(index)"
                  class="relative h-1.5 rounded-full overflow-hidden transition-all duration-300 focus:outline-none"
                  :class="currentIndex === index ? 'w-8 bg-white/30' : 'w-2 bg-white/40 hover:bg-white'"
                >
                  <span
                    v-if="currentIndex === index"
                    :key="progressKey"
                    class="absolute inset-0 bg-brand-orange rounded-full animate-[progressFill_5s_linear_forwards]"
                    :style="{ animationPlayState: isPaused ? 'paused' : 'running' }"
                  />
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      </div>

      <!-- RIGHT COLUMN: Narrative Description & Strict Left Alignment -->
      <div class="lg:col-span-7 flex flex-col justify-center text-left">
        
        <!-- Clean Complete Headline (Strict Left Align) -->
        <h2 class="font-serif-accent italic text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-gray-900 dark:text-white leading-[1.18] tracking-tight mb-8">
          Turning ideas into
          <span class="relative inline-block text-brand-orange font-normal not-italic sm:italic mx-1.5">
            clean, fast,
            <!-- Animated Drawing Underline -->
            <motion.svg
              class="absolute -bottom-1 left-0 w-full h-2 text-brand-orange overflow-visible"
              viewBox="0 0 100 12"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M0 6 Q 50 12 100 6"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                :initial="{ pathLength: 0 }"
                :while-in-view="{ pathLength: 1 }"
                :viewport="{ once: true }"
                :transition="{ duration: 0.9, delay: 0.35, ease: standardEase }"
              />
            </motion.svg>
          </span>
          and thoughtful web experiences.
        </h2>

        <!-- Narrative Paragraphs -->
        <div class="space-y-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-sans leading-relaxed mb-10">
          <motion.p
            v-for="(para, idx) in narrativeParagraphs"
            :key="idx"
            :initial="{ opacity: 0.3, y: 12 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :viewport="{ once: true, amount: 0.5 }"
            :transition="{ duration: 0.6, ease: standardEase }"
          >
            {{ para.before }}
            <span class="relative inline-block font-serif-accent italic text-lg sm:text-xl text-gray-900 dark:text-white font-medium">
              {{ para.accent }}
              <!-- Subtle accent underline -->
              <motion.span
                :initial="{ width: '0%' }"
                :while-in-view="{ width: '100%' }"
                :viewport="{ once: true }"
                :transition="{ duration: 0.8, delay: 0.25, ease: standardEase }"
                class="absolute bottom-0 left-0 h-[1.5px] bg-brand-orange/60 rounded-full"
              />
            </span>
            {{ para.after }}
          </motion.p>
        </div>

        <!-- Strict Left-Aligned Signature Block (No rotation, perfectly flush) -->
        <div class="pt-2 flex flex-col items-start text-left">
          <!-- 48px Drawing Orange Accent Line -->
          <motion.div
            :initial="{ width: 0, opacity: 0 }"
            :while-in-view="{ width: '48px', opacity: 1 }"
            :viewport="{ once: true }"
            :transition="{ duration: 0.7, ease: standardEase }"
            class="h-[2px] bg-brand-orange rounded-full mb-3"
          />

          <!-- Straight Signature with -ml-1 Left-Bearing Compensation -->
          <motion.div
            :variants="signatureReveal"
            initial="hidden"
            while-in-view="visible"
            :viewport="{ once: true }"
            class="-ml-1 inline-block leading-none"
          >
            <span class="font-script text-4xl sm:text-5xl text-brand-orange select-none inline-block leading-none">
              Prince Peñaflor
            </span>
          </motion.div>

          <!-- Matching Left-Aligned Tagline -->
          <span class="font-mono text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mt-2.5">
            // DEVELOPER & DESIGNER
          </span>
        </div>

      </div>

    </div>
  </section>
</template>

<style scoped>
@keyframes progressFill {
  from { width: 0%; }
  to { width: 100%; }
}
</style>
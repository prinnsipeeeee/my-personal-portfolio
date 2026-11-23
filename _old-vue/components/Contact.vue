<script setup>
import { ref } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { contactData } from '../data/contact'
import ContactRow from './ContactRow.vue'
import { springTransition, standardEase, blurWordReveal } from '../lib/motion'

const isCopied = ref(false)

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(contactData.email)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2200)
  } catch {
    // Fallback kung blocked ang clipboard API
    const el = document.createElement('textarea')
    el.value = contactData.email
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2200)
  }
}

// Bumubuo ng encoded mailto: URL mula sa project type template
const buildMailto = (item) => {
  const subject = encodeURIComponent(item.subject)
  const body = encodeURIComponent(item.body)
  return `mailto:${contactData.email}?subject=${subject}&body=${body}`
}
</script>

<template>
  <section
    id="contact"
    class="relative py-24 sm:py-28 md:py-36 scroll-mt-20 focus:outline-none"
  >
    <!-- Section Eyebrow Label -->
    <div class="mb-12 flex items-center gap-2">
      <span class="font-mono text-xs sm:text-sm text-gray-500 dark:text-gray-400 tracking-wider">
        // contact
      </span>
      <span class="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
    </div>

    <!-- 12-Column Responsive Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      
      <!-- LEFT COLUMN (col-span-5, sticky on desktop) -->
      <div class="lg:col-span-5 flex flex-col space-y-7 lg:sticky lg:top-28">
        
        <!-- Headline in Instrument Serif Italic -->
        <h2 class="font-serif-accent italic text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-white leading-[1.2] tracking-tight">
          Let's build something
          <span class="text-brand-orange font-normal not-italic sm:italic">
            together
          </span>.
        </h2>

        <p class="font-sans text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          Whether you need a full website, a dedicated component, or technical testing support, I am always ready to collaborate.
        </p>

        <!-- Availability Status Indicator -->
        <div class="flex items-center gap-2.5 font-mono text-xs pt-1">
          <span class="relative flex h-2 w-2">
            <span
              v-if="contactData.availability.open"
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
            />
            <span
              :class="[
                'relative inline-flex rounded-full h-2 w-2',
                contactData.availability.open ? 'bg-emerald-500' : 'bg-gray-400'
              ]"
            />
          </span>
          <span :class="contactData.availability.open ? 'text-emerald-700 dark:text-emerald-400 font-medium' : 'text-gray-400'">
            {{ contactData.availability.open ? contactData.availability.label : contactData.availability.closedLabel }}
          </span>
        </div>

        <!-- Response Time Note -->
        <div class="font-mono text-xs text-gray-400 dark:text-gray-500">
          {{ contactData.responseTime }}
        </div>

        <!-- Helpful to Include Checklist -->
        <div v-if="contactData.checklist && contactData.checklist.length > 0" class="pt-4 border-t border-gray-100 dark:border-gray-800/60">
          <span class="font-mono text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-3">
            // helpful to include in your message
          </span>
          <ul class="space-y-2 font-sans text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <li
              v-for="(item, idx) in contactData.checklist"
              :key="idx"
              class="flex items-center gap-2.5"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-brand-orange/80 flex-shrink-0" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- RIGHT COLUMN (col-span-7, separated by hairlines) -->
      <div class="lg:col-span-7 flex flex-col divide-y divide-gray-100 dark:divide-gray-800/70">
        
        <!-- SECTION 1: Start a Project (Pills with Mailto Templates) -->
        <div class="pb-10">
          <span class="font-mono text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-4">
            // 01 — start a project
          </span>

          <div class="flex flex-wrap gap-2.5 mb-3">
            <motion.a
              v-for="item in contactData.projectTypes"
              :key="item.id"
              :href="buildMailto(item)"
              :while-hover="{ y: -2, scale: 1.02 }"
              :while-tap="{ scale: 0.98 }"
              :transition="springTransition"
              class="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 text-xs font-mono text-gray-700 dark:text-gray-300 hover:border-brand-orange hover:text-brand-orange transition-colors focus-visible:ring-1 focus-visible:ring-brand-orange focus:outline-none"
            >
              {{ item.label }} ↗
            </motion.a>
          </div>

          <span class="font-mono text-[11px] text-gray-400 dark:text-gray-500">
            Opens your email app with a pre-filled template.
          </span>
        </div>

        <!-- SECTION 2: Email Directly (Large Text + Copy/Open Controls) -->
        <div class="py-10">
          <span class="font-mono text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-4">
            // 02 — email me directly
          </span>

          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <!-- Email Anchor with Drawing Underline on Hover -->
            <a
              :href="`mailto:${contactData.email}`"
              class="group relative font-display font-bold text-xl sm:text-2xl text-gray-900 dark:text-white hover:text-brand-orange transition-colors inline-block focus:outline-none"
            >
              <span>{{ contactData.email }}</span>
              <span class="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-orange group-hover:w-full transition-all duration-300 rounded-full" />
            </a>

            <!-- Action Controls (Copy & Open) -->
            <div class="flex items-center gap-3 font-mono text-xs">
              <!-- Copy Button with AnimatePresence Status -->
              <button
                type="button"
                @click="copyEmail"
                aria-live="polite"
                aria-label="Copy email address"
                class="px-3 py-1.5 rounded-md border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-brand-orange hover:text-brand-orange transition-colors flex items-center gap-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-orange"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    v-if="isCopied"
                    key="copied"
                    :initial="{ opacity: 0, scale: 0.85 }"
                    :animate="{ opacity: 1, scale: 1 }"
                    :exit="{ opacity: 0, scale: 0.85 }"
                    class="text-emerald-500 flex items-center gap-1 font-medium"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Copied</span>
                  </motion.span>

                  <motion.span
                    v-else
                    key="copy"
                    :initial="{ opacity: 0 }"
                    :animate="{ opacity: 1 }"
                    :exit="{ opacity: 0 }"
                  >
                    Copy
                  </motion.span>
                </AnimatePresence>
              </button>

              <!-- Direct Mailto Open Link -->
              <a
                :href="`mailto:${contactData.email}`"
                class="px-3 py-1.5 rounded-md border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-brand-orange hover:text-brand-orange transition-colors flex items-center gap-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-orange"
              >
                <span>Open</span>
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- SECTION 3: Find Me On (Social Link Rows) -->
        <div v-if="contactData.socials && contactData.socials.length > 0" class="py-10">
          <span class="font-mono text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-4">
            // 03 — find me on
          </span>

          <div class="flex flex-col">
            <ContactRow
              v-for="social in contactData.socials"
              :key="social.name"
              :social="social"
            />
          </div>
        </div>

        <!-- SECTION 4: Location & Timezone Footer Line -->
        <div class="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs text-gray-400 dark:text-gray-500">
          <span>{{ contactData.location }}</span>
          <span>{{ contactData.timezone }}</span>
        </div>

      </div>

    </div>
  </section>
</template>
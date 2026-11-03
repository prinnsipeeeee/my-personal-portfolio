<script setup>
import { MotionConfig } from 'motion-v'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Skills from './components/Skills.vue'
import Projects from './components/Projects.vue'
import Experience from './components/Experience.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <MotionConfig reduced-motion="user">
    <div class="relative min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-500 overflow-x-hidden font-sans">
      
      <!-- Global Ambient Gradient Layer -->
      <div class="bg-site-ambient"></div>

      <!-- Global Subtle SVG Grain Texture Layer -->
      <div class="bg-site-grain"></div>

      <!-- Motion Sticky Navbar -->
      <Navbar />

      <!-- Main Content Flow -->
      <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Hero Section -->
        <Hero />

        <!-- About Section -->
        <About />

        <!-- Skills Section -->
        <Skills />

        <!-- Projects Section -->
        <Projects />

        <!-- Experience & Education Section -->
        <Experience />

        <!-- Contact Section -->
        <Contact />
      </main>

      <!-- Bold Modern Footer -->
      <Footer />

    </div>
  </MotionConfig>
</template>
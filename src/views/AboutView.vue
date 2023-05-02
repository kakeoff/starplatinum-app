<script setup>
import AboutMe from "../components/AboutMe.vue";
</script>

<template>
  <section>
    <div v-motion-slide-visible-once-left>
      <AboutMe />
    </div>
  </section>
</template>

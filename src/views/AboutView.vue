<script setup>
import AboutMe from "../components/AboutMe.vue";
</script>

<template>
  <section class="about about-section">
    <h2 class="category-heading">О нашей компании</h2>

    <div v-motion-pop>
      <AboutMe />
    </div>
  </section>
</template>

<script setup>
import ContactMe from "../components/ContactMe.vue";
</script>

<template>
  <section class="contact contact-section">
    <h2 class="category-heading">Contact me</h2>

    <div class="contact-container" v-motion-pop>
      <ContactMe />
    </div>
  </section>
</template>

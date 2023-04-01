<script setup>
import ApplicationsComponent from "../components/ApplicationsComponent.vue";
</script>

<template>
  <section class="about applications-section">
    <h2 class="category-heading mx-auto">Заявки</h2>

    <div class="w-full" v-motion-pop>
      <ApplicationsComponent />
    </div>
  </section>
</template>

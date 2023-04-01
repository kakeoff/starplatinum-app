<script setup>
import LoginComponent from "../components/LoginComponent.vue";
</script>

<template>
  <main class="home home-section" v-motion-pop>
    <div class="flex flex-col items-center justify-center">
      <h2 class="category-heading my-[30px]">Авторизация</h2>
      <LoginComponent />
    </div>
  </main>
</template>

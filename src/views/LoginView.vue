<template>
  <main class="home home-section" v-motion-pop>
    <div class="flex flex-col items-center justify-center">
      <h2 class="category-heading my-[30px]">Авторизация</h2>
      <LoginComponent />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginComponent from "../components/LoginComponent.vue";

export default defineComponent({
  components: {
    LoginComponent,
  },
  mounted() {},
});
</script>

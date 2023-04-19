<template>
  <img
    v-motion-pop
    class="absolute h-[500px] right-[0px] bottom-0"
    src="../assets/jotarooo.png"
    alt=""
  />
  <main class="home home-section" v-motion-pop>
    <div class="-mt-36 text-center">
      <h1 class="text-4xl font-bold">
        <strong class="text-5xl text-gradient font-heading">
          <span v-for="(char, index) in animatedText" :key="index">{{
            char
          }}</span>
        </strong>
      </h1>
      <p class="text-2xl">
        Рекламное агенство
        <strong class="text-gradient font-heading">номер 1</strong> в России
      </p>
    </div>
    <RouterLink to="/form" class="cta-btn text-[20px] mt-8 mb-2">
      Создать заявку
    </RouterLink>
    <RouterLink
      to="/publications"
      style="transition: all 0.3s ease-in-out"
      class="dark:hover:text-slate-300 hover:text-black hover:underline"
    >
      Посмотреть издания
    </RouterLink>
  </main>
</template>

<script setup>
import { ref } from "vue";

const text = "STAR PLATINUM";
const animatedText = ref("");

setInterval(() => {
  if (animatedText.value.length < text.length) {
    animatedText.value += text[animatedText.value.length];
  }
}, 100);
</script>

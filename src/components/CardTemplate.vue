<script setup>
import { onMounted } from "vue";
import { pubsStore } from "../stores/publications";
const storePubs = pubsStore();
onMounted(() => {
  storePubs.getAllPublications();
});
</script>

<template>
  <el-carousel
    class="mt-[50px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[32px]"
    trigger="click"
    height="300px"
    width="1000px"
  >
    <el-carousel-item
      class="text-white text-center flex flex-col items-center"
      v-for="pub in storePubs.publications"
      :key="pub.id"
    >
      <div class="font-[700] text-[50px] w-full">{{ pub.name }}</div>
      <div class="w-[85%]">{{ pub.description }}</div>
      <a :href="pub.link" target="_blank" class="font-mono mt-[10px]">
        <font-awesome-icon icon="fa-solid fa-link"></font-awesome-icon>
        Перейти на сайт
      </a>
      <p class="my-3 text-[25px] font-heading tracking-wide">
        Цена: {{ pub.cost }} рублей
      </p>
    </el-carousel-item>
  </el-carousel>
</template>

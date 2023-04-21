<script setup>
import { onMounted } from "vue";
import { pubsStore } from "../stores/publications";
const storePubs = pubsStore();
onMounted(() => {
  storePubs.getAllPublications();
});
</script>

<template>
  <div
    v-for="pub in storePubs.publications"
    :key="pub.id"
    class="publications-card"
    v-motion-pop
  >
    <h2 class="publications-card-heading">{{ pub.name }}</h2>

    <div class="my-5">
      <p class="my-3 tracking-wide">{{ pub.description }}</p>
      <p class="my-3 text-gradient font-heading tracking-wide">
        Цена: {{ pub.cost }} рублей
      </p>
    </div>

    <a :href="pub.link" target="_blank" class="cta-btn font-mono">
      <font-awesome-icon icon="fa-solid fa-link"></font-awesome-icon>
      Перейти на сайт
    </a>
  </div>
</template>

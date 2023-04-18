<script setup>
import { cardStore } from "../stores/cards";
const getCards = cardStore();
</script>

<template>
  <div
    v-for="card in getCards.cards"
    :key="card.name"
    class="publications-card"
    v-motion-pop
  >
    <h2 class="publications-card-heading">{{ card.name }}</h2>

    <div class="my-5">
      <p class="my-3 tracking-wide">{{ card.description }}</p>
      <p class="my-3 text-gradient font-heading tracking-wide">
        Цена: {{ card.cost }} рублей
      </p>

      <a
        :href="`${card.prefix}${card.appLink}`"
        class="app-link font-mono my-3"
      >
        <font-awesome-icon
          v-if="card.appLink"
          icon="fa-solid fa-link"
        ></font-awesome-icon>
        {{ card.appLink }}
      </a>
    </div>

    <a :href="card.link" target="_blank" class="cta-btn font-mono">
      <font-awesome-icon icon="fa-solid fa-link"></font-awesome-icon>
      Перейти на сайт
    </a>
  </div>
</template>

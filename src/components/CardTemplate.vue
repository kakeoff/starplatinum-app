<script setup>
import { cardStore } from "../stores/cards";
const getCards = cardStore();
</script>

<template>
  <!-- This code generate a collection of cards 
  retrieving data from the sotre using o for loop on it -->
  <div
    v-for="card in getCards.cards"
    :key="card.name"
    class="portfolio-card"
    v-motion-pop
  >
    <h2 class="portfolio-card-heading">{{ card.name }}</h2>

    <div class="my-5">
      <!-- Generates dynamically the preview pictures and attributes -->
      <img
        v-if="card.preview"
        :src="card.preview"
        :title="`${card.name} preview`"
        :alt="`${card.name} preview`"
      />

      <p class="my-3 tracking-wide">{{ card.description }}</p>

      <!-- Generates external links dynamically.
      The 'prefix' key is used to recreate a proper link
      to avoid browser issues -->
      <a
        :href="`${card.prefix}${card.appLink}`"
        class="app-link font-mono my-3"
      >
        <!-- If there's no link for an app in the store, it will 
        not show the link's icon, so it's not confusing in the UI -->
        <font-awesome-icon
          v-if="card.appLink"
          icon="fa-solid fa-link"
        ></font-awesome-icon>
        {{ card.appLink }}
      </a>
    </div>

    <!-- Generates dynamically the link that leads to the project's repository -->
    <a :href="card.repo" class="cta-btn font-mono">
      <font-awesome-icon icon="fa-solid fa-code-branch"></font-awesome-icon>
      Github repository
    </a>
  </div>
</template>

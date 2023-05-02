<template>
  <main v-motion-slide-visible-once-left>
    <!-- Hero -->
    <div class="h-[600px] flex justify-center items-center">
      <div
        class="relative overflow-hidden before:absolute before:top-0 before:left-1/2"
      >
        <div class="max-w-[85rem] mx-auto px-2 sm:px-3 lg:px-4">
          <!-- Announcement Banner -->
          <RouterLink
            to="about"
            class="flex cursor-pointer mt-[3px] hover:scale-105 hover:transition duration-300 mb-5 justify-center"
          >
            <div
              class="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-xs text-gray-600 p-2 px-3 rounded-full transition hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:text-gray-400"
            >
              Кто мы такие?
              <div class="flex flex-row items-center gap-x-1">
                <span
                  class="border-l border-gray-200 text-blue-600 pl-2 dark:text-blue-500"
                  >Узнать</span
                >
                <svg
                  class="w-2.5 h-2.5 mt-[2px] text-blue-600"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
            </div>
          </RouterLink>
          <!-- End Announcement Banner -->

          <!-- Title -->
          <div class="max-w-xl text-center mx-auto">
            <h1
              class="block font-[700] text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-gray-200"
            >
              <span>S</span>
              <span v-for="(char, index) in animatedText" :key="index">{{
                char
              }}</span>
            </h1>
          </div>
          <!-- End Title -->

          <div class="mt-5 max-w-3xl text-center mx-auto">
            <p class="text-lg text-gray-600 dark:text-gray-400">
              Сервис для работы с рекламными изданиями
            </p>
          </div>

          <!-- Buttons -->
          <button
            @click="showForm = true"
            class="mt-8 mb-[3px] grid gap-3 w-full cursor-pointer sm:inline-flex sm:justify-center"
          >
            <div
              class="inline-flex cursor-pointer justify-center hover:scale-105 hover:transition duration-300 items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-4 dark:focus:ring-offset-gray-800"
            >
              Отправить заявку
            </div>
          </button>
          <!-- End Buttons -->
        </div>
      </div>
    </div>
    <!-- End Hero -->
    <FeaturesComponent></FeaturesComponent>
    <!-- Hero -->
    <div class="relative overflow-hidden">
      <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
        <div class="text-center">
          <h1
            class="text-4xl sm:text-6xl font-bold text-gray-800 dark:text-gray-200"
          >
            Рекламные издания
          </h1>

          <p class="mt-3 text-gray-600 dark:text-gray-400">
            Издания, с которыми мы сотрудничаем.
          </p>

          <div class="mt-7 sm:mt-12 mx-auto max-w-xl relative">
            <!-- Form -->
            <form>
              <div
                class="relative z-10 flex hover:scale-105 hover:transition duration-300 space-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-900/[.2]"
              >
                <div class="flex-[1_0_0%]">
                  <label
                    for="hs-search-article-1"
                    class="block text-gray-700 font-medium dark:text-white"
                    ><span class="sr-only">Найти издание</span></label
                  >
                  <input
                    v-model="searchPub"
                    type="text"
                    name="hs-search-article-1"
                    id="hs-search-article-1"
                    class="p-3 block w-full text-[20px] border-transparent focus:outline-none rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-400"
                    placeholder="Найти издание"
                  />
                </div>
              </div>
            </form>
            <!-- End Form -->

            <!-- SVG Element -->
            <div
              class="hidden md:block absolute top-0 right-0 -translate-y-12 translate-x-20"
            >
              <svg
                class="w-16 h-auto text-orange-500"
                width="121"
                height="135"
                viewBox="0 0 121 135"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                  stroke="currentColor"
                  stroke-width="10"
                  stroke-linecap="round"
                />
                <path
                  d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                  stroke="currentColor"
                  stroke-width="10"
                  stroke-linecap="round"
                />
                <path
                  d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                  stroke="currentColor"
                  stroke-width="10"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <!-- End SVG Element -->

            <!-- SVG Element -->
            <div
              class="hidden md:block absolute bottom-0 left-0 translate-y-10 -translate-x-32"
            >
              <svg
                class="w-40 h-auto text-cyan-500"
                width="347"
                height="188"
                viewBox="0 0 347 188"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
                  stroke="currentColor"
                  stroke-width="7"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <!-- End SVG Element -->
          </div>

          <div class="mt-10 sm:mt-20 flex flex-wrap gap-[10px] justify-center">
            <button
              v-for="pub in filteredPubs"
              class="m-1 py-6 px-8 inline-flex hover:scale-105 text-[25px] hover:transition duration-300 justify-center items-center gap-2 rounded-md border font-[700] bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
              @click="selectPub(pub), (showPubModal = true)"
            >
              {{ pub.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- End Hero -->
  </main>
  <el-dialog class="max-w-[600px] min-w-[465px]" v-model="showForm">
    <Form @close="showForm = false"></Form>
  </el-dialog>
  <el-dialog
    class="min-w-[465px]"
    :title="selectedPub.name"
    v-model="showPubModal"
  >
    <h2 class="font-[700]">Описание</h2>
    <span>{{ selectedPub.description }}</span>
    <div class="font-[700] mt-[20px]">Цена: {{ selectedPub.cost }} руб.</div>
    <div class="font-[700] mt-[20px]">
      <a
        :href="selectedPub.link"
        target="_blank"
        class="font-mono nav-link mt-[10px] text-white hover:transition duration-300"
      >
        <font-awesome-icon icon="fa-solid fa-link"></font-awesome-icon>
        <span class="nav-link-extension ml-[5px]">Перейти на сайт</span>
      </a>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import FeaturesComponent from "../components/FeaturesComponent.vue";
import TestimonialsComponent from "../components/TestimonialsComponent.vue";
import Form from "../components/Form.vue";
import { pubsStore } from "../stores/publications";
import { Publication } from "../types/publicationTypes";

const text = "TAR PLATINUM";
const animatedText = ref("");
const storePubs = pubsStore();
const pubs = computed(() => {
  return storePubs.publications;
});
const filteredPubs = computed(() => {
  let filtered = pubs.value;

  if (searchPub.value) {
    const keyword = searchPub.value.toLowerCase().trim();
    filtered = filtered.filter((pub) => {
      return (
        pub.name.toLowerCase().includes(keyword) ||
        pub.description.toLowerCase().includes(keyword) ||
        pub.cost.toString().includes(keyword) ||
        pub.link.toString().includes(keyword)
      );
    });
  }

  return filtered;
});

const searchPub = ref("");
const showPubModal = ref(false);
const showForm = ref(false);
const selectedPub = ref({} as Publication);

const selectPub = (pub: Publication) => {
  selectedPub.value = pub;
};

setInterval(() => {
  if (animatedText.value.length < text.length) {
    animatedText.value += text[animatedText.value.length];
  }
}, 100);
</script>

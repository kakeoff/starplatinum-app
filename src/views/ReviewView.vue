<template>
  <!-- Hero -->
  <div v-motion-fade class="relative py-[10px] overflow-hidden h-full">
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
              class="relative flex hover:scale-105 hover:transition duration-300 space-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-900/[.2]"
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

        <div class="mt-10 sm:mt-20 flex flex-wrap gap-[15px] justify-center">
          <button
            v-for="pub in filteredPubs"
            class="m-1 flex flex-col overflow-hidden max-w-[600px] hover:animate-pulse text-[25px] hover:transition duration-300 justify-center items-center rounded-md border font-[700] bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
            @click="selectPub(pub), (showPubModal = true)"
          >
            <img
              src="https://www.hlp.city/wp-content/uploads/2023/10/denys-nevozhai-2vmT5_FeMck-unsplash-scaled-e1698768382637.jpg"
              alt=""
            />
            <div
              class="h-[60px] flex justify-center items-center break-words truncate"
            >
              {{ pub.name }}
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- End Hero -->
  <el-dialog
    class="min-w-[465px] max-w-[500px]"
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
import { computed, ref } from 'vue'
import { pubsStore } from '../stores/publications'
import { Publication } from '../types/publicationTypes'

const storePubs = pubsStore()
const pubs = computed(() => {
  return storePubs.publications
})
const selectedPub = ref({} as Publication)
const showPubModal = ref(false)
const selectPub = (pub: Publication) => {
  selectedPub.value = pub
}

const filteredPubs = computed(() => {
  let filtered = pubs.value

  if (searchPub.value) {
    const keyword = searchPub.value.toLowerCase().trim()
    filtered = filtered.filter((pub) => {
      return (
        pub.name.toLowerCase().includes(keyword) ||
        pub.description.toLowerCase().includes(keyword) ||
        pub.cost.toString().includes(keyword) ||
        pub.link.toString().includes(keyword)
      )
    })
  }

  return filtered
})

const searchPub = ref('')
</script>

<template>
  <main v-motion-fade class="h-full">
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
            @click="clickShowForm"
            class="mt-8 mb-[3px] grid gap-3 w-full cursor-pointer sm:inline-flex sm:justify-center"
          >
            <div
              class="inline-flex cursor-pointer font-[700] justify-center hover:scale-105 hover:transition duration-300 items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 border border-transparent text-white text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 dark:focus:ring-offset-gray-800"
            >
              СОЗДАТЬ ЗАЯВКУ
            </div>
          </button>
          <!-- End Buttons -->
        </div>
      </div>
    </div>
    <!-- End Hero -->
  </main>
  <el-dialog
    class="max-w-[600px] min-w-[465px]"
    @close="closeDialog"
    v-model="showForm"
  >
    <Form @close="showForm = false"></Form>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import Form from '../components/Form.vue'
import { isAuthenticated } from '../plugins/helpers'
import { useRouter } from 'vue-router'

const router = useRouter()
const text = 'TAR PLATINUM'
const animatedText = ref('')
const showForm = ref(false)
const shouldOpenForm = computed(
  () => !!router.currentRoute.value.query.startForm
)

onMounted(() => {
  if (shouldOpenForm.value) {
    showForm.value = true
  }
})

watch(shouldOpenForm, (val) => {
  if (val) {
    showForm.value = true
  }
})

const closeDialog = () => {
  router.replace({
    name: String(router.currentRoute.value.name)
  })
}

const clickShowForm = () => {
  if (!isAuthenticated()) {
    router.replace({
      name: String(router.currentRoute.value.name),
      query: {
        login: 1
      }
    })
    return
  }
  showForm.value = true
}

setInterval(() => {
  if (animatedText.value.length < text.length) {
    animatedText.value += text[animatedText.value.length]
  }
}, 100)
</script>

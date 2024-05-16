<template>
  <!-- Hero -->
  <div v-motion-fade class="relative py-[10px] overflow-hidden h-full">
    <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
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
              class="relative flex space-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-900/[.2]"
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
            class="hidden md:block absolute bottom-[-20px] left-0 translate-y-10 -translate-x-32"
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
          <el-card
            class="w-[350px] text-[19px] dark:bg-slate-900 border-[1px] hover:bg-slate-800"
            :class="
              checkIsPubInCart(pub.id) ? 'border-green-700' : 'border-gray-700'
            "
            v-for="pub in filteredPubs"
          >
            <img
              v-if="pub.imageUrl"
              :src="pub.imageUrl"
              alt="publication image"
              class="h-[300px] rounded-[4px] border border-gray-700 w-full"
            />
            <div
              v-else
              class="h-[300px] border rounded-[4px] border-gray-700 w-full flex justify-center items-center"
            >
              Нет изображения
            </div>
            <p class="truncate py-[10px]">
              {{ pub.name }}
            </p>
            <el-tag
              size="large"
              type="success"
              class="font-[700] mb-[10px] text-[16px]"
              >{{ pub.cost }} руб/час</el-tag
            >
            <div class="w-full flex flex-col items-center gap-[10px]">
              <div class="flex w-full gap-[5px]">
                <a class="w-[50%]" :href="pub.link"
                  ><el-button class="w-full">
                    <svg
                      class="mr-[5px]"
                      viewBox="0 0 24 24"
                      width="20px"
                      height="20px"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 12C14 14.7614 11.7614 17 9 17H7C4.23858 17 2 14.7614 2 12C2 9.23858 4.23858 7 7 7H7.5M10 12C10 9.23858 12.2386 7 15 7H17C19.7614 7 22 9.23858 22 12C22 14.7614 19.7614 17 17 17H16.5"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                      ></path>
                    </svg>
                    <span>Сайт</span>
                  </el-button></a
                >

                <el-button
                  @click=";(selectedPubId = pub.id), (showPubModal = true)"
                  class="w-[50%]"
                >
                  <svg
                    class="mr-[5px]"
                    fill="currentColor"
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21,2H3A1,1,0,0,0,2,3V21a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V3A1,1,0,0,0,21,2ZM4,4H20V6H4ZM20,20H4V8H20ZM6,12a1,1,0,0,1,1-1H17a1,1,0,0,1,0,2H7A1,1,0,0,1,6,12Zm0,4a1,1,0,0,1,1-1h5a1,1,0,0,1,0,2H7A1,1,0,0,1,6,16Z"
                    ></path>
                  </svg>
                  <span>Описание</span>
                </el-button>
              </div>
              <el-button
                v-if="!checkIsPubInCart(pub.id)"
                @click="clickAddToCart(pub.id)"
                type="success"
                class="w-full"
              >
                <svg
                  class="mr-[5px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                >
                  <path
                    d="M4 12H20M12 4V20"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
                <span>Добавить в корзину</span>
              </el-button>
              <el-button
                @click="removeFromCart(pub.id)"
                class="w-full group"
                type="danger"
                v-else
              >
                <svg
                  class="group-hover:hidden mr-[5px]"
                  viewBox="0 0 24 24"
                  width="20px"
                  height="20px"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12.6111L8.92308 17.5L20 6.5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
                <svg
                  class="hidden group-hover:block mr-[5px] rotate-45"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                >
                  <path
                    d="M4 12H20M12 4V20"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
                <span>Добавлено</span>
              </el-button>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
  <!-- End Hero -->
  <el-dialog
    class="min-w-[465px] max-w-[500px]"
    :title="selectedPub?.name || '???'"
    v-model="showPubModal"
  >
    <h2 class="font-[700]">Описание</h2>
    <span>{{ selectedPub?.description || '???' }}</span>
  </el-dialog>
  <el-dialog
    class="min-w-[465px] max-w-[500px]"
    title="Добавить в корзину"
    @close="closeCartModal"
    v-model="showCartPubModal"
  >
    <h2 class="font-[700] mb-[10px]">Выберите срок размещения</h2>
    <el-date-picker
      type="date"
      value-format="YYYY-MM-DD"
      :editable="false"
      v-model="publicationCartDate"
      placeholder="Выбрать дату"
      :disabledDate="disabledDate"
      style="width: 100%"
    />
    <div>
      <div class="flex gap-[10px] mt-[10px]">
        <el-tag size="large" class="text-[13px]">
          Количество часов:
          {{ dataForCart.hoursCount }}
        </el-tag>
        <el-tag size="large" type="success" class="text-[13px]"
          >Итого: {{ dataForCart.totalPrice }} руб</el-tag
        >
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeCartModal">Отмена</el-button>
        <el-button type="primary" @click="addToCart(publicationCartDate)">
          Добавить
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { pubsStore } from '../stores/publications'
import { userStore } from '@/stores/user'
import { ItemType } from '@/types/userTypes'
import { ElNotification } from 'element-plus'
import { getHoursDifference } from '@/plugins/helpers'
import { useRouter } from 'vue-router'

const router = useRouter()
const storePubs = pubsStore()
const storeUser = userStore()
const pubs = computed(() => {
  return storePubs.publications
})

const dataForCart = computed(() => {
  const hoursCount = publicationCartDate.value.length
    ? getHoursDifference(new Date(), new Date(publicationCartDate.value))
    : 0
  console.log(typeof publicationCartDate.value)

  const totalPrice = selectedPub.value
    ? hoursCount * selectedPub.value?.cost
    : 0
  return {
    hoursCount,
    totalPrice
  }
})
const selectedPubId = ref<number | null>(null)
const showPubModal = ref(false)
const showCartPubModal = ref(false)
const selectedPub = computed(() => {
  return pubs.value.find((pub) => pub.id === selectedPubId.value)
})

const userCartPublications = computed(() => storeUser.userCartPublications)

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
const publicationCartDate = ref('')

const closeCartModal = () => {
  showCartPubModal.value = false
  selectedPubId.value = null
  publicationCartDate.value = ''
}

const clickAddToCart = (pubId: number) => {
  if (!storeUser.user) {
    router.push({
      name: String(router.currentRoute.value.name),
      query: {
        login: 1
      }
    })
    return
  }
  selectedPubId.value = pubId
  showCartPubModal.value = true
}

const checkIsPubInCart = (pubId: number) => {
  return userCartPublications.value.some((item) => item.itemId === pubId)
}

const addToCart = async (date: string) => {
  if (!selectedPubId.value) return
  const data = {
    itemId: selectedPubId.value,
    itemDate: new Date(date).toISOString(),
    type: ItemType.publication
  }
  await storeUser.addToCart(data)
  showCartPubModal.value = false
  selectedPubId.value = null
  ElNotification({
    title: 'Издание добавлено в корзину',
    type: 'success'
  })
  closeCartModal()
}

const removeFromCart = (pubId: number) => {
  const pubsInCart = storeUser.userCartPublications
  const itemToDelete = pubsInCart.find(
    (i) => i.itemId === pubId && i.type === ItemType.publication
  )
  if (!itemToDelete) return
  storeUser.removeFromCart(itemToDelete.id)
}
const disabledDate = (time: Date) => {
  return time.getTime() < Date.now()
}
</script>

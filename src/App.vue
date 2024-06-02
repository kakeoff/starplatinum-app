<template>
  <header class="mainHeader">
    <section class="fixed-nav">
      <div class="lg:hidden absolute right-[15px] top-[15px] z-[11]">
        <button
          @click="isBurgerOpened = !isBurgerOpened"
          type="button"
          class="p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
          aria-controls="navbar-collapse-with-animation"
          aria-label="Toggle navigation"
        >
          <svg
            v-if="!isBurgerOpened"
            class="w-4 h-4"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
          <svg
            v-if="isBurgerOpened"
            class="w-4 h-4"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </button>
      </div>
      <header
        :class="isBurgerOpened ? 'block' : 'hidden'"
        class="lg:flex flex-wrap text-white lg:justify-start justify-end min-h-[60px] lg:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-3 lg:py-0 dark:bg-black/30 backdrop-blur-md dark:border-gray-700"
      >
        <nav
          class="relative w-full lg:flex lg:items-center lg:justify-between"
          aria-label="Global"
        >
          <div class="flex items-center justify-between">
            <RouterLink to="/" class="flex flex-row items-center gap-[2px]">
              <img
                class="hover:transition duration-300 hover:scale-105"
                src="./assets/starplatinumicon.png"
                width="50"
                height="50"
                alt="logo"
              />
              <span
                class="flex-none text-xl font-semibold dark:text-white hover:text-gradient hover:transition duration-300"
                aria-label="Brand"
                >STAR PLATINUM</span
              >
            </RouterLink>
          </div>
          <div
            class="overflow-hidden transition-all duration-300 basis-full grow lg:block"
          >
            <div
              class="flex text-[16px] font-[700] flex-col gap-y-4 gap-x-0 mt-5 lg:flex-row lg:items-center lg:justify-end lg:gap-y-0 lg:gap-x-7 lg:mt-0 lg:pl-7"
            >
              <router-link
                to="/"
                class="nav-link-extension"
                :class="{
                  'text-gradient': $route.name === 'home'
                }"
              >
                Главная
              </router-link>

              <router-link
                to="/review"
                class="nav-link-extension"
                :class="{
                  'text-gradient': $route.name === 'review'
                }"
              >
                Обзор
              </router-link>

              <router-link
                to="/about"
                class="nav-link-extension"
                :class="{
                  'text-gradient': $route.name === 'about'
                }"
              >
                О нас
              </router-link>

              <div v-if="user && user.role !== 0">
                <el-badge :value="storeApplications.applications.length || 0">
                  <router-link
                    to="/admin-applications"
                    class="nav-link-extension"
                    :class="{
                      'text-gradient': $route.name === 'adminApplications'
                    }"
                  >
                    Заявки
                  </router-link>
                </el-badge>
              </div>
              <div v-if="user && user?.role !== 0">
                <router-link
                  to="/admin-publications"
                  class="nav-link-extension"
                  :class="{
                    'text-gradient': $route.name === 'adminPublications'
                  }"
                >
                  Издания
                </router-link>
              </div>

              <div v-if="user && user?.role !== 0">
                <router-link
                  to="/admin-users"
                  class="nav-link-extension"
                  :class="{
                    'text-gradient': $route.name === 'adminUsers'
                  }"
                >
                  Пользователи
                </router-link>
              </div>

              <button
                @click="openLogin()"
                v-if="!user"
                class="inline-flex cursor-pointer font-[700] hover:scale-[0.98] justify-center hover:transition duration-300 items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 border border-transparent text-white text-sm rounded-[6px] focus:outline-none py-[5px] px-[10px]"
              >
                Авторизация
              </button>
              <div
                v-else
                class="lg:border-l sm:border-gray-700 lg:my-6 lg:pl-[30px]"
              >
                <el-dropdown trigger="click">
                  <div class="flex flex-row gap-[10px] items-center">
                    <img
                      class="h-[27px] w-[27px] border-[1px] border-gray-700 rounded-[100%]"
                      :src="user?.avatarUrl"
                      alt="avatar"
                    />
                    <span
                      class="text-[16px] font-[700] nav-link-extension"
                      :class="{
                        'text-gradient': $route.name === 'profile'
                      }"
                    >
                      {{ user?.login }}</span
                    >
                  </div>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item
                        @click="gotoProfile"
                        class="text-[16px] font-[700]"
                      >
                        Профиль
                      </el-dropdown-item>
                      <el-dropdown-item
                        @click="dialogVisible = true"
                        class="text-red-500 text-[16px] font-[700] px-[20px] py-[10px]"
                        >Выйти</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <LoginComponent
        :errors="authErrors"
        :authVisible="authVisible"
        title="Авторизация"
        @close="closeModal()"
        @auth="login"
        v-if="authVisible"
      />
      <RegisterComponent
        :errors="authErrors"
        :authVisible="registerVisible"
        @close="closeModal()"
        @register="register"
        v-if="registerVisible"
      />
      <el-dialog
        v-model="dialogVisible"
        class="w-[20%] min-w-[200px]"
        title="Выход"
      >
        <span class="top-0">Вы уверены, что хотите выйти?</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">Нет</el-button>
            <el-button type="primary" @click="logout()"> Да </el-button>
          </span>
        </template>
      </el-dialog>
    </section>
  </header>
  <RouterView />
  <button
    @click="showCart = true"
    v-if="cartItems.length"
    style="animation-duration: 3s"
    class="fixed bottom-[20px] flex-none right-[20px] animatecss animatecss-infinite animatecss-tada hover:animate-none bg-slate-900 p-[15px] rounded-[100%] text-white hover:scale-[1.1] hover:bg-slate-700 transition duration-200"
  >
    <div class="relative">
      <div
        class="bg-[#f56c6c] text-[11px] font-[700] flex items-center justify-center absolute right-[-10px] top-[-10px] rounded-[100%] h-[15px] w-[15px]"
      >
        {{ cartItems.length }}
      </div>
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    </div>
  </button>
  <el-drawer
    v-model="showCart"
    @close="showCart = false"
    class="text-white min-w-[350px]"
    title="Корзина"
    direction="rtl"
  >
    <div
      class="h-[calc(100%-50px)] pr-[10px] overflow-y-auto w-full flex flex-col gap-[20px]"
    >
      <p>Издания</p>
      <el-card
        class="rounded-[12px] flex-none"
        v-for="item in cartPubs"
        :key="item.id"
      >
        <div class="flex w-full justify-between items-center mb-[20px]">
          <p class="truncate">{{ item.pub?.name || '???' }}</p>
          <button
            class="hover:scale-[1.2] opacity-70 hover:opacity-100 transition duration-200"
            @click="deleteCartItem(item.id)"
          >
            <svg
              fill="red"
              width="15px"
              height="15px"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 408.483 408.483"
            >
              <path
                d="M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316 H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293 c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329 c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355 c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356 c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z"
              ></path>
              <path
                d="M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916 c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z"
              ></path>
            </svg>
          </button>
        </div>
        <div class="w-full flex justify-between">
          <el-tag>{{ item.date }} | {{ item.hoursCount }} часов</el-tag>
          <el-tag type="success">{{ item.totalPrice }} руб</el-tag>
        </div>
      </el-card>
    </div>
    <div class="w-full h-[50px] flex justify-center items-end">
      <router-link to="/?startForm=1">
        <el-button @click="showCart = false" size="large"
          >Перейти к созданию заявки</el-button
        >
      </router-link>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { authStore } from './stores/auth'
import { userStore } from './stores/user'
import { usersStore } from './stores/users'
import { useRouter } from 'vue-router'
import { ref, onMounted, computed, watch, reactive } from 'vue'
import { applicationsStore } from './stores/applications'
import { pubsStore } from './stores/publications'
import { getHoursDifference, isAuthenticated } from './plugins/helpers'

import LoginComponent from './components/LoginComponent.vue'
import RegisterComponent from './components/RegisterComponent.vue'
import { RegisterDto } from './services/dto'

const router = useRouter()
const storeAuth = authStore()
const storeUsers = usersStore()
const storeUser = userStore()
const storeApplications = applicationsStore()
const storePublications = pubsStore()

onMounted(async () => {
  if (isAuthenticated()) {
    await storeUser.getMe()
    await storeUser.getMyCart()
  }
  await loadData()
})

const dialogVisible = ref(false)
const isBurgerOpened = ref(false)
const showCart = ref(false)
const authErrors = ref<string[]>([])
const authVisible = computed(() => !!router.currentRoute.value.query.login)
const registerVisible = computed(
  () => !!router.currentRoute.value.query.register
)
const user = computed(() => storeUser.user)
const isAdmin = computed(() => {
  return user.value && user.value.role === 1
})

const routePath = computed(() => router.currentRoute.value.fullPath)

watch(user, async (newVal, oldVal) => {
  console.log(newVal && !oldVal)
  if (newVal && !oldVal) {
    await loadData()
  }
})

watch(routePath, () => {
  isBurgerOpened.value = false
})

const cartItems = computed(() => storeUser.cartItems)

const cartPubs = computed(() => {
  const items = storeUser.userCartPublications
  return items.flatMap((item) => {
    const hoursCount = item.itemDate
      ? getHoursDifference(new Date(), new Date(item.itemDate))
      : 0
    const pubFromStore = storePublications.publications.find(
      (pub) => pub.id === item.itemId
    )
    if (!pubFromStore) return []
    return {
      id: item.id,
      date: item.itemDate
        ? new Date(item.itemDate).toLocaleDateString().replaceAll('/', '.')
        : undefined,
      pub: pubFromStore,
      hoursCount: hoursCount,
      totalPrice: hoursCount * pubFromStore.cost
    }
  })
})
const gotoProfile = () => {
  router.push('/profile')
}
const loadData = async () => {
  if (isAdmin.value) {
    await storeApplications.getAllApplications()
    await storeUsers.getAllUsers()
  } else if (user.value) {
    await storeUsers.getAllAdmins()
  }
  await storePublications.getAllPublications()
}

const openRegister = () => {
  router.replace({
    name: String(router.currentRoute.value.name),
    query: {
      register: 1
    }
  })
}

const openLogin = () => {
  router.replace({
    name: String(router.currentRoute.value.name),
    query: {
      login: 1
    }
  })
}

const logout = () => {
  storeAuth.logout()
  router.push('/')
  dialogVisible.value = false
}
const closeModal = () => {
  router.replace(router.currentRoute.value.path)
  authErrors.value = []
}
const login = async (login: string, password: string) => {
  try {
    authErrors.value = []
    await storeAuth.login(login, password)
    closeModal()
  } catch (err: any) {
    authErrors.value.push(err.response.data.message || 'Internal error')
    authErrors.value = authErrors.value.flatMap((error) => error)
  }
}
const register = async (data: RegisterDto) => {
  authErrors.value = []
  try {
    await storeAuth.register(data)
    closeModal()
  } catch (err: any) {
    authErrors.value.push(err.response.data.message || 'Internal error')
    authErrors.value = authErrors.value.flatMap((error) => error)
  }
}

const deleteCartItem = (id: number) => {
  storeUser.removeFromCart(id)
}
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.el-dialog__header {
  margin: 0;
  padding: 0;
}
</style>

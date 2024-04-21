<template>
  <header class="mainHeader">
    <section class="fixed-nav">
      <header
        class="flex flex-wrap text-white lg:justify-start lg:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-3 lg:py-0 dark:bg-black/30 backdrop-blur-md dark:border-gray-700"
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

            <div class="lg:hidden">
              <button
                type="button"
                class="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                data-hs-collapse="#navbar-collapse-with-animation"
                aria-controls="navbar-collapse-with-animation"
                aria-label="Toggle navigation"
              >
                <svg
                  class="hs-collapse-open:hidden w-4 h-4"
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
                  class="hs-collapse-open:block hidden w-4 h-4"
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
          </div>
          <div
            id="navbar-collapse-with-animation"
            class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow lg:block"
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

              <div
                v-if="!user"
                class="flex nav-link-extension cursor-pointer items-center sm:border-l sm:border-gray-300 sm:my-6 sm:pl-8 dark:border-gray-700"
                @click="openRegister()"
              >
                Регистрация
              </div>

              <div
                v-if="!user"
                class="flex nav-link-extension cursor-pointer items-center sm:my-6"
                @click="openLogin()"
              >
                Авторизация
              </div>
              <div
                v-else
                class="sm:border-l sm:border-gray-700 sm:my-6 sm:pl-[30px]"
              >
                <el-dropdown trigger="click">
                  <div class="flex flex-row gap-[10px] items-center">
                    <img
                      class="h-[27px] w-[27px] rounded-[100%]"
                      :src="getUserAvatar(user?.avatarUrl)"
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
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { authStore } from './stores/auth'
import { userStore } from './stores/user'
import { usersStore } from './stores/users'
import { useRouter } from 'vue-router'
import { ref, onMounted, computed, watch } from 'vue'
import { applicationsStore } from './stores/applications'
import { pubsStore } from './stores/publications'
import { isAuthenticated } from './plugins/helpers'

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
  }
  await loadData()
})

const dialogVisible = ref(false)
const authErrors = ref([] as string[])
const authVisible = computed(() => !!router.currentRoute.value.query.login)
const registerVisible = computed(
  () => !!router.currentRoute.value.query.register
)
const user = computed(() => storeUser.user)
const isAdmin = computed(() => {
  return user.value && user.value.role === 1
})

watch(user, async (value) => {
  console.log(value)
  if (value) {
    await loadData()
  }
})

const getUserAvatar = (url: string | undefined) => {
  if (!url) return
  return `${import.meta.env.VITE_SERVER_URL}${url}`
}
const gotoProfile = () => {
  router.push('/profile')
}
const loadData = async () => {
  if (isAdmin.value) {
    await storeApplications.getAllApplications()
    await storeUsers.getAllUsers()
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
./js/plugins/helpers

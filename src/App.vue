<template>
  <header class="mainHeader">
    <section class="fixed-nav">
      <header
        class="flex flex-wrap text-white sm:justify-start sm:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-3 sm:py-0 dark:bg-black/30 backdrop-blur-md dark:border-gray-700"
      >
        <nav
          class="relative w-full sm:flex sm:items-center sm:justify-between"
          aria-label="Global"
        >
          <div class="flex items-center justify-between">
            <RouterLink
              to="/"
              v-if="!user"
              class="flex flex-row items-center gap-[2px]"
            >
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
            <RouterLink
              v-else
              class="flex-none text-xl font-semibold dark:text-white hover:text-gradient hover:transition duration-300"
              to="/admin-publications"
              aria-label="Brand"
            >
              ПАНЕЛЬ УПРАВЛЕНИЯ
            </RouterLink>
            <div class="sm:hidden">
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
            class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
          >
            <div
              class="flex font-[700] flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:pl-7"
            >
              <RouterLink
                to="/"
                :class="{
                  'text-cyan-500': this.$route.name === 'home',
                }"
                title="Home"
              >
                <span
                  :class="{
                    'text-gradient': this.$route.name === 'home',
                  }"
                  class="nav-link-extension"
                  >Главная</span
                >
              </RouterLink>
              <RouterLink
                to="/about"
                :class="{
                  'text-cyan-500': this.$route.name === 'about',
                }"
                title="About me"
              >
                <span
                  :class="{
                    'text-gradient': this.$route.name === 'about',
                  }"
                  class="nav-link-extension"
                  >О нас</span
                >
              </RouterLink>

              <RouterLink
                to="/contacts"
                :class="{
                  'text-cyan-500': this.$route.name === 'contacts',
                }"
                title="Contacts"
              >
                <span
                  :class="{
                    'text-gradient': this.$route.name === 'contacts',
                  }"
                  class="nav-link-extension"
                  >Контакты</span
                >
              </RouterLink>

              <div v-if="user">
                <el-badge
                  :value="storeApplications.applications.length || 0"
                  class="item"
                >
                  <RouterLink
                    to="/admin-applications"
                    :class="{
                      'text-cyan-500': this.$route.name === 'adminApplications',
                    }"
                    title="Admin"
                  >
                    <span
                      :class="{
                        'text-gradient':
                          this.$route.name === 'adminApplications',
                      }"
                      class="nav-link-extension"
                      >Заявки</span
                    >
                  </RouterLink>
                </el-badge>
              </div>
              <div v-if="user">
                <el-badge
                  :value="storePublications.publications.length || 0"
                  class="item"
                >
                  <RouterLink
                    to="/admin-publications"
                    :class="{
                      'text-cyan-500': this.$route.name === 'adminPublications',
                    }"
                    title="Admin"
                  >
                    <span
                      :class="{
                        'text-gradient':
                          this.$route.name === 'adminPublications',
                      }"
                      class="nav-link-extension"
                      >Издания</span
                    >
                  </RouterLink>
                </el-badge>
              </div>

              <div
                v-if="!user"
                class="flex nav-link-extension cursor-pointer items-center font-medium text-gray-500 sm:border-l sm:border-gray-300 sm:my-6 sm:pl-8 dark:border-gray-700 dark:text-gray-400"
                @click="registerVisible = true"
              >
                Регистрация
              </div>

              <div
                v-if="!user"
                class="flex nav-link-extension cursor-pointer items-center font-medium text-gray-500 sm:my-6 dark:text-gray-400"
                @click="authVisible = true"
              >
                Авторизация
              </div>
              <div
                v-else
                class="flex nav-link-extension cursor-pointer items-center gap-x-2 font-medium text-gray-500 sm:border-l sm:border-gray-300 sm:my-6 sm:pl-8 dark:border-gray-700 dark:text-gray-400"
                @click="dialogVisible = true"
              >
                <font-awesome-icon icon="fa-solid fa-right-from-bracket">
                </font-awesome-icon>
                Выйти
              </div>
            </div>
          </div>
        </nav>
      </header>
      <LoginComponent
        :authVisible="authVisible"
        title="Авторизация"
        @close="authVisible = false"
        @auth="login"
        v-if="authVisible"
      />
      <LoginComponent
        :authVisible="registerVisible"
        title="Регистрация"
        @close="registerVisible = false"
        @auth="register"
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
  <footer
    v-if="
      $route.name !== 'adminApplications' && $route.name !== 'adminPublications'
    "
    class="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto"
  >
    <!-- Grid -->
    <div class="text-center">
      <div>
        <RouterLink
          class="flex-none text-xl font-semibold hover:text-gradient hover:transition duration-300 text-black dark:text-white"
          to="/"
          aria-label="Brand"
        >
          STAR PLATINUM
        </RouterLink>
      </div>
      <!-- End Col -->

      <div class="mt-3">
        <p class="text-gray-500">
          © Egor Panteleev. 2022 Star Platinum. Все права защищены.
        </p>
      </div>

      <!-- Social Brands -->
      <div class="mt-3 space-x-2">
        <a
          class="inline-flex justify-center items-center w-10 h-10 text-center text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800"
          href="mailto:starplatinumapp@mail.ru"
        >
          <svg
            class="w-3.5 h-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
            />
          </svg>
        </a>
        <a
          class="inline-flex justify-center items-center w-10 h-10 text-center text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800"
          href="https://github.com/kakeoff"
          target="_blank"
        >
          <svg
            class="w-3.5 h-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
            />
          </svg>
        </a>
      </div>
      <!-- End Social Brands -->
    </div>
    <!-- End Grid -->
  </footer>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { authStore } from "./stores/auth";
import { userStore } from "./stores/user";
import { useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { applicationsStore } from "./stores/applications";
import { pubsStore } from "./stores/publications";

import LoginComponent from "./components/LoginComponent.vue";

const router = useRouter();
const storeAuth = authStore();
const storeUser = userStore();
const storeApplications = applicationsStore();
const storePublications = pubsStore();

onMounted(async () => {
  await storeUser.getMe();
  await storeApplications.getAllApplications();
  await storePublications.getAllPublications();
});

const dialogVisible = ref(false);
const authVisible = ref(false);
const registerVisible = ref(false);
const user = computed(() => storeUser.user)

const logout = () => {
  storeAuth.logout();
  router.push("/");
  dialogVisible.value = false;
};
const login = async (login, password) => {
  await storeAuth.login(login, password);
};
const register = async (login, password) => {
  await storeAuth.register(login, password);
};
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

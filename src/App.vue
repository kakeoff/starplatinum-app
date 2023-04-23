<script setup>
import { RouterLink, RouterView } from "vue-router";
import { isAuthenticated } from "./js/helpers";
import { authStore } from "./stores/auth";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { applicationsStore } from "./stores/applications";
import { pubsStore } from "./stores/publications";

import LoginComponent from "./components/LoginComponent.vue";

const router = useRouter();
const storeAuth = authStore();
const storeApplications = applicationsStore();
const storePublications = pubsStore();
const dialogVisible = ref(false);
const authVisible = ref(false);
const logout = () => {
  storeAuth.logout();
  router.push("/");
  dialogVisible.value = false;
};
</script>

<template>
  <header class="mainHeader">
    <!-- The nav <section> is fixed to top, but the <nav> block 
    itself inside is flex sensitive. Also, the 'nav-links-extension' 
    are not displayed in mobile and tablet layout -->
    <section class="fixed-nav">
      <nav class="navbar">
        <div v-if="isAuthenticated()" class="mr-auto nav-link text-cyan-500">
          <font-awesome-icon
            icon="fa-solid fa-user"
            class="-text-gradient"
          ></font-awesome-icon>
          <span class="nav-link-extension text-gradient">Администратор</span>
        </div>
        <RouterLink
          v-if="!isAuthenticated()"
          to="/"
          :class="{
            'text-cyan-500': this.$route.name === 'home',
          }"
          class="nav-link"
          title="Home"
        >
          <font-awesome-icon
            icon="fa-solid fa-house"
            class="-text-gradient"
          ></font-awesome-icon>
          <span
            :class="{
              'text-gradient': this.$route.name === 'home',
            }"
            class="nav-link-extension"
            >Главная</span
          >
        </RouterLink>
        <RouterLink
          v-if="!isAuthenticated()"
          to="/about"
          :class="{
            'text-cyan-500': this.$route.name === 'about',
          }"
          class="nav-link"
          title="About me"
        >
          <font-awesome-icon
            icon="fa-solid fa-circle-question"
          ></font-awesome-icon>
          <span
            :class="{
              'text-gradient': this.$route.name === 'about',
            }"
            class="nav-link-extension"
            >О нас</span
          >
        </RouterLink>

        <el-badge
          v-if="isAuthenticated()"
          :value="storeApplications.applications.length || 0"
          class="item"
        >
          <RouterLink
            to="/admin-applications"
            :class="{
              'text-cyan-500': this.$route.name === 'adminApplications',
            }"
            class="nav-link"
            title="Admin"
          >
            <font-awesome-icon
              icon="fa-solid fa-comment-dots"
            ></font-awesome-icon>
            <span
              :class="{
                'text-gradient': this.$route.name === 'adminApplications',
              }"
              class="nav-link-extension"
              >Заявки</span
            >
          </RouterLink>
        </el-badge>

        <el-badge
          v-if="isAuthenticated()"
          :value="storePublications.publications.length || 0"
          class="item"
        >
          <RouterLink
            to="/admin-publications"
            :class="{
              'text-cyan-500': this.$route.name === 'adminPublications',
            }"
            class="nav-link"
            title="Admin"
          >
            <font-awesome-icon icon="fa-solid fa-film"></font-awesome-icon>
            <span
              :class="{
                'text-gradient': this.$route.name === 'adminPublications',
              }"
              class="nav-link-extension"
              >Издания</span
            >
          </RouterLink>
        </el-badge>

        <div
          @click="authVisible = true"
          v-if="!isAuthenticated()"
          class="nav-link"
          title="AdminModal"
        >
          <font-awesome-icon icon="fa-solid fa-user"></font-awesome-icon>
          <span class="nav-link-extension">Авторизация</span>
        </div>
        <div
          @click="dialogVisible = true"
          v-else
          class="nav-link cursor-pointer"
          title="AdminPage"
        >
          <font-awesome-icon
            icon="fa-solid fa-right-from-bracket"
          ></font-awesome-icon>
          <span class="nav-link-extension">Выйти</span>
        </div>
      </nav>
      <LoginComponent
        :authVisible="authVisible"
        @close="authVisible = false"
        v-if="authVisible"
      />
      <el-dialog v-model="dialogVisible" width="20%" title="Выход">
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

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.el-dialog__header {
  margin: 0;
  padding: 0;
}
</style>

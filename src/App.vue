<script setup>
import { RouterLink, RouterView } from "vue-router";
import { isAuthenticated } from "./js/helpers";
import { authStore } from "./stores/auth";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const storeAuth = authStore();
const dialogVisible = ref(false);
const logout = () => {
  storeAuth.logout();
  router.push("login");
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
          :class="{
            'text-cyan-500': this.$route.name === 'publications',
          }"
          to="/publications"
          class="nav-link"
          title="Publications"
        >
          <font-awesome-icon icon="fa-solid fa-film"></font-awesome-icon>
          <span
            :class="{
              'text-gradient': this.$route.name === 'publications',
            }"
            class="nav-link-extension"
            >Издания</span
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

        <RouterLink
          v-if="!isAuthenticated()"
          to="/contact"
          :class="{
            'text-cyan-500': this.$route.name === 'contact',
          }"
          class="nav-link"
          title="Contact me"
        >
          <font-awesome-icon
            icon="fa-solid fa-comment-dots"
          ></font-awesome-icon>
          <span
            :class="{
              'text-gradient': this.$route.name === 'contact',
            }"
            class="nav-link-extension"
            >Контакты</span
          >
        </RouterLink>
        <RouterLink
          v-if="isAuthenticated()"
          to="/admin"
          :class="{
            'text-cyan-500': this.$route.name === 'admin',
          }"
          class="nav-link"
          title="Admin"
        >
          <font-awesome-icon
            icon="fa-solid fa-comment-dots"
          ></font-awesome-icon>
          <span
            :class="{
              'text-gradient': this.$route.name === 'admin',
            }"
            class="nav-link-extension"
            >Заявки</span
          >
        </RouterLink>
        <RouterLink
          v-if="!isAuthenticated()"
          to="/login"
          :class="{
            'text-cyan-500': this.$route.name === 'login',
          }"
          class="nav-link"
          title="AdminPage"
        >
          <font-awesome-icon icon="fa-solid fa-user"></font-awesome-icon>
          <span
            :class="{
              'text-gradient': this.$route.name === 'login',
            }"
            class="nav-link-extension"
            >Авторизация</span
          >
        </RouterLink>
        <div
          @click="dialogVisible = true"
          v-else
          class="nav-link cursor-pointer"
          title="AdminPage"
        >
          <font-awesome-icon icon="fa-solid fa-user"></font-awesome-icon>
          <span class="nav-link-extension">Выйти</span>
        </div>
      </nav>
      <el-dialog v-model="dialogVisible" width="30%" title="Выход">
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

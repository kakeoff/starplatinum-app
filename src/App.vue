<script setup>
import { RouterLink, RouterView } from "vue-router";
import { isAuthenticated } from "./js/helpers";
import { authStore } from "./stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const storeAuth = authStore();
const logout = () => {
  storeAuth.logout();
  router.push("login");
};
</script>

<template>
  <header>
    <!-- The nav <section> is fixed to top, but the <nav> block 
    itself inside is flex sensitive. Also, the 'nav-links-extension' 
    are not displayed in mobile and tablet layout -->
    <section class="fixed-nav">
      <nav class="navbar">
        <RouterLink
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
          @click="logout()"
          v-else
          class="nav-link cursor-pointer"
          title="AdminPage"
        >
          <font-awesome-icon icon="fa-solid fa-user"></font-awesome-icon>
          <span class="nav-link-extension">Выйти</span>
        </div>
      </nav>
    </section>
  </header>

  <RouterView />
</template>

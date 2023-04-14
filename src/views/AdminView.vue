<template>
  <section class="about applications-section">
    <h2 class="category-heading mx-auto">Заявки</h2>

    <div class="w-full" v-motion-pop>
      <ApplicationsComponent />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ApplicationsComponent from "../components/ApplicationsComponent.vue";
import { isAuthenticated } from "../js/helpers";

export default defineComponent({
  components: {
    ApplicationsComponent,
  },
  mounted() {
    const shouldRedirect = !isAuthenticated();
    if (shouldRedirect) {
      this.$router.push("/login");
    }
  },
});
</script>

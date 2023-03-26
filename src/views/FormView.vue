<template>
  <section class="form-section" v-motion-pop>
    <h2 class="category-heading mb-[20px]">Создание заявки</h2>
    <div class="p-[20px]">
      <Form />
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Form from "../components/Form.vue";

export default defineComponent({
  components: {
    Form,
  },
});
</script>

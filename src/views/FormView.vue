<template>
  <section class="form-section" v-motion-pop>
    <h2 class="category-heading mb-[20px]">Создать заявку</h2>
    <div class="p-[20px] bg-[#4C2797] bg-opacity-30 rounded-[8px]">
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

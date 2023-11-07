<template>
  <el-dialog class="max-w-[600px] min-w-[465px]" v-model="showForm">
    <Form @close="showForm = false"></Form>
  </el-dialog>
  <div>
    <AboutHeaderComponent @showForm="showForm = true"></AboutHeaderComponent>
    <TestimonialsComponent></TestimonialsComponent>
    <AboutFaqComponent></AboutFaqComponent>
  </div>
</template>

<script lang="ts" setup>
import AboutFaqComponent from "../components/AboutFaqComponent.vue";
import TestimonialsComponent from "../components/TestimonialsComponent.vue";
import AboutHeaderComponent from "../components/AboutHeaderComponent.vue";
import { ref } from "vue";
import Form from "../components/Form.vue";

const showForm = ref(false);
</script>

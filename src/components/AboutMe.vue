<template>
  <el-dialog class="max-w-[600px] min-w-[465px]" v-model="showForm">
    <Form @close="showForm = false"></Form>
  </el-dialog>
  <AboutHeaderComponent @showForm="showForm = true"></AboutHeaderComponent>
  <TestimonialsComponent></TestimonialsComponent>
  <AboutFaqComponent></AboutFaqComponent>
</template>

<script lang="ts" setup>
import AboutFaqComponent from "../components/AboutFaqComponent.vue";
import TestimonialsComponent from "./TestimonialsComponent.vue";
import AboutHeaderComponent from "./AboutHeaderComponent.vue";
import { ref } from "vue";
import Form from "./Form.vue";

const showForm = ref(false);
</script>

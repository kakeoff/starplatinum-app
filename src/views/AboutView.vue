<template>
  <el-dialog class="max-w-[600px] min-w-[465px]" v-model="showForm">
    <Form @close="showForm = false"></Form>
  </el-dialog>
  <div v-motion-fade>
    <AboutHeaderComponent @showForm="clickShowForm(true)" />
    <TestimonialsComponent />
    <AboutFaqComponent />
  </div>
</template>

<script lang="ts" setup>
import AboutFaqComponent from '../components/AboutFaqComponent.vue'
import TestimonialsComponent from '../components/TestimonialsComponent.vue'
import AboutHeaderComponent from '../components/AboutHeaderComponent.vue'
import { ref } from 'vue'
import Form from '../components/Form.vue'
import { useRouter } from 'vue-router'
import { isAuthenticated } from '../plugins/helpers'

const router = useRouter()

const showForm = ref(false)

const clickShowForm = (val: boolean) => {
  if (!isAuthenticated()) {
    router.replace({
      name: String(router.currentRoute.value.name),
      query: {
        login: 1
      }
    })
    return
  }
  showForm.value = val
}
</script>

<template>
  <div>
    {{ user }}
  </div>
  <img :src="avatarUrl" alt="user avatar" />
  <input @change="uploadAvatar" type="file" />
  <button @click="logout">Выйти</button>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { userStore } from '../stores/user'
import { authStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const storeUser = userStore()
const storeAuth = authStore()
const user = computed(() => {
  return storeUser.user
})

const avatarUrl = computed(() => {
  return `${import.meta.env.VITE_SERVER_URL}${user.value?.avatarUrl}`
})

watch(user, async (value) => {
  if (!value) {
    await router.push('/')
  }
})

const uploadAvatar = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target && target.files) {
    const file = target.files[0]
    const formData = new FormData()
    formData.append('files', file)
    await storeUser.uploadAvatar(formData)
  }
}

const logout = () => {
  storeAuth.logout()
}
</script>

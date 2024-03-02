<template>
  <div>
    {{ user }}
  </div>
  <img :src="avatarUrl" alt="user avatar" />
  <input @change="uploadAvatar" type="file" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { userStore } from '../stores/user'

const storeUser = userStore()
const user = computed(() => {
  return storeUser.user
})

const avatarUrl = computed(() => {
  return `${import.meta.env.VITE_SERVER_URL}${user.value?.avatarUrl}`
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
</script>

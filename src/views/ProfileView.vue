<template>
  <div class="px-[30px]">
    <div class="flex gap-[20px]">
      <div class="w-[300px] flex flex-col gap-[10px]">
        <div
          class="bg-black rounded-[12px] border-[2px] border-gray-700 overflow-hidden h-[300px] w-full flex items-center justify-center"
        >
          <img
            v-if="user?.avatarUrl"
            class="w-full h-full object-cover"
            :src="avatarUrl"
            alt="user avatar"
          />
        </div>
        <el-dropdown class="text-[16px] font-[700]" trigger="click">
          <button
            class="w-full p-[12px] text-center text-white hover:bg-gray-700 transition duration-300 hover:translate-y-[-3px] rounded-[12px] border-[2px] border-gray-700"
          >
            Сменить аватар
          </button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item class="!p-0 text-[16px] font-[700]">
                <label
                  class="w-full h-full cursor-pointer px-[20px] py-[10px]"
                  for="fileInput"
                  >Загрузить новый</label
                >
              </el-dropdown-item>
              <el-dropdown-item
                @click="resetAvatar"
                class="text-red-500 text-[16px] font-[700] px-[20px] py-[10px]"
                >Сбросить</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <input
          class="hidden"
          id="fileInput"
          @change="uploadAvatar"
          type="file"
        />
        <el-popconfirm
          width="200"
          @confirm="logout"
          title="Выйти из аккаунта?"
          confirm-button-text="Да"
          cancel-button-text="Нет"
        >
          <template #reference>
            <button
              class="w-full p-[6px] font-[700] text-center hover:bg-red-900 transition duration-300 hover:translate-y-[-3px] text-white rounded-[12px] border-[2px] border-red-900"
            >
              Выйти
            </button>
          </template>
        </el-popconfirm>
      </div>
      <div>
        <p class="text-[24px] text-white font-[700]">{{ user?.login }}</p>
        <p class="text-[19px] text-white font-[500]">
          Роль: {{ user?.role === 1 ? 'Администратор' : 'Пользователь' }}
        </p>
        <p class="text-[19px] text-white font-[500]">
          Дата создания аккаунта:
          {{ createdAt }}
        </p>
        <p class="text-[19px] text-white font-[500]">Всего заявок: []</p>
        <p class="text-[19px] text-white font-[500]">Успешных заявок: []</p>
      </div>
    </div>
  </div>
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

const createdAt = computed(() => {
  return user.value
    ? new Date(user.value?.createdAt).toLocaleDateString()
    : 'Неизвестно'
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

const resetAvatar = () => {
  storeUser.resetAvatar()
}

const logout = () => {
  storeAuth.logout()
}
</script>

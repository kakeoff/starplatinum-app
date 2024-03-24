<template>
  <div class="px-[30px]">
    <div class="flex w-full">
      <div class="w-[300px] flex flex-col gap-[10px]">
        <div
          class="bg-black rounded-l-[12px] border-[2px] border-gray-700 overflow-hidden h-[300px] w-full flex items-center justify-center"
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
        <button
          @click="logoutVisible = true"
          class="w-full p-[6px] font-[700] text-center hover:bg-red-900 transition duration-300 hover:translate-y-[-3px] text-white rounded-[12px] border-[2px] border-red-900"
        >
          Выйти
        </button>
        <el-dialog v-model="logoutVisible" title="Выход" width="400">
          <span>Вы действительно хотите выйти из аккаунта?</span>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="logoutVisible = false">Нет</el-button>
              <el-button type="primary" @click="logout"> Да </el-button>
            </div>
          </template>
        </el-dialog>
      </div>
      <div
        class="h-[300px] text-white border-[2px] px-[10px] py-[3px] flex w-[30%] items-center border-gray-700 border-y border-r rounded-r-[12px]"
      >
        <div
          class="flex flex-col gap-[25px] w-full sm:min-w-[245px] overflow-hidden"
        >
          <div class="flex flex-col gap-[3px]">
            <div class="flex flex-row gap-[3px] items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.99935 6.0026C9.28801 6.0026 10.3327 4.95794 10.3327 3.66927C10.3327 2.38061 9.28801 1.33594 7.99935 1.33594C6.71068 1.33594 5.66602 2.38061 5.66602 3.66927C5.66602 4.95794 6.71068 6.0026 7.99935 6.0026Z"
                  stroke="currentColor"
                  stroke-opacity="0.5"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.33301 13.6693C1.33301 10.7236 4.01934 8.33594 7.33301 8.33594M10.333 14.0026L13.6663 10.6693L12.333 9.33594L8.99967 12.6693V14.0026H10.333Z"
                  stroke="currentColor"
                  stroke-opacity="0.5"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span class="font-[400] text-[14px]">Имя</span>
            </div>
            <div
              class="flex flex-col items-start sm:flex-row justify-between w-full sm:items-center"
            >
              <span class="ym-hide-content text-[17px] font-[500] truncate">
                {{ user?.fullName }}
              </span>
              <button
                class="text-[13px] font-[400] landing-[13px] hover:underline"
                name="change-username"
                @click="clickChangeName"
              >
                Изменить
              </button>
            </div>
          </div>
          <div class="flex flex-col gap-[3px]">
            <div class="flex flex-row gap-[3px] items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.6663 3.9974C14.6663 3.26406 14.0663 2.66406 13.333 2.66406H2.66634C1.93301 2.66406 1.33301 3.26406 1.33301 3.9974V11.9974C1.33301 12.7307 1.93301 13.3307 2.66634 13.3307H13.333C14.0663 13.3307 14.6663 12.7307 14.6663 11.9974V3.9974ZM13.333 3.9974L7.99967 7.33073L2.66634 3.9974H13.333ZM13.333 11.9974H2.66634V5.33073L7.99967 8.66406L13.333 5.33073V11.9974Z"
                  fill="currentColor"
                  fill-opacity="0.5"
                />
              </svg>
              <span class="font-[400] text-[14px]">Email</span>
            </div>
            <div
              class="flex flex-col items-start sm:flex-row justify-between w-full sm:items-center"
            >
              <span class="ym-hide-content text-[17px] font-[500] truncate">
                {{ user?.email }}
              </span>
              <button
                class="text-[13px] font-[400] landing-[13px] hover:underline"
                name="change-email"
                @click="clickChangeEmail"
              >
                Изменить
              </button>
            </div>
          </div>
          <div class="flex flex-col gap-[3px]">
            <div class="flex flex-row gap-[3px] items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.99967 13.3307H8.99967C9.08856 13.3307 9.16634 13.2974 9.23301 13.2307C9.29967 13.1641 9.33301 13.0863 9.33301 12.9974C9.33301 12.9085 9.29967 12.8307 9.23301 12.7641C9.16634 12.6974 9.08856 12.6641 8.99967 12.6641H6.99967C6.91079 12.6641 6.83301 12.6974 6.76634 12.7641C6.69967 12.8307 6.66634 12.9085 6.66634 12.9974C6.66634 13.0863 6.69967 13.1641 6.76634 13.2307C6.83301 13.2974 6.91079 13.3307 6.99967 13.3307ZM4.66634 15.3307C4.29967 15.3307 3.9859 15.2003 3.72501 14.9394C3.46367 14.6781 3.33301 14.3641 3.33301 13.9974V1.9974C3.33301 1.63073 3.46367 1.31673 3.72501 1.0554C3.9859 0.794507 4.29967 0.664062 4.66634 0.664062H11.333C11.6997 0.664062 12.0137 0.794507 12.275 1.0554C12.5359 1.31673 12.6663 1.63073 12.6663 1.9974V13.9974C12.6663 14.3641 12.5359 14.6781 12.275 14.9394C12.0137 15.2003 11.6997 15.3307 11.333 15.3307H4.66634ZM4.66634 10.6641H11.333V3.9974H4.66634V10.6641ZM4.66634 11.9974V13.9974H11.333V11.9974H4.66634ZM4.66634 2.66406H11.333V1.9974H4.66634V2.66406Z"
                  fill="currentColor"
                  fill-opacity="0.5"
                />
              </svg>
              <span class="font-[400] text-[14px]">Телефон</span>
            </div>
            <div
              class="flex flex-col items-start sm:flex-row justify-between w-full sm:items-center"
            >
              <div class="flex flex-col sm:flex-row gap-[8px] max-w-[85%]">
                <span
                  class="ym-hide-content text-[17px] font-[500] overflow-hidden truncate"
                >
                  {{ user?.phone }}
                </span>
              </div>
              <button
                class="text-[13px] font-[400] landing-[13px] hover:underline"
                name="change-phone"
                @click="clickChangePhoneNumber"
              >
                Изменить
              </button>
            </div>
          </div>

          <div class="flex flex-col gap-[3px]">
            <div class="flex flex-row gap-[3px] items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.00033 11.3307C7.6467 11.3307 7.30757 11.1903 7.05752 10.9402C6.80747 10.6902 6.66699 10.351 6.66699 9.9974C6.66699 9.2574 7.26033 8.66406 8.00033 8.66406C8.35395 8.66406 8.69309 8.80454 8.94313 9.05459C9.19318 9.30464 9.33366 9.64377 9.33366 9.9974C9.33366 10.351 9.19318 10.6902 8.94313 10.9402C8.69309 11.1903 8.35395 11.3307 8.00033 11.3307ZM12.0003 13.3307V6.66406H4.00033V13.3307H12.0003ZM12.0003 5.33073C12.3539 5.33073 12.6931 5.47121 12.9431 5.72125C13.1932 5.9713 13.3337 6.31044 13.3337 6.66406V13.3307C13.3337 13.6844 13.1932 14.0235 12.9431 14.2735C12.6931 14.5236 12.3539 14.6641 12.0003 14.6641H4.00033C3.6467 14.6641 3.30756 14.5236 3.05752 14.2735C2.80747 14.0235 2.66699 13.6844 2.66699 13.3307V6.66406C2.66699 5.92406 3.26033 5.33073 4.00033 5.33073H4.66699V3.9974C4.66699 3.11334 5.01818 2.26549 5.6433 1.64037C6.26842 1.01525 7.11627 0.664063 8.00033 0.664062C8.43807 0.664062 8.87152 0.750282 9.27594 0.917797C9.68036 1.08531 10.0478 1.33084 10.3573 1.64037C10.6669 1.9499 10.9124 2.31737 11.0799 2.72178C11.2474 3.1262 11.3337 3.55966 11.3337 3.9974V5.33073H12.0003ZM8.00033 1.9974C7.46989 1.9974 6.96118 2.20811 6.58611 2.58318C6.21104 2.95826 6.00033 3.46696 6.00033 3.9974V5.33073H10.0003V3.9974C10.0003 3.46696 9.78961 2.95826 9.41454 2.58318C9.03947 2.20811 8.53076 1.9974 8.00033 1.9974Z"
                  fill="currentColor"
                  fill-opacity="0.5"
                />
              </svg>
              <span class="font-[400] text-[14px]"> Пароль </span>
            </div>
            <div
              class="flex flex-col items-start sm:flex-row justify-between w-full sm:items-center"
            >
              <span class="text-[17px] font-[500] truncate">
                *************
              </span>
              <button
                class="text-[13px] font-[400] landing-[13px] hover:underline"
                name="change-password"
                @click="clickChangePassword"
              >
                Изменить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { userStore } from '../stores/user'
import { authStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const storeUser = userStore()
const storeAuth = authStore()

const logoutVisible = ref(false)

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

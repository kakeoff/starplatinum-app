<template>
  <el-dialog
    v-model="authVisible"
    class="px-[20px] min-w-[260px] max-w-[400px]"
    :title="title"
  >
    <div class="flex justify-center w-full min-h-full">
      <el-form
        ref="loginForm"
        :model="loginForm"
        class="font-[700] w-full text-[35px]"
      >
        <el-form-item class="mb-[10px]" prop="username">
          <div class="flex flex-col gap-[10px] w-full">
            <p>Введите логин или Email</p>
            <input
              class="px-[10px] py-[5px] border-[1px] border-gray-500 rounded-[6px] focus:outline-none"
              :class="{
                '!border-red-500 ': errors.includes('User does not exists')
              }"
              v-model="loginForm.username"
              placeholder="Введите логин или Email"
            />
          </div>
        </el-form-item>
        <el-form-item class="mb-[10px]" prop="password">
          <div class="flex flex-col gap-[10px] w-full">
            <p>Введите пароль</p>
            <div class="relative w-full">
              <div
                class="absolute top-[9px] right-[5px]"
                @click="showPassword = !showPassword"
              >
                <svg
                  v-if="!showPassword"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="cursor-pointer"
                >
                  <path
                    d="M22.1804 11.9706C22.6505 12.5855 22.6505 13.4156 22.1804 14.0295C20.6997 15.9625 17.1472 19.9425 12.9996 19.9425C8.85196 19.9425 5.29942 15.9625 3.8187 14.0295C3.58998 13.7351 3.46582 13.3729 3.46582 13C3.46582 12.6272 3.58998 12.265 3.8187 11.9706C5.29942 10.0376 8.85196 6.05762 12.9996 6.05762C17.1472 6.05762 20.6997 10.0376 22.1804 11.9706V11.9706Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.9997 15.9753C14.643 15.9753 15.9751 14.6432 15.9751 13C15.9751 11.3568 14.643 10.0247 12.9997 10.0247C11.3565 10.0247 10.0244 11.3568 10.0244 13C10.0244 14.6432 11.3565 15.9753 12.9997 15.9753Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <svg
                  v-if="showPassword"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="cursor-pointer"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M21.6416 5.77302C22.0321 5.3825 22.0321 4.74934 21.6416 4.35881C21.2511 3.96829 20.6179 3.96829 20.2274 4.35881L17.9584 6.6278C16.5213 5.73066 14.836 5.05785 13.0005 5.05785C10.6102 5.05785 8.47076 6.199 6.79655 7.49975C5.1124 8.80822 3.79543 10.3583 3.02775 11.3602C2.66414 11.8297 2.4668 12.4067 2.4668 13.0006C2.4668 13.5946 2.6642 14.1717 3.02792 14.6413C3.73306 15.5607 4.90492 16.9482 6.40184 18.1844L4.35929 20.2269C3.96876 20.6174 3.96876 21.2506 4.35929 21.6411C4.74981 22.0317 5.38298 22.0317 5.7735 21.6411L8.57973 18.8349C8.60853 18.8093 8.63606 18.7818 8.66216 18.7525L11.4977 15.9169C11.5397 15.8859 11.5798 15.8512 11.6176 15.8128C11.6515 15.7784 11.6824 15.7421 11.7103 15.7044L15.7021 11.7125C15.7412 11.684 15.7786 11.6522 15.8141 11.6173C15.8537 11.5784 15.8894 11.5369 15.9211 11.4935L18.7368 8.67783C18.7763 8.64417 18.8135 8.60706 18.8481 8.56659L21.6416 5.77302ZM16.4998 8.08638C15.386 7.4554 14.2039 7.05785 13.0005 7.05785C11.2433 7.05785 9.53268 7.90665 8.0236 9.0791C6.52578 10.2428 5.32692 11.6477 4.61364 12.5788L4.60957 12.5841L4.60956 12.5841C4.51702 12.7032 4.4668 12.8498 4.4668 13.0006C4.4668 13.1515 4.51702 13.298 4.60956 13.4172L4.61339 13.4221L4.61337 13.4221C5.29791 14.3149 6.42211 15.6352 7.82329 16.7629L9.57073 15.0155C9.47931 14.861 9.39825 14.7002 9.32826 14.534C9.12454 14.0504 9.01858 13.5313 9.01651 13.0065C9.01444 12.4817 9.11628 11.9618 9.31617 11.4766C9.51606 10.9913 9.81003 10.5505 10.1811 10.1795C10.5522 9.80848 10.9931 9.51461 11.4784 9.31484C11.9636 9.11506 12.4836 9.01334 13.0084 9.01554C13.5332 9.01774 14.0523 9.12381 14.5359 9.32764C14.7017 9.39755 14.8622 9.47849 15.0165 9.56976L16.4998 8.08638ZM13 11.0155C13.1704 11.0162 13.3395 11.039 13.5033 11.0829L11.0839 13.5023C11.0399 13.3384 11.0172 13.1691 11.0165 12.9986C11.0155 12.7378 11.0661 12.4795 11.1654 12.2384C11.2647 11.9973 11.4108 11.7782 11.5952 11.5939C11.7796 11.4095 11.9987 11.2635 12.2398 11.1642C12.4809 11.065 12.7393 11.0144 13 11.0155ZM21.2282 9.33089C20.845 8.93316 20.212 8.92137 19.8142 9.30455C19.4165 9.68773 19.4047 10.3208 19.7879 10.7185C20.3553 11.3074 20.889 11.9279 21.3865 12.5769L21.3865 12.5769L21.3906 12.5823C21.4833 12.7015 21.5337 12.8482 21.5338 12.9993C21.5338 13.1503 21.4836 13.2971 21.391 13.4165L21.3873 13.4213C20.674 14.3524 19.4751 15.7573 17.9773 16.921C16.4689 18.093 14.7591 18.9416 13.0027 18.9423C12.4268 18.9394 11.8542 18.8546 11.3022 18.6903C10.7729 18.5327 10.2161 18.8341 10.0585 19.3634C9.90093 19.8928 10.2023 20.4496 10.7316 20.6072C11.4666 20.8259 12.2291 20.9388 12.9959 20.9423H13.0004C15.3908 20.9423 17.5302 19.8011 19.2044 18.5004C20.8887 17.1918 22.2058 15.6414 22.9734 14.6396C23.3369 14.1697 23.534 13.5924 23.5338 12.9983C23.5335 12.4043 23.3358 11.8273 22.972 11.3578C22.4293 10.65 21.8471 9.97325 21.2282 9.33089Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <input
                :class="{
                  '!border-red-500 ': errors.includes('Incorrect password')
                }"
                class="pr-[35px] pl-[10px] py-[5px] rounded-[6px] border-[1px] w-full border-gray-500 focus:outline-none"
                v-model="loginForm.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Введите пароль"
              />
            </div>
          </div>
        </el-form-item>
        <p class="text-[14px] text-center pt-[5px]">
          Еще не зарегистрированы?
          <router-link class="text-blue-500" to="?register=1"
            >Регистрация</router-link
          >
        </p>
        <div
          class="text-[14px] text-red-500"
          v-for="error in errors"
          :key="error"
        >
          <p>{{ getErrorLabel(error) }}</p>
        </div>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close()">Отмена</el-button>
        <el-button type="primary" @click="login()"> Подтвердить </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import {
  ElButton,
  ElCard,
  ElForm,
  ElFormItem,
  ElInput,
  FormInstance,
  ElNotification
} from 'element-plus'
import { authStore } from '../stores/auth'
import { mapStores } from 'pinia'

export default defineComponent({
  name: 'LoginForm',
  components: {
    ElButton,
    ElCard,
    ElForm,
    ElFormItem,
    ElInput
  },
  props: {
    errors: {
      type: Array as PropType<string[]>,
      default: []
    },
    authVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      showPassword: false
    }
  },
  computed: {
    ...mapStores(authStore)
  },
  methods: {
    getErrorLabel(error: string) {
      const errors: Record<string, string> = {
        'User does not exists': 'Пользователя не существует',
        'Incorrect password': 'Неверный пароль'
      }
      return errors[error] || 'Ошибка авторизации'
    },
    login() {
      const loginFormRef = this.$refs.loginForm as FormInstance | undefined
      if (loginFormRef) {
        loginFormRef.validate(async (valid) => {
          if (valid) {
            this.$emit('auth', this.loginForm.username, this.loginForm.password)
          } else {
            ElNotification({
              title: 'Ошибка',
              message: 'Проверьте правильность введенных данных',
              type: 'error'
            })
            return false
          }
        })
      }
    },
    close() {
      this.$emit('close')
    }
  }
})
</script>

<style scoped>
.el-form-item__content {
  margin-left: 0px;
}
</style>

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
            <p>Введите логин</p>
            <input
              class="px-[10px] py-[5px] border-[1px] border-gray-500 rounded-[6px] focus:outline-none"
              :class="{
                '!border-red-500 ': errors.includes('User does not exists')
              }"
              v-model="loginForm.username"
              placeholder="Введите логин"
            />
          </div>
        </el-form-item>
        <el-form-item class="mb-[10px]" prop="password">
          <div class="flex flex-col gap-[10px] w-full">
            <p>Введите пароль</p>
            <input
              :class="{
                '!border-red-500 ': errors.includes('Incorrect password')
              }"
              class="px-[10px] py-[5px] rounded-[6px] border-[1px] border-gray-500 focus:outline-none"
              v-model="loginForm.password"
              type="password"
              placeholder="Введите пароль"
            />
          </div>
        </el-form-item>
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
      }
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

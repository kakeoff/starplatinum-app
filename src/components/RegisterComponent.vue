<template>
  <el-dialog
    v-model="authVisible"
    class="px-[20px] mt-[30px] min-w-[350px] max-w-[550px]"
    title="Регистрация"
  >
    <div class="flex justify-center w-full min-h-full">
      <el-form
        ref="loginForm"
        :model="form"
        class="font-[700] w-full text-[35px]"
      >
        <el-form-item class="mb-[10px]" prop="login">
          <div class="flex flex-col gap-[10px] w-full">
            <p>Введите логин</p>
            <input
              :class="{
                '!border-red-500 ': errors.includes(
                  'User already exists' ||
                    'login must be longer than or equal to 5 characters'
                )
              }"
              class="px-[10px] py-[5px] rounded-[6px] border-[1px] border-gray-500 focus:outline-none"
              v-model="form.login"
              placeholder="Введите логин"
            />
          </div>
        </el-form-item>
        <el-form-item class="mb-[10px]" prop="email">
          <div class="flex flex-col gap-[10px] w-full">
            <p>Введите Email</p>
            <input
              :class="{
                '!border-red-500 ': errors.includes(
                  'User already exists' || 'email must be an email'
                )
              }"
              class="px-[10px] py-[5px] rounded-[6px] border-[1px] border-gray-500 focus:outline-none"
              v-model="form.email"
              placeholder="Введите Email"
            />
          </div>
        </el-form-item>
        <el-form-item class="mb-[10px]" prop="fullName">
          <div class="flex flex-col gap-[10px] w-full">
            <p>Введите полное имя</p>
            <input
              class="px-[10px] py-[5px] rounded-[6px] border-[1px] border-gray-500 focus:outline-none"
              v-model="form.fullName"
              placeholder="Введите полное имя"
            />
          </div>
        </el-form-item>
        <el-form-item class="mb-[10px]" prop="companyName">
          <div class="flex flex-col gap-[10px] w-full">
            <p>Введите название организации</p>
            <input
              class="px-[10px] py-[5px] rounded-[6px] border-[1px] border-gray-500 focus:outline-none"
              v-model="form.companyName"
              placeholder="Введите название организации"
            />
          </div>
        </el-form-item>
        <el-form-item class="mb-[10px]" prop="address">
          <div class="flex flex-col gap-[10px] w-full">
            <p>Введите адрес организации</p>
            <input
              class="px-[10px] py-[5px] rounded-[6px] border-[1px] border-gray-500 focus:outline-none"
              v-model="form.address"
              placeholder="Введите адрес организации"
            />
          </div>
        </el-form-item>
        <el-form-item class="mb-[10px]" prop="address">
          <div class="flex flex-col gap-[10px] w-full">
            <p>Введите телефон</p>
            <input
              class="px-[10px] py-[5px] rounded-[6px] border-[1px] border-gray-500 focus:outline-none"
              v-model="form.phone"
              placeholder="Введите телефон"
            />
          </div>
        </el-form-item>
        <el-form-item class="mb-[10px]" prop="password">
          <div class="flex flex-col gap-[10px] w-full">
            <p>Введите пароль</p>
            <input
              :class="{
                '!border-red-500 ': errors.includes(
                  'password must be longer than or equal to 6 characters'
                )
              }"
              class="px-[10px] py-[5px] rounded-[6px] border-[1px] border-gray-500 focus:outline-none"
              v-model="form.password"
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
  name: 'RegisterForm',
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
      form: {
        login: '',
        password: '',
        fullName: '',
        email: '',
        companyName: '',
        address: '',
        phone: ''
      }
    }
  },
  computed: {
    ...mapStores(authStore)
  },
  methods: {
    getErrorLabel(error: string) {
      const errors: Record<string, string> = {
        'User already exists': 'Пользователь уже существует',
        'email must be an email': 'Некорректный Email',
        'login must be longer than or equal to 5 characters':
          'Некорректный логин(более 5 символов)',
        'password must be longer than or equal to 6 characters':
          'Некорректный пароль(более 6 символов)'
      }
      return errors[error] || 'Ошибка регистрации'
    },
    login() {
      const loginFormRef = this.$refs.loginForm as FormInstance | undefined
      if (loginFormRef) {
        loginFormRef.validate(async (valid) => {
          if (valid) {
            this.$emit('register', this.form)
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

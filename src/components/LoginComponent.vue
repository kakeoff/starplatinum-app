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
        :rules="loginRules"
        class="font-[700] w-full text-[35px]"
      >
        <el-form-item class="mb-[30px]" prop="username">
          <div class="flex flex-col gap-[10px] w-full">
            <p>Введите логин</p>
            <input
              class="px-[10px] py-[5px] rounded-[6px] focus:outline-none"
              v-model="loginForm.username"
              placeholder="Введите логин"
            />
          </div>
        </el-form-item>
        <el-form-item class="mb-[30px]" prop="password">
          <div class="flex flex-col gap-[10px] w-full">
            <p>Введите пароль</p>
            <input
              class="px-[10px] py-[5px] rounded-[6px] focus:outline-none"
              v-model="loginForm.password"
              type="password"
              placeholder="Введите пароль"
            />
          </div>
        </el-form-item>
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
import { defineComponent } from 'vue'
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
      loginRules: {
        username: [
          {
            required: true,
            message: 'Введите логин',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: 'Введите пароль', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapStores(authStore)
  },
  methods: {
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

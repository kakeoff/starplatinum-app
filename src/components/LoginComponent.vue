<template>
  <div class="flex justify-center w-full min-h-full">
    <el-card class="p-[20px] h-[250px]">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        label-width="80px"
        class="max-w-[600px] font-[700] text-[35px]"
      >
        <el-form-item class="mb-[30px]" label="Логин" prop="username">
          <el-input
            size="large"
            v-model="loginForm.username"
            placeholder="Введите логин"
          ></el-input>
        </el-form-item>
        <el-form-item class="mb-[30px]" label="Пароль" prop="password">
          <el-input
            size="large"
            v-model="loginForm.password"
            type="password"
            placeholder="Введите пароль"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmitForm">Войти</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { ElButton, ElCard, ElForm, ElFormItem, ElInput } from "element-plus";
import { authStore } from "../stores/auth";
import { mapStores } from "pinia";

export default defineComponent({
  name: "LoginForm",
  components: {
    ElButton,
    ElCard,
    ElForm,
    ElFormItem,
    ElInput,
  },
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          {
            required: true,
            message: "Введите логин",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "Введите пароль", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapStores(authStore),
  },
  methods: {
    handleSubmitForm() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          // отправка данных формы на сервер для авторизации
          await this.authStore.login(
            this.loginForm.username,
            this.loginForm.password
          );
          this.$router.push("/admin");
        } else {
          console.log("Ошибка валидации");
          return false;
        }
      });
    },
  },
});
</script>

<style scoped></style>

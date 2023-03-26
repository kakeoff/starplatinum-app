<template>
  <div class="login-container">
    <el-card>
      <h3 class="login-title">Авторизация</h3>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        label-width="80px"
        class="login-form"
      >
        <el-form-item class="mb-[30px]" label="Логин" prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="Введите логин"
          ></el-input>
        </el-form-item>
        <el-form-item class="mb-[30px]" label="Пароль" prop="password">
          <el-input
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
  methods: {
    handleSubmitForm() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // отправка данных формы на сервер для авторизации
          console.log("Форма отправлена");
        } else {
          console.log("Ошибка валидации");
          return false;
        }
      });
    },
  },
});
</script>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.login-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
}
.login-form {
  width: 400px;
}
</style>

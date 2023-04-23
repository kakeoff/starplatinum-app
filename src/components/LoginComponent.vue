<template>
  <el-dialog
    v-model="authVisible"
    width="30%"
    class="px-[20px]"
    title="Авторизация"
  >
    <div class="flex justify-center w-full min-h-full">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="font-[700] w-full text-[35px]"
      >
        <el-form-item class="mb-[30px]" prop="username">
          <el-input
            size="large"
            v-model="loginForm.username"
            placeholder="Введите логин"
          ></el-input>
        </el-form-item>
        <el-form-item class="mb-[30px]" prop="password">
          <el-input
            size="large"
            v-model="loginForm.password"
            type="password"
            placeholder="Введите пароль"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close()">Отмена</el-button>
        <el-button type="primary" @click="login()"> Войти </el-button>
      </span>
    </template>
  </el-dialog>
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
  props: {
    authVisible: {
      type: Boolean,
      default: false,
    },
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
    login() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          await this.authStore.login(
            this.loginForm.username,
            this.loginForm.password
          );
          let IsToken = false;
          if (localStorage.getItem("access_token")) {
            IsToken = true;
          }
          if (!IsToken) {
            return;
          }
          this.$router.push("/admin");
          this.close();
        } else {
          ElNotification({
            title: "Ошибка",
            message: "Проверьте правильность введенных данных",
            type: "error",
          });
          return false;
        }
      });
    },
    close() {
      this.$emit("close");
    },
  },
});
</script>

<style scoped>
.el-form-item__content {
  margin-left: 0px;
}
</style>

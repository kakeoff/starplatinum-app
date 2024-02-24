import { defineStore } from "pinia";
import * as Api from '../services/auth.service';
import { userStore } from "./user";

export const authStore = defineStore({
  id: 'auth',
  actions: {
    async login(login: string, password: string) {
      const res = await Api.login(login, password)
      if (!res) return
      localStorage.setItem('accessToken', res.access_token)
      const storeUser = userStore()
      storeUser.getMe()
    },
    async register(login: string, password: string) {
      await Api.register(login, password)
    },
    logout() {
      localStorage.removeItem('accessToken')
      const storeUser = userStore()
      storeUser.clearUserStateLocally()
    }
  }
})

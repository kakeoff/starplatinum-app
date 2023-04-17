import { defineStore } from "pinia";
import * as Api from '../services/auth.service';

export const authStore = defineStore({
  id: 'auth',
  actions: {
    async login(login: string, password: string) {
      const res = await Api.login(login, password)
      if (!res) return
      localStorage.setItem('access_token', res.data.access_token)
    },
    logout() {
      localStorage.removeItem('access_token')
    }
  }
})

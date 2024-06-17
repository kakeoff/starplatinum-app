import { RegisterDto } from '@/services/dto'
import { defineStore } from 'pinia'
import * as Api from '../services/auth.service'
import { userStore } from './user'

export const authStore = defineStore({
  id: 'auth',
  actions: {
    async login(login: string, password: string) {
      const res = await Api.login(login, password)
      localStorage.setItem('accessToken', res.access_token)
      const storeUser = userStore()
      storeUser.getMe()
    },
    async register(data: RegisterDto) {
      const res = await Api.register(data)
      localStorage.setItem('accessToken', res.access_token)
      const storeUser = userStore()
      storeUser.getMe()
    },
    logout() {
      localStorage.removeItem('accessToken')
      const storeUser = userStore()
      storeUser.clearUserStateLocally()
    }
  }
})

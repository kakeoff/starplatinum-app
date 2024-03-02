import { defineStore } from "pinia";
import * as Api from '../services/user.service';
import { UpdateMeDto, User } from "../types/userTypes";

export const userStore = defineStore({
  id: 'user',
  state: () => ({
    user: null as User | null
  }),
  actions: {
    async getMe() {
      const user = await Api.getMe()
      if (!user) return
      this.user = user
      return user
    },
    async updateMe(data: UpdateMeDto) {
      const user = await Api.updateMe(data)
      this.user = user
      return user
    },
    async uploadAvatar(file: FormData) {
      const fileName = await Api.uploadAvatar(file)
      const avatarUrl = `/uploads/${fileName}`
      await this.updateMe({avatarUrl})
      return avatarUrl
    },
    clearUserStateLocally() {
      this.user = null
    }
  }
})

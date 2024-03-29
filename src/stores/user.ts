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
    async changePassword(data: {old: string, new: string}) {
      await Api.changePassword(data)
    },
    async uploadAvatar(file: FormData) {
      const fileName = await Api.uploadAvatar(file)
      const avatarUrl = `/uploads/${fileName}`
      await this.updateMe({avatarUrl})
      return avatarUrl
    },
    async resetAvatar() {
      await this.updateMe({avatarUrl: '/uploads/default/default.png'})
    },
    clearUserStateLocally() {
      this.user = null
    }
  }
})

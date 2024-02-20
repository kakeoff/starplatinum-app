import { defineStore } from "pinia";
import * as Api from '../services/user.service';

export const userStore = defineStore({
  id: 'user',
  state: () => ({
    user: null
  }),
  actions: {
    async getMe() {
      const user = await Api.getMe()
      if (!user) return
      this.user = user
      return user
    },
    clearUserStateLocally() {
      this.user = null
    }
  }
})

import { defineStore } from "pinia";
import * as Api from '../services/users.service';
import { User } from "../types/userTypes";

export const usersStore = defineStore({
  id: 'users',
  state: () => ({
    users: [] as User[]
  }),
  actions: {
    async getAllUsers(): Promise<User[]> {
      const users = await Api.getAllUsers()
      if (!users) return []
      this.users = users
      return users
    },
    async updateUserRole(data: {id: number, role: number}) {
      const userRes = await Api.updateUserRole(data)
      if (!data) return
      const index = this.users.findIndex((user) => user?.id === data.id)
      if (index !== -1) {
        this.users[index] = userRes
      }
    },
    clearUsersStateLocally() {
      this.users = []
    }
  }
})

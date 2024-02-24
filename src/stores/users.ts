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
    async updateUser(user: {id: number, login: string, role: number}) {
      const data = {
        id: user.id,
        login: user.login,
        role: user.role,
      }
      const userRes = await Api.updateUser(data)
      if (!user) return
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

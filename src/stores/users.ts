import { defineStore } from 'pinia'
import * as Api from '../services/users.service'
import { User, UserRole } from '../types/userTypes'

export const usersStore = defineStore({
  id: 'users',
  state: () => ({
    users: [] as User[]
  }),
  getters: {
    usersById(state) {
      if (!state.users) return {}

      return state.users.reduce<{ [key: number]: User }>(
        (acc, user) => {
          acc[user.id] = user
          return acc
        },
        {}
      )
    }
  },
  actions: {
    async getAllUsers(): Promise<User[]> {
      const users = await Api.getAllUsers()
      if (!users) return []
      this.users = users
      return users
    },
    async getAllAdmins(): Promise<User[]> {
      const users = await Api.getAllAdmins()
      if (!users) return []
      this.users = users
      return users
    },
    async updateUserRole(data: { id: number; role: UserRole }) {
      const userRes = await Api.updateUserRole(data)
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

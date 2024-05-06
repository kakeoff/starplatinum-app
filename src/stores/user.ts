import { uploadFile } from '@/services/file.service'
import { defineStore } from 'pinia'
import * as Api from '../services/user.service'
import { CartItem, ItemType, UpdateMeDto, User } from '../types/userTypes'

export const userStore = defineStore({
  id: 'user',
  state: () => ({
    user: null as User | null,
    cartItems: [] as CartItem[]
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
    async changePassword(data: { old: string; new: string }) {
      await Api.changePassword(data)
    },
    async uploadAvatar(file: FormData) {
      const fileName = await uploadFile(file)
      await this.updateMe({ avatarUrl: `/uploads/${fileName}` })
      return fileName
    },
    async resetAvatar() {
      await this.updateMe({ avatarUrl: '/uploads/default/default.png' })
    },
    async addToCart(data: {
      type: ItemType
      itemId: number
      itemDate?: string
    }) {
      // await Api.addToCart(data)
      this.cartItems.push({ id: 123, ...data })
    },
    clearUserStateLocally() {
      this.user = null
      this.cartItems = []
    }
  }
})

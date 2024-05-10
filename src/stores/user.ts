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

  getters: {
    userCartPublications(state) {
      return state.cartItems.filter(
        (item) => item.type === ItemType.publication
      )
    }
  },
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

    async getMyCart() {
      const items = await Api.getMyCart()
      this.cartItems = items
    },
    async addToCart(data: {
      type: ItemType
      itemId: number
      itemDate?: string
    }) {
      const cartItem = await Api.addToCart(data)
      this.cartItems.push(cartItem)
    },
    async removeFromCart(id: number) {
      await Api.removeFromCart(id)
      const idx = this.cartItems.findIndex((item) => item.id === id)
      if (idx !== -1) {
        this.cartItems.splice(idx, 1)
      }
    },
    clearUserStateLocally() {
      this.user = null
      this.cartItems = []
    }
  }
})

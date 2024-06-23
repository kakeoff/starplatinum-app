export type User = {
  id: number
  login: string
  email: string
  fullName: string
  phone: string | null
  address: string | null
  companyName: string | null
  lastVisitDate: Date | null
  role: UserRole
  avatarUrl: string
  createdAt: Date
}

export type UpdateUserRoleDto = {
  id: number
  role: UserRole
}

export type UpdateMeDto = {
  login?: string
  avatarUrl?: string
  fullName?: string
  email?: string
  phone?: string
  companyName?: string
  address?: string
}

export enum UserRole {
  admin = 1,
  user = 0,
  owner = 2
}

export enum ItemType {
  publication = 0
}

export type CartItem = {
  id: number
  type: ItemType
  itemId: number
  itemDate?: string
  createdAt: string
}

export type AddItemToUserCartDto = {
  type: ItemType
  itemId: number
  itemDate?: string
}

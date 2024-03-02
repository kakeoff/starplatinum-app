export type User = {
  id: number,
  role: number,
  login: string,
  createdAt: number,
  avatarUrl: string
}

export type UpdateUserDto = {
  id?: number,
  role?: number,
  login?: string
}

export type UpdateMeDto = {
  login?: string,
  avatarUrl?: string
}

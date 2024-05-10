import { mapFileUrl } from '@/plugins/helpers'
import axios from '../plugins/axios'
import { UpdateUserRoleDto, User } from '../types/userTypes'

export async function getAllUsers(): Promise<User[]> {
  try {
    const res = await axios.get<User[]>(`/user/all`)
    res.data.map((item) => (item.avatarUrl = mapFileUrl(item.avatarUrl)))
    return res.data
  } catch (err) {
    return Promise.reject(err)
  }
}

export async function updateUserRole(data: UpdateUserRoleDto): Promise<User> {
  try {
    const res = await axios.patch<User>(`/user/role`, data)
    res.data.avatarUrl = mapFileUrl(res.data.avatarUrl)
    return res.data
  } catch (err) {
    return Promise.reject(err)
  }
}

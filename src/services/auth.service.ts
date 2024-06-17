import axios from '../plugins/axios'
import { RegisterDto } from './dto'

export async function login(
  login: string,
  password: string
): Promise<{ access_token: string }> {
  try {
    const res = await axios.post<{ access_token: string }>(`/auth/login`, {
      login,
      password
    })
    return res.data
  } catch (err: any) {
    return Promise.reject(err)
  }
}

export async function register(
  data: RegisterDto
): Promise<{ access_token: string }> {
  try {
    const res = await axios.post<{ access_token: string }>(
      `/auth/register`,
      data
    )
    return res.data
  } catch (err: any) {
    return Promise.reject(err)
  }
}

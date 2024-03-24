import axios from '../plugins/axios';
import { UpdateUserRoleDto, User } from '../types/userTypes';

export async function getAllUsers(): Promise<User[]> {
  try {
    const res = await axios.get<User[]>(`/user/all`);
    return res.data;
  } catch (err) {
    return Promise.reject(err)
    }
  }

  export async function updateUserRole(data: UpdateUserRoleDto): Promise<User> {
    try {
      const res = await axios.patch<User>(`/user/role`, data);
      return res.data;
    } catch (err) {
      return Promise.reject(err)
      }
    }

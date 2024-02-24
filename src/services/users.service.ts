import axios from '../plugins/axios';
import { UpdateUserDto, User } from '../types/userTypes';

export async function getAllUsers(): Promise<User[]> {
  try {
    const res = await axios.get<User[]>(`/user/all`);
    return res.data;
  } catch (err) {
    return Promise.reject(err)
    }
  }

  export async function updateUser(data: UpdateUserDto): Promise<User> {
    try {
      const res = await axios.patch<User>(`/user`, data);
      return res.data;
    } catch (err) {
      return Promise.reject(err)
      }
    }

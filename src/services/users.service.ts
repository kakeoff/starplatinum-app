import axios from '../js/plugins/index';
import { User } from '../types/userTypes';

export async function getAllUsers(): Promise<User[]> {
  try {
    const response = await axios.get<User[]>(`/user/all`);
    return response.data;
  } catch (err) {
    return Promise.reject(err)
    }
  }

  export async function updateUser(data: User): Promise<User> {
    try {
      const response = await axios.patch<User>(`/user`, data);
      return response.data;
    } catch (err) {
      return Promise.reject(err)
      }
    }

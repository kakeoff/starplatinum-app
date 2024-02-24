import axios from '../plugins/axios';
import { User } from '../types/userTypes';

export async function getMe(): Promise<User> {
  try {
    const res = await axios.get<User>(`/user/me`);
    return res.data;
  } catch (err) {
    return Promise.reject(err)
    }
  }

import axios from '../js/plugins/index';
import { User } from '../types/userTypes';

export async function getMe() {
  try {
    const response = await axios.get<User>(`/user/me`);
    return response.data;
  } catch (err) {
    return Promise.reject(err)
    }
  }

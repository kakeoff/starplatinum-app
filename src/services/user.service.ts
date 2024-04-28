import { mapFileUrl } from '@/plugins/helpers';
import axios from '../plugins/axios';
import { UpdateMeDto, User } from '../types/userTypes';

export async function getMe(): Promise<User> {
  try {
    const res = await axios.get<User>(`/user/me`);
    res.data.avatarUrl = mapFileUrl(res.data.avatarUrl)
    return res.data;
  } catch (err) {
    return Promise.reject(err)
    }
  }

  export async function updateMe(data: UpdateMeDto): Promise<User> {
    try {
      const res = await axios.patch<User>(`/user/me`, data);
      res.data.avatarUrl = mapFileUrl(res.data.avatarUrl)
      return res.data;
    } catch (err) {
      return Promise.reject(err)
      }
    }

    export async function changePassword(data: {old: string, new: string}): Promise<string> {
      try {
        const res = await axios.patch<string>(`/user/password`, data);
        return res.data;
      } catch (err) {
        return Promise.reject(err)
        }
      }

import axios from '../plugins/axios';
import { UploadFileResponse } from '../types/fileTypes';
import { UpdateMeDto, User } from '../types/userTypes';

export async function getMe(): Promise<User> {
  try {
    const res = await axios.get<User>(`/user/me`);
    return res.data;
  } catch (err) {
    return Promise.reject(err)
    }
  }

  export async function updateMe(data: UpdateMeDto): Promise<User> {
    try {
      const res = await axios.patch<User>(`/user/me`, data);
      return res.data;
    } catch (err) {
      return Promise.reject(err)
      }
    }


  export async function uploadAvatar(file: FormData): Promise<string> {
    try {
      const res = await axios.post<UploadFileResponse[]>(`/files/upload`, file);
      console.log(res)
      return res.data[0].filename
    } catch (err) {
      return Promise.reject(err)
      }
    }

import { ElNotification } from 'element-plus';
import axios from '../plugins/axios';

export async function login(login: string, password: string): Promise<{access_token: string}> {
  try {
    const res = await axios.post<{access_token: string}>(`/auth/login`, {
      login,
      password,
    });
    return res.data;
  } catch (err: any) {
    if (err.response.data.message === 'User does not exists') {
      ElNotification({
        title: "Ошибка авторизации",
        message: "Пользователя с такими данными не существует",
        type: "error",
      });
    } else if (err.response.data.message === 'Incorrect password') {
      ElNotification({
        title: "Ошибка авторизации",
        message: "Неправильный пароль",
        type: "error",
      });
    }
    return Promise.reject(err)
  }

}

export async function register(login: string, password: string): Promise<{message: string}> {
  try {
    const res = await axios.post<{message: string}> (`/auth/register`, {
      login,
      password,
    });
    return res.data;
  } catch (err: any) {
    if (err.response.data.message === 'User is already exists') {
      ElNotification({
        title: "Ошибка регистрации",
        message: "Пользователь с такими данными уже существует",
        type: "error",
      });
    }
    return Promise.reject(err)
  }

}

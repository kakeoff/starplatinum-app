import { ElNotification } from 'element-plus';
import axios from '../js/plugins/index';

export async function login(login: string, password: string) {
  try {
    const response = await axios.post(`/auth/login`, {
      login,
      password,
    });
    return response;
  } catch (err) {
    if (err.response.data.message === 'User does not exists') {
      ElNotification({
        title: "Ошибка авторизации",
        message: "Пользователя с такими данными не существует",
        type: "error",
      });
      return
    } else if (err.response.data.message === 'Incorrect password') {
      ElNotification({
        title: "Ошибка авторизации",
        message: "Неправильный пароль",
        type: "error",
      });
      return
    } else {
       return Promise.reject(err)
    }
  }

}

export async function register(login: string, password: string) {
  try {
    const response = await axios.post(`/auth/register`, {
      login,
      password,
    });
    return response;
  } catch (err) {
    if (err.response.data.message === 'User is already exists') {
      ElNotification({
        title: "Ошибка регистрации",
        message: "Пользователь с такими данными уже существует",
        type: "error",
      });
      return
    } else {
       return Promise.reject(err)
    }
  }

}

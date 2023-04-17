import axios from 'axios';
import { ElNotification } from 'element-plus';

const API_URL = 'http://localhost:3000';

// вход пользователя в систему
export async function login(login: string, password: string) {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
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

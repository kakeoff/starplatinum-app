import axios from 'axios';

const API_URL = 'http://localhost:3000';

// вход пользователя в систему
export async function login(login: string, password: string) {
  const response = await axios.post(`${API_URL}/auth/login`, {
    login,
    password,
  });
  return response;
}

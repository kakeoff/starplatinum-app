import axios from 'axios';
import { ElNotification } from 'element-plus';

const BASE_URL = 'http://localhost:3000';


export async function getAllPublications() {
  try {
    const res = await axios.get(`${BASE_URL}/publications`);
      return res
  } catch (error) {
    ElNotification({
      title: "Ошибка при получении изданий",
      type: "error",
    });
    return Promise.reject(error)
  }
}

export async function createPublication(data) {
  try {
    const res = await axios.post(`${BASE_URL}/publications`, data);
    ElNotification({
      title: "Издание успешно добавлено",
      type: "success",
    });
      return res
  } catch (error) {
    ElNotification({
      title: "Ошибка при добавлении издания",
      type: "error",
    });
    return Promise.reject(error)
  }
}

export async function updatePublication(data) {
  try {
    const res = await axios.patch(`${BASE_URL}/publications/${data.id}`, data);
    ElNotification({
      title: "Издание успешно изменено",
      type: "success",
    });
      return res
  } catch (error) {
    ElNotification({
      title: "Ошибка при изменении издания",
      type: "error",
    });
    return Promise.reject(error)
  }
}

export async function deletePublication(id: number) {
  try {
    await axios.delete(`${BASE_URL}/publications/${id}`);
    ElNotification({
      title: "Издание удалено",
      type: "success",
    });
  } catch (error) {
    ElNotification({
      title: "Ошибка при удалении издания",
      type: "error",
    });
    return Promise.reject(error)
  }
}

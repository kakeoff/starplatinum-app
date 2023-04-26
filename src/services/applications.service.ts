import axios from 'axios';
import { ElNotification } from 'element-plus';

const BASE_URL = 'http://localhost:3000';


export async function getAllApplications() {
  try {
    const res = await axios.get(`${BASE_URL}/applications`);
      res.data.forEach((item) => {
        item.pubs = JSON.parse(item.pubs)
      })
      console.log(res)
      return res
  } catch (error) {
    ElNotification({
      title: "Ошибка при получении заявок",
      type: "error",
    });
    return Promise.reject(error)
  }
}

export async function sendApplication(data) {
  try {
    const res = await axios.post(`${BASE_URL}/applications`, data);
    res.data.pubs = JSON.parse(res.data.pubs)
    ElNotification({
      title: "Заявка отправлена",
      type: "success",
    });
      return res
  } catch (error) {
    ElNotification({
      title: "Ошибка при отправке заявки",
      type: "error",
    });
    return Promise.reject(error)
  }
}

export async function changeApplicationStatus(id: number, status: string) {
  try {
    const res = await axios.patch(`${BASE_URL}/applications/${id}/status`, {status});
    ElNotification({
      title: `Статус заявки изменен`,
      type: "success",
    });
      return res
  } catch (error) {
    ElNotification({
      title: `Ошибка при изменении статуса заявки`,
      type: "error",
    });
    return Promise.reject(error)
  }
}

export async function deleteApplication(applicationId: number) {
  try {
    await axios.delete(`${BASE_URL}/applications/${applicationId}`);
    ElNotification({
      title: "Заявка удалена",
      type: "success",
    });
  } catch (error) {
    ElNotification({
      title: "Ошибка при удалении заявки",
      type: "error",
    });
    return Promise.reject(error)
  }
}

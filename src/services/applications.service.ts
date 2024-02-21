import { ElNotification } from 'element-plus';
import axios from '../js/plugins';


export async function getAllApplications() {
  try {
    const res = await axios.get(`/applications`);
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
    const res = await axios.post(`/applications`, data);
    ElNotification({
      title: "Заявка отправлена",
      message: 'Мы свяжемся с Вами для уточнения деталей',
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
    const res = await axios.patch(`/applications/${id}/status`, {status});
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
    await axios.delete(`/applications/${applicationId}`);
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

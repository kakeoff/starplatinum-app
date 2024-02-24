import { ElNotification } from 'element-plus';
import axios from '../plugins/axios';
import { Application, SendApplicationDto } from '../types/applicationTypes';


export async function getAllApplications(): Promise<Application[]> {
  try {
    const res = await axios.get<Application[]>(`/applications`);
      return res.data
  } catch (error) {
    ElNotification({
      title: "Ошибка при получении заявок",
      type: "error",
    });
    return Promise.reject(error)
  }
}

export async function sendApplication(data: SendApplicationDto): Promise<Application> {
  try {
    const res = await axios.post<Application>(`/applications`, data);
    ElNotification({
      title: "Заявка отправлена",
      message: 'Мы свяжемся с Вами для уточнения деталей',
      type: "success",
    });
      return res.data
  } catch (error) {
    ElNotification({
      title: "Ошибка при отправке заявки",
      type: "error",
    });
    return Promise.reject(error)
  }
}

export async function changeApplicationStatus(id: number, status: string): Promise<Application> {
  try {
    const res = await axios.patch<Application>(`/applications/${id}/status`, {status});
    ElNotification({
      title: `Статус заявки изменен`,
      type: "success",
    });
      return res.data
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

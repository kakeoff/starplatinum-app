import { ElNotification } from 'element-plus';
import axios from '../plugins/axios';
import { CreatePublicationDto, Publication } from '../types/publicationTypes';


export async function getAllPublications(): Promise<Publication[]> {
  try {
    const res = await axios.get<Publication[]>(`/publications`);
      res.data.map((i) => i.imageUrl = 'https://www.hlp.city/wp-content/uploads/2023/10/denys-nevozhai-2vmT5_FeMck-unsplash-scaled-e1698768382637.jpg')
      return res.data
  } catch (error) {
    ElNotification({
      title: "Ошибка при получении изданий",
      type: "error",
    });
    return Promise.reject(error)
  }
}

export async function createPublication(data: CreatePublicationDto): Promise<Publication> {
  try {
    const res = await axios.post<Publication>(`/publications`, data);
    ElNotification({
      title: "Издание успешно добавлено",
      type: "success",
    });
      return res.data
  } catch (error) {
    ElNotification({
      title: "Ошибка при добавлении издания",
      type: "error",
    });
    return Promise.reject(error)
  }
}

export async function updatePublication(data: Publication): Promise<Publication> {
  try {
    const res = await axios.patch<Publication>(`/publications/${data.id}`, data);
    ElNotification({
      title: "Издание успешно изменено",
      type: "success",
    });
      return res.data
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
    await axios.delete(`/publications/${id}`);
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

import { mapFileUrl } from '@/plugins/helpers'
import { ElNotification } from 'element-plus'
import axios from '../plugins/axios'
import {
  CreatePublicationDto,
  Publication,
  UpdatePublicationDto
} from '../types/publicationTypes'


export async function getAllPublications(): Promise<Publication[]> {
  try {
    const res = await axios.get<Publication[]>(`/publications`)
    res.data.map((item) => item.imageUrl =  item.imageUrl ? mapFileUrl(item.imageUrl) : undefined)
    return res.data
  } catch (error) {
    ElNotification({
      title: 'Ошибка при получении изданий',
      type: 'error'
    })
    return Promise.reject(error)
  }
}

export async function createPublication(
  data: CreatePublicationDto
): Promise<Publication> {
    const res = await axios.post<Publication>(`/publications`, data)
    res.data.imageUrl = res.data.imageUrl ? mapFileUrl(res.data.imageUrl) : undefined
    return res.data
}

export async function updatePublication(
  data: UpdatePublicationDto
): Promise<Publication> {
  const res = await axios.patch<Publication>(`/publications/${data.id}`, data)
  res.data.imageUrl = res.data.imageUrl ? mapFileUrl(res.data.imageUrl) : undefined

  return res.data
}

export async function deletePublication(id: number) {
  try {
    await axios.delete(`/publications/${id}`)
    ElNotification({
      title: 'Издание удалено',
      type: 'success'
    })
  } catch (error) {
    ElNotification({
      title: 'Ошибка при удалении издания',
      type: 'error'
    })
    return Promise.reject(error)
  }
}

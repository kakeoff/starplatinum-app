import { ApplicationStatus } from '@/types/applicationTypes'

export function isAuthenticated(): boolean {
  const token = localStorage.getItem('accessToken')
  return token !== null && token !== undefined
}

export const localizeApplicationStatus = (status: ApplicationStatus) => {
  const applicationStatus = {
    ACCEPTED: 'Одобрена',
    PENDING: 'Ожидание',
    CANCELED: 'Отменена'
  }
  return applicationStatus[status]
}

export const mapFileUrl = (val: string) =>
  `${import.meta.env.VITE_SERVER_URL}${val}`

export const getHoursDifference = (date1: Date, date2: Date): number => {
  const differenceInMilliseconds = date2.getTime() - date1.getTime()
  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60)
  return Math.ceil(differenceInHours)
}

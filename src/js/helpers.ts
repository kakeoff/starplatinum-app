
export function isAuthenticated () {
  const token = localStorage.getItem('accessToken')
  return token !== null && token !== undefined
}

export const localizeApplicationStatus = (status: string) => {
  const applicationStatus = {
    ACCEPTED: 'Одобрена',
    PENDING: 'Ожидание',
    CANCELED: 'Отменена'
  }
  return applicationStatus[status]
}

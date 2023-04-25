
export function isAuthenticated () {
  const token = localStorage.getItem('access_token')
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

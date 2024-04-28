
export function isAuthenticated(): boolean {
  const token = localStorage.getItem('accessToken')
  return token !== null && token !== undefined
}

const applicationStatus = {
  ACCEPTED: 'Одобрена',
  PENDING: 'Ожидание',
  CANCELED: 'Отменена'
};

export const localizeApplicationStatus = (status: keyof typeof applicationStatus) => {
  return applicationStatus[status];
};

export const mapFileUrl = ((val: string) => `${import.meta.env.VITE_SERVER_URL}${val}`)

export type Application = {
  name: string,
  comment: string | null,
  email: string,
  pubs: Pub[],
  cost: number,
  status: ApplicationStatus
}

export type Pub = {
  name: string,
  date: string,
  cost: number
}

export type ApplicationStatus = 'ACCEPTED' | 'PENDING' | 'CANCELED'
export type ApplicationLocalization = { [key in ApplicationStatus]: string }

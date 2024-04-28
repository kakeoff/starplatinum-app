export type Application = {
  id: number
  comment: string | null,
  pubs: Pub[],
  cost: number,
  status: ApplicationStatus
  userId: number
  createdAt: string
}

export type SendApplicationDto = {
  comment: string | null,
  pubs: PubDto[],
  cost: number,
}

export type Pub = {
  id: number,
  name: string,
  date: string,
  cost: number
}

export type PubDto = {
  id: number,
  name: string,
  date: string,
}

export type ApplicationStatus = 'ACCEPTED' | 'PENDING' | 'CANCELED'
export type ApplicationLocalization = { [key in ApplicationStatus]: string }

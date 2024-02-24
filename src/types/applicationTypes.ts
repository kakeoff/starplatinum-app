export type Application = {
  id: number
  name: string,
  comment: string | null,
  email: string,
  pubs: Pub[],
  cost: number,
  status: ApplicationStatus
}

export type SendApplicationDto = {
  name: string,
  comment: string | null,
  email: string,
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

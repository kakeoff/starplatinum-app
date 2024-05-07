export type Publication = {
  id: number
  name: string
  description: string
  link: string
  cost: number
  imageUrl: string | undefined
}

export type CreatePublicationDto = {
  name: string
  description: string
  link: string
  cost: number
  imageUrl?: string
}

export type UpdatePublicationDto = {
  id: number
  name?: string
  description?: string
  link?: string
  cost?: number
  imageUrl?: string
}

export type FormPublication = {
  id: number
  name: string
  date: string
  hoursCount: number
  cost: number
}

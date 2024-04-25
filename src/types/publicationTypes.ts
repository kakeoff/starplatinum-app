export type Publication = {
  id: number
  name: string,
  description: string,
  link: string,
  cost: number,
  imageUrl: string
}

export type CreatePublicationDto = {
  name: string,
  description: string,
  link: string,
  cost: number
}

export type FormPublication = {
  id: number
  name: string,
  date: string
}

export type Application = {
  name: string,
  comment: string | null,
  email: string,
  pubs: Pub[],
  cost: number
}

export type Pub = {
  name: string,
  date: string,
  cost: number
}

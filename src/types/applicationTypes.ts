export type Application = {
  name: string,
  comment: string | null,
  email: string,
  pubs: Pub[]
}

export type Pub = {
  name: string,
  date: string
}

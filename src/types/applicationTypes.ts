export type Application = {
  name: string,
  comment: string,
  pubs: Pub[]
}

export type Pub = {
  name: string,
  date: string
}

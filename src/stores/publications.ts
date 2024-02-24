import { defineStore } from "pinia";
import * as Api from '../services/publications.services';
import { CreatePublicationDto, Publication } from "../types/publicationTypes";

export const pubsStore = defineStore({
  id: 'publications',
  state: () => ({
    publications: [
    ] as Publication[]
  }),
  actions: {
    async createPublication(pub: CreatePublicationDto) {
      const publication = await Api.createPublication(pub)
      this.publications.push(publication)
    },
    async updatePublication(pub: Publication) {
      const data = {
        id: pub.id,
        name: pub.name,
        description: pub.description,
        cost: pub.cost,
        link: pub.link
      }
      const publication = await Api.updatePublication(data)
      const index = this.publications.findIndex((pub) => pub.id === data.id)
      if (index !== -1) {
        this.publications[index] = publication
      }
    },
  async deletePublication(id: number) {
    await Api.deletePublication(id)
    const index = this.publications.findIndex((pub) => pub.id === id)
    if (index !== -1) {
      this.publications.splice(index, 1)
    }
  },
    async getAllPublications() {
      const publications = await Api.getAllPublications()
      this.publications = publications
      return publications
    },
  }
})

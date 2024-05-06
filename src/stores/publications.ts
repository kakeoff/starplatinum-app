import { defineStore } from 'pinia'
import * as Api from '../services/publications.services'
import {
  CreatePublicationDto,
  Publication,
  UpdatePublicationDto
} from '../types/publicationTypes'

export const pubsStore = defineStore({
  id: 'publications',
  state: () => ({
    publications: [] as Publication[]
  }),
  actions: {
    async createPublication(pub: CreatePublicationDto) {
      const publication = await Api.createPublication(pub)
      this.publications.push(publication)
    },
    async updatePublication(pub: UpdatePublicationDto) {
      const publication = await Api.updatePublication(pub)
      const index = this.publications.findIndex((_pub) => _pub.id === pub.id)
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
    }
  }
})

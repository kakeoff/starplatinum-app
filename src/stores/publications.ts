import { defineStore } from "pinia";
import * as Api from '../services/publications.services';
import { Publication } from "../types/publicationTypes";

export const pubsStore = defineStore({
  id: 'publications',
  state: () => ({
    publications: [
    ] as Publication[]
  }),
  actions: {
    async createPublication(pub: Publication) {
      const data = {
        name: pub.name,
        description: pub.description,
        cost: pub.cost,
        link: pub.link
      }
      const res = await Api.createPublication(data)
      this.publications.push(res.data)
    },
    async updatePublication(pub: Publication) {
      const data = {
        id: pub.id,
        name: pub.name,
        description: pub.description,
        cost: pub.cost,
        link: pub.link
      }
      const res = await Api.updatePublication(data)
      const index = this.publications.findIndex((pub) => pub.id === data.id)
      if (index !== -1) {
        this.publications[index] = res.data
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
      const res = await Api.getAllPublications()
      this.publications = res.data
      return res.data
    },
  }
})

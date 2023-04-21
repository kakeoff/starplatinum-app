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
      this.applications.push(res.data)
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
      console.log(this.publications)
      return res.data
    },
  }
})

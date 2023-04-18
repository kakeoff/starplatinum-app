import { defineStore } from "pinia";
import * as Api from '../services/applications.service';
import { Application } from "../types/applicationTypes";

export const applicationsStore = defineStore({
  id: 'applications',
  state: () => ({
    applications: [
    ] as Application[]
  }),
  actions: {
    async sendApplication(app: Application) {
      const data = {
        name: app.name,
        email: app.email,
        comment: app.comment,
        pubs: JSON.stringify(app.pubs),
        cost: app.cost
      }
      const res = await Api.sendApplication(data)
      this.applications.push(res.data)
    },
  async deleteApplication(applicationId: number) {
    await Api.deleteApplication(applicationId)
    const index = this.applications.findIndex((app) => app.id === applicationId)
    if (index !== -1) {
      this.applications.splice(index, 1)
    }
  },
    async getAllApplications() {
      const res = await Api.getAllApplications()
      res.data.forEach((item: Application) => {
        Array.from(item.pubs)
      })
      this.applications = res.data
      console.log(this.applications)


      return res.data
    },
  }
})

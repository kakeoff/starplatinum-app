import { defineStore } from "pinia";
import * as Api from '../services/applications.service';
import { Application, ApplicationStatus, SendApplicationDto } from "../types/applicationTypes";

export const applicationsStore = defineStore({
  id: 'applications',
  state: () => ({
    applications: [
    ] as Application[]
  }),
  actions: {
    async sendApplication(app: SendApplicationDto) {
      const data = {
        name: app.name,
        email: app.email,
        comment: app.comment,
        pubs: app.pubs,
        cost: app.cost
      }
      const application = await Api.sendApplication(data)
      this.applications.push(application)
      return application
    },
    async changeApplicationStatus(id: number, status: ApplicationStatus) {
      const application = await Api.changeApplicationStatus(id, status)
      const index = this.applications.findIndex((app) => app.id === id)
      if (index === -1) return
      this.applications[index].status = application.status
      return application
    },
  async deleteApplication(applicationId: number) {
    await Api.deleteApplication(applicationId)
    const index = this.applications.findIndex((app) => app.id === applicationId)
    if (index !== -1) {
      this.applications.splice(index, 1)
    }
  },
    async getAllApplications() {
      const applications = await Api.getAllApplications()
      applications.forEach((item: Application) => {
        Array.from(item.pubs)
      })
      this.applications = applications

      return applications
    },
  }
})

import { defineStore } from 'pinia'
import * as Api from '../services/applications.service'
import {
  Application,
  ApplicationStatus,
  SendApplicationDto
} from '../types/applicationTypes'

export const applicationsStore = defineStore({
  id: 'applications',
  state: () => ({
    applications: [] as Application[],
    userApplications: [] as Application[]
  }),
  getters: {
    applicationsCountByUserId(state) {
      if (!state.applications) return {}

      return state.applications.reduce<{ [key: number]: number }>(
        (acc, application) => {
          acc[application.userId] = (acc[application.userId] || 0) + 1
          return acc
        },
        {}
      )
    }
  },
  actions: {
    async sendApplication(app: SendApplicationDto) {
      const data = {
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
      this.changeApplicationStatusLocally(application.id, application.status)
      return application
    },
    changeApplicationStatusLocally(id: number, status: ApplicationStatus) {
      const commonIndex = this.applications.findIndex((app) => app.id === id)
      if (commonIndex === -1) return
      this.applications[commonIndex].status = status

      const userIndex = this.userApplications.findIndex((app) => app.id === id)
      if (userIndex === -1) return
      this.userApplications[userIndex].status = status
    },
    async deleteApplication(applicationId: number) {
      await Api.deleteApplication(applicationId)
      this.deleteApplicationLocally(applicationId)
    },
    deleteApplicationLocally(applicationId: number) {
      const commonIndex = this.applications.findIndex(
        (app) => app.id === applicationId
      )
      if (commonIndex !== -1) {
        this.applications.splice(commonIndex, 1)
      }
      const userIndex = this.userApplications.findIndex(
        (app) => app.id === applicationId
      )
      if (userIndex !== -1) {
        this.userApplications.splice(userIndex, 1)
      }
    },
    async getAllApplications() {
      const applications = await Api.getAllApplications()
      this.applications = applications

      return applications
    },

    async getUserApplications(userId: number) {
      const applications = await Api.getUserApplications(userId)
      this.userApplications = applications

      return applications
    },
    async deleteMyApplication(applicationId: number) {
      await Api.deleteMyApplication(applicationId)
      this.deleteApplicationLocally(applicationId)
    }
  }
})

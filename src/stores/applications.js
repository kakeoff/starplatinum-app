import { defineStore } from "pinia";

export const applicationsStore = defineStore({
  id: 'applications',
  state: () => ({
    applications: []
  }),
  actions: {
    sendApplication(app) {
      console.log(app)
      this.applications.push(app)
    }
  }
})

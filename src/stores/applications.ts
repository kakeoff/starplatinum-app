import { defineStore } from "pinia";
import { Application } from "../types/applicationTypes";

export const applicationsStore = defineStore({
  id: 'applications',
  state: () => ({
    applications: [] as Application[]
  }),
  actions: {
    sendApplication(app) {
      console.log(app)
      this.applications.push(app)
    }
  }
})

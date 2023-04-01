import { defineStore } from "pinia";
import { Application } from "../types/applicationTypes";

export const applicationsStore = defineStore({
  id: 'applications',
  state: () => ({
    applications: [
      {
        name: 'ООО Зеленоглазое такси',
        email: 'greenTaxi@gmail.com',
        comment: 'comment',
        pubs: [
          {
            name: 'GetBrand',
            date: '26.08.2004'
          },
          {
            name: 'Izdanie2',
            date: '26.08.2005'
          }
        ]
      }
    ] as Application[]
  }),
  actions: {
    sendApplication(app) {
      console.log(app)
      this.applications.push(app)
    }
  }
})

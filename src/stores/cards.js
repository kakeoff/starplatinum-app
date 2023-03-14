import { defineStore } from "pinia";

export const cardStore = defineStore({
  id: "publications",
  state: () => ({
    cards: {
      getBrand: {
        name: "Getbrand",
        preview: "/assets/screenshots/getbrand.jpeg",
        description: "GETBRAND создаёт облик новых товаров и компаний, работает над формированием и развитием брендов; разрабатывает элементы корпоративной идентификации, создаёт дизайн упаковки и ключевые изображения для рекламы; занимается оформлением мест продаж.",
        appLink: "",
        prefix: "",
        repo: "",
      },

      russOutDoor: {
        name: "Russ Outdoor",
        preview: "/assets/screenshots/russ-outdoor.jpeg",
        description: "Крупнейший российский оператор наружной рекламы. В рекламной сети Russ Outdoor: билборды стандартных форматов, уличная мебель, рекламоносители больших и сверхбольших форматов, цифровые экраны, реклама в аэропортах, реклама в супермаркетах и торговых центрах.",
        appLink: "tracking-rickandmorty.netlify.app",
        prefix: "https://",
        repo: "",
      },

      abstract: {
        name: "Abstract",
        preview: "/assets/screenshots/abstract_light_preview.png",
        description:
          "Abtract is a small web app that provides free wallpapers i've made with Figma. This new version is based on Vue 3 and Tailnd CSS.",
        prefix: "https://",
        appLink: "abstract-wallpapers.netlify.app",
        repo: "https://github.com/imStav/abstract",
      },

      dbz: {
        name: "DBZ JS",
        preview: "/assets/screenshots/dbz-js_preview.png",
        description:
          "DBZ JS for 'Dragon Ball FighterZ JavaScript', is a simple JS program that takes 2 random fighters, launches a brawl and return the winner by an alert.",
        prefix: "",
        appLink: "",
        repo: "https://github.com/imStav/dbz-js",
      },

      undefined: {
        name: "Pop School undefined",
        preview: "/assets/screenshots/pop-undefined_preview.png",
        description:
          "A little Vanilla JavaScript project that just aims to introduce my current Pop School class composition. Made using a dedicated API. #undefined",
        prefix: "https://",
        appLink: "pop-undefined.netlify.app",
        repo: "https://github.com/imStav/popschool-undefined",
      },

      publicationsTemplate: {
        name: "publications template",
        preview: "/assets/screenshots/portfolio-template_dark_preview.png",
        description:
          "A free and open source portfolio template for developers that just look for a ready-to-go and minimal website. Based on VitePress.",
        prefix: "",
        appLink: "",
        repo: "https://github.com/imStav/portfolio-template",
      },

      // nuxtContentBlog: {
      //   name: "Nuxt Content Blog template",
      //   preview: "/assets/screenshots/blog-screenshot-dark.PNG",
      //   description:
      //     "A Nuxt Content blog template. Based on Nuxt 3, Nuxt Content v2 and Tailwind CSS (+Tailwind Typography).",
      //   prefix: "",
      //   appLink: "",
      //   repo: "https://github.com/imStav/nuxt-content-blog",
      // },
    },
  }),
});

import { defineStore } from "pinia";

export const cardStore = defineStore({
  id: "publications",
  state: () => ({
    cards: [
      {
        name: "Getbrand",
        preview: "/assets/screenshots/getbrand.jpeg",
        description: "GETBRAND создаёт облик новых товаров и компаний, работает над формированием и развитием брендов; разрабатывает элементы корпоративной идентификации, создаёт дизайн упаковки и ключевые изображения для рекламы; занимается оформлением мест продаж.",
        appLink: "",
        prefix: "",
        repo: "https://www.getbrand.ru",
      },

     {
        name: "Russ Outdoor",
        preview: "/assets/screenshots/russ-outdoor.jpeg",
        description: "Крупнейший российский оператор наружной рекламы. В рекламной сети Russ Outdoor: билборды стандартных форматов, уличная мебель, рекламоносители больших и сверхбольших форматов, цифровые экраны, реклама в аэропортах, реклама в супермаркетах и торговых центрах.",
        appLink: "",
        prefix: "",
        repo: "https://www.russoutdoor.ru",
      },

      {
        name: "Adv Group",
        preview: "/assets/screenshots/adv-group.jpeg",
        description:
          "Лидирующая группа маркетинговых коммуникаций в России, предоставляющая широкий спектр компетенций в digtial, медиа, маркетинге, брендинге и PR. Сегодня Группа АДВ объединяет 22 специализированных коммуникационных агентства.",
        prefix: "",
        appLink: "",
        repo: "https://advgroup.ru",
      },

      {
        name: "Public Totem",
        preview: "/assets/screenshots/public-totem.jpeg",
        description:
          "Рекламно-производственная компания Public Totem производит долгосрочные и краткосрочные промо-конструкции и POS-материалы для выкладки и продвижения товаров в местах продаж.",
        prefix: "",
        appLink: "",
        repo: "https://www.publictotem.ru",
      },

      {
        name: "Gallery",
        preview: "/assets/screenshots/gallery.jpeg",
        description:
          "Компания Gallery с 1994 года работает на рынке наружной рекламы и является одним из крупнейших операторов наружной рекламы в России. Gallery осуществляет полный комплекс услуг по созданию, установке и обслуживанию рекламных конструкций: билборды и суперборды, цифровые экраны и конструкции крупного формата, уличная мебель и дорожные указатели.",
        prefix: "",
        appLink: "",
        repo: "https://www.gallerymedia.com",
      },

      {
        name: "Mediascope",
        preview: "/assets/screenshots/mediascope.jpeg",
        description:
          "Компания «Медиаскоп» осуществляет полный цикл работ в области медиа-измерений и мониторинга рекламы: измерение аудитории в интернете и прессе, на радио и телевидении; мониторинговые исследования, оценка рекламы и эффективность спонсорства.",
        prefix: "",
        appLink: "",
        repo: "https://mediascope.net",
      },
    ],
  }),
});

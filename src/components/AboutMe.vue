<template>
  <div><FaqComponent v-motion-pop /></div>
  <h2 class="category-heading mt-[50px]">Наши издания</h2>
  <div class="demo-collapse my-[20px]">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item
        class="hover:scale-[1.02] hover:transition duration-300"
        v-for="(pub, index) in pubs"
        :name="String(index)"
        :title="pub.name"
      >
        <a
          :href="pub.link"
          target="_blank"
          class="font-mono nav-link mt-[10px] text-white hover:transition duration-300"
        >
          <font-awesome-icon icon="fa-solid fa-link"></font-awesome-icon>
          <span class="nav-link-extension">Перейти на сайт</span>
        </a>
        <div>{{ pub.description }}</div>
        <div class="text-[18px] text-white">Цена: {{ pub.cost }} руб.</div>
      </el-collapse-item>
    </el-collapse>
    <h2 class="category-heading mt-[50px]">Поддержка</h2>

    <div class="mt-[20px]">
      Если у Вас возник вопрос или Вы столкнулись с какой-либо проблемой -
      свяжитесь с нами.
    </div>
    <div class="mb-[20px]">
      Наша служба поддержки обеспечит Вам оперативную помощь.
    </div>
    <div class="flex flex-row mt-[5px]">
      <a
        class="cta-btn w-fit hover:scale-105 hover:transition duration-300"
        href="tel:+79911126263"
      >
        <font-awesome-icon
          class="h-[16px] w-[16px]"
          icon="fa-solid fa-phone"
        ></font-awesome-icon>
      </a>
      <a
        class="cta-btn w-fit hover:scale-105 hover:transition duration-300"
        href="mailto:kakeparake@gmail.com"
      >
        <font-awesome-icon icon="fa-brands fa-google"></font-awesome-icon>
      </a>

      <a
        class="cta-btn w-fit hover:scale-105 hover:transition duration-300"
        href="https://goo.gl/maps/KV5vUc11qTc1zGN76"
        target="_blank"
      >
        <font-awesome-icon icon="fa-solid fa-map" />
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import FaqComponent from "../components/FaqComponent.vue";
import { pubsStore } from "../stores/publications";

onMounted(() => {
  activeNames.value = ["0"];
  storePubs.getAllPublications();
});
const pubs = ref([
  {
    id: 1,
    name: "Getbrand",
    description:
      "GETBRAND создаёт облик новых товаров и компаний, работает над формированием и развитием брендов; разрабатывает элементы корпоративной идентификации, создаёт дизайн упаковки и ключевые изображения для рекламы; занимается оформлением мест продаж.",
    link: "https://www.getbrand.ru",
    cost: 4000,
  },

  {
    id: 2,
    name: "Russ Outdoor",
    description:
      "Крупнейший российский оператор наружной рекламы. В рекламной сети Russ Outdoor: билборды стандартных форматов, уличная мебель, рекламоносители больших и сверхбольших форматов, цифровые экраны, реклама в аэропортах, реклама в супермаркетах и торговых центрах.",
    link: "https://www.russoutdoor.ru",
    cost: 5000,
  },

  {
    id: 3,
    name: "Adv Group",
    description:
      "Лидирующая группа маркетинговых коммуникаций в России, предоставляющая широкий спектр компетенций в digtial, медиа, маркетинге, брендинге и PR. Сегодня Группа АДВ объединяет 22 специализированных коммуникационных агентства.",
    link: "https://advgroup.ru",
    cost: 6000,
  },

  {
    id: 4,
    name: "Public Totem",
    description:
      "Рекламно-производственная компания Public Totem производит долгосрочные и краткосрочные промо-конструкции и POS-материалы для выкладки и продвижения товаров в местах продаж.",
    link: "https://www.publictotem.ru",
    cost: 4000,
  },

  {
    id: 5,
    name: "Gallery",
    description:
      "Компания Gallery с 1994 года работает на рынке наружной рекламы и является одним из крупнейших операторов наружной рекламы в России. Gallery осуществляет полный комплекс услуг по созданию, установке и обслуживанию рекламных конструкций: билборды и суперборды, цифровые экраны и конструкции крупного формата, уличная мебель и дорожные указатели.",
    link: "https://www.gallerymedia.com",
    cost: 7000,
  },

  {
    id: 6,
    name: "Mediascope",
    description:
      "Компания «Медиаскоп» осуществляет полный цикл работ в области медиа-измерений и мониторинга рекламы: измерение аудитории в интернете и прессе, на радио и телевидении; мониторинговые исследования, оценка рекламы и эффективность спонсорства.",
    link: "https://mediascope.net",
    cost: 3000,
  },
]);
const activeNames = ref(["1"]);
const storePubs = pubsStore();
const handleChange = (val: string[]) => {
  console.log(val);
};
</script>

<style>
.el-collapse-item__header {
  font-size: 23px;
  color: rgb(100, 116, 139);
  @apply from-cyan-500 to-indigo-500;
}
.el-collapse-item__content {
  font-size: 16px;
  color: rgb(100, 116, 139);
}
</style>

<script setup>
import { ref } from "vue";
const questions = ref([
  {
    question: "Кто мы такие?",
    answer:
      "Наше агенство занимается просмотром, обработкой и размещением заявок от рекламодателей в рекламных изданиях.",
  },
  {
    question: "Стоимость услуг",
    answer:
      "Стоимость размещения заявки зависит от выбранных изданий. Всю доступную информацию об изданиях и расценках Вы можете посмотреть в разделе 'О нас'.",
  },
  {
    question: "Как оставить заявку?",
    answer:
      "Форму для заполнения и отправки заявки Вы можете найти на главной странице по нажатию на кнопку 'Создать заявку'.",
  },
  {
    question: "Обратная связь",
    answer:
      "При создании заявки Вам необходимо указать Email, по которому мы в дальнейшем с Вами свяжемся.",
  },
]);
</script>

<template>
  <el-carousel
    class="mt-[50px] bg-gradient-to-r p-[10px] from-cyan-500 to-blue-500 rounded-[25px]"
    height="200px"
    trigger="click"
  >
    <el-carousel-item
      class="text-white text-center flex flex-col items-center"
      v-for="question in questions"
      :key="question.question"
    >
      <div class="font-[700] text-[40px] lg:text-[50px] w-full">
        {{ question.question }}
      </div>
      <div class="w-[85%] text-[18px] lg:text-[20px] line-clamp-4">
        {{ question.answer }}
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

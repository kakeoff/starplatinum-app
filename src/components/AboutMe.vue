<template>
  <div><CardTemplate v-motion-pop /></div>
  <h2 class="category-heading mt-[50px]">Информация</h2>
  <div class="demo-collapse my-[20px]">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="Кто мы такие?" name="1">
        <div>
          Наше агенство занимается просмотром, обработкой и размещением заявок
          от рекламодателей в рекламных изданиях.
        </div>
      </el-collapse-item>
      <el-collapse-item title="Стоимость услуг" name="2">
        <div>Стоимость размещения заявки зависит от выбранных изданий.</div>
        <div>
          Всю доступную информацию об изданиях и расценках Вы можете посмотреть
          в разделе "Издания".
        </div>
      </el-collapse-item>
      <el-collapse-item class="text-[40px]" title="Наши преимущества" name="4">
        <ul class="text-[16px] flex flex-col gap-[10px]">
          <li>
            <span class="text-gradient">Экспертиза и опыт</span> в различных
            областях маркетинга и рекламы.
          </li>
          <li>
            <span class="text-gradient">Экономия</span> времени и ресурсов для
            компании-клиента.
          </li>
          <li>
            <span class="text-gradient">Доступ</span> к последним технологиям и
            инструментам.
          </li>
          <li>
            <span class="text-gradient">Гибкость и адаптивность</span> к
            изменениям на рынке.
          </li>
          <li>
            <span class="text-gradient">Эффективность</span>
            в создании рекламных кампаний и проведении их анализа.
          </li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="Поддержка и связь" name="3">
        <div>
          Если у Вас возник вопрос или Вы столкнулись с какой-либо проблемой -
          свяжитесь с нами.
        </div>
        <div>Наша служба поддержки обеспечит Вам оперативную помощь.</div>
        <div>Связь с нами:</div>
        <div class="flex flex-row mt-[5px]">
          <div>
            <div id="phone" type="tel" class="cta-btn w-fit">
              <a href="tel:+79911126263">
                <font-awesome-icon
                  class="h-[16px] w-[16px]"
                  icon="fa-solid fa-phone"
                ></font-awesome-icon>
              </a>
            </div>
          </div>

          <div>
            <div class="cta-btn w-fit">
              <a href="mailto:kakeparake@gmail.com" title="Email me!">
                <font-awesome-icon
                  icon="fa-brands fa-google"
                ></font-awesome-icon>
              </a>
            </div>
          </div>

          <div>
            <div class="cta-btn w-fit">
              <a
                href="https://goo.gl/maps/KV5vUc11qTc1zGN76"
                target="_blank"
                title="Email me!"
              >
                <font-awesome-icon icon="fa-solid fa-map" />
              </a>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import CardTemplate from "../components/CardTemplate.vue";

onMounted(() => {
  activeNames.value = ["1"];
});

const activeNames = ref(["1"]);
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

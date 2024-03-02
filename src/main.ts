import { library } from "@fortawesome/fontawesome-svg-core";
import { faGoogle, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import {
  faCircleQuestion,
  faCodeBranch, faCommentDots, faFilm,
  faHouse,
  faLink,
  faMap, faPhone,
  faPlus, faRightFromBracket, faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { MotionPlugin } from "@vueuse/motion";
import 'animate.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";

library.add(
  faHouse,
  faFilm,
  faCircleQuestion,
  faCommentDots,
  faPlus,
  faLink,
  faUser,
  faRightFromBracket,
  faCodeBranch,
  faGoogle,
  faLinkedinIn,
  faMap,
  faPhone
);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(MotionPlugin);
app.use(ElementPlus);
app.component("font-awesome-icon", FontAwesomeIcon);

router.isReady().then(() => {
  app.mount('#app')
})

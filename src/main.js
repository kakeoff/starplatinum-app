import { MotionPlugin } from "@vueuse/motion";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import { createPinia } from "pinia";
import { createApp } from "vue";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faCircleQuestion,
  faCodeBranch,
  faCommentDots, faFilm,
  faHouse,
  faLink, faUser
} from "@fortawesome/free-solid-svg-icons";

import { faGoogle, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faMap, faPhone } from "@fortawesome/free-solid-svg-icons";
/* add icons to the library */
library.add(
  faHouse,
  faFilm,
  faCircleQuestion,
  faCommentDots,
  faLink,
  faUser,
  faCodeBranch,
  faGoogle,
  faLinkedinIn,
  faMap,
  faPhone
);

import "./index.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(MotionPlugin);
app.use(ElementPlus);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");

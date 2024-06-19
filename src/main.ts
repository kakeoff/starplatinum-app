import { MotionPlugin } from '@vueuse/motion'
import 'animate.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import ru from 'element-plus/es/locale/lang/ru'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(MotionPlugin)
app.use(ElementPlus, {
  locale: ru
})

router.isReady().then(() => {
  app.mount('#app')
})

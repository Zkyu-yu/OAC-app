import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/common.css'
import router from './router'
import { Tabbar, TabbarItem, Button  } from 'vant'

const app = createApp(App)
app.use(router).use(Tabbar).use(TabbarItem).use(Button).mount('#app')

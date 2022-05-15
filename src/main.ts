import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/common.css'
import '@fontsource/aldrich'
import '@fontsource/coda'
import router from './router'
import { Tabbar, TabbarItem, Button, NavBar, Swipe, SwipeItem, Col, Row, Icon, Popup, Field, CellGroup } from 'vant'

const app = createApp(App)
app
  .use(router)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Button)
  .use(NavBar)
  .use(Swipe)
  .use(SwipeItem)
  .use(Col)
  .use(Row)
  .use(Icon)
  .use(Popup)
  .use(Field)
  .use(CellGroup)
  .mount('#app')

import { createHead } from '@vueuse/head'

import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/index.less'
import 'uno.css'

import { setupGlobDirectives } from './directives'
import { router } from '~/router'
import { store } from '~/store'

const app = createApp(App)

// 插件自动加载
const modules = import.meta.globEager('./modules/*.ts')
Object.values(modules).forEach((v) => {
  if (typeof v.default === 'function')
    v.default(app)
})

app.use(createHead())
app.use(store)
app.use(router)

setupGlobDirectives(app)

app.mount('#app')

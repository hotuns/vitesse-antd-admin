import type { App } from 'vue'
import { createPinia } from 'pinia'

export default (app: App) => {
  const store = createPinia()
  app.use(store)
}

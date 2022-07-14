import { createApp } from 'vue'
import App from './App.vue'

// css reset
import '@/styles/reset.css'

// scss
import '@/styles/scss/index.scss'

import { pinia } from '@/store'

const app = createApp(App)

app.use(pinia)
app.mount('#app')

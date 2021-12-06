import { createApp } from 'vue'
import App from './App.vue'
import './mock'
import ServerSearchCascader from '../packages'

createApp(App).use(ServerSearchCascader).mount('#app')
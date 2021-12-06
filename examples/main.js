import { createApp } from 'vue'
import App from './App.vue'
import './mock'
import ServerSearchCascader from '../packages'

createApp(App).use(ServerSearchCascader).mount('#app');

// https://www.bianchengquan.com/article/142523.html
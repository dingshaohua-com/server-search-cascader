import { createApp } from 'vue'
import * as vue from 'vue'
import App from './App.vue'
import './mock'
import ServerSearchCascader from '../packages'

const app = createApp(App);
console.log('app', app);
app.use(ServerSearchCascader).mount('#app');

// https://www.bianchengquan.com/article/142523.html
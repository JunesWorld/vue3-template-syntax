// CDN
// import Vue from 'vue'

// CLI
// Vue 객체가 없다
import { createApp } from 'vue'
import App from './App'

// HTML에서 app이라는 값을 가지고 있는 해당 요소에 vue 프로젝트 연결
// 1. CDN
//Vue.createApp(App).mount('#app')

// 2. CLI
createApp(App).mount('#app')
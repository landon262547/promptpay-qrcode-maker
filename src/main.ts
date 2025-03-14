import '@/assets/base.css';

import "beercss";
import "material-dynamic-colors";

import i18n from './i18n';
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(i18n)

app.mount('#app')

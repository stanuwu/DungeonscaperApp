import './assets/main.css';

import axios from 'axios';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Quasar } from 'quasar';

import App from './App.vue';
import router from './router';

import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
import 'quasar/src/css/index.sass';

const app = createApp(App);

// setup axios
axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.timeout = 5000;

app.use(createPinia());
app.use(router);
app.use(Quasar, {
    plugins: {},
});

app.mount('#app');

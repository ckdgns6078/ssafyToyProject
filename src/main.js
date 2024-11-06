import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import axios from "axios";
import rest from "./assets/js/Rest";
loadFonts();

const app = createApp(App);
// createApp(App).use(router).use(vuetify).mount("#app");

//axios 기본 설정
// axios.defaults.baseURL = "http://localhost:8000";

//restAPI 호출 관련 js 전역 설정
app.config.globalProperties.$rest = rest;

app.use(router).use(vuetify).mount("#app");

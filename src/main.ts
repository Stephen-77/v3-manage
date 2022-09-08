import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import * as API from "./api/index";

// import "element-plus/dist/index.css";
import "element-plus/theme-chalk/el-message.css";
import "element-plus/theme-chalk/el-message-box.css";
import locale from "element-plus/lib/locale/lang/zh-cn"; //element-plus
import pinia from "./hooks/store";
import axios, { AxiosRequestConfig } from "axios";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


declare module "vue" {
  export interface ComponentCustomProperties {
    $API: any;
  }
}
// axios.interceptors.request.use((config) => {
//   //声明请求拦截器
//   if (localStorage.getItem("token")) {
//     console.log(localStorage.getItem("token"));
//     // config.headers!['authorization']!=localStorage.getItem('token')
//     config.headers!.Authorization = localStorage.getItem("token")!;
//     // config.headers!.token != localStorage.getItem("token");
//   }
//   return config;
// });
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.config.globalProperties.$API = API;

app.use(pinia);
app.use(router);
app.mount("#app");

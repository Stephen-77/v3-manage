import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";
import router from "../router";
const personRequest = axios.create({
  baseURL: "http://localhost:8888",
  timeout: 5000,
});

personRequest.interceptors.request.use((config: AxiosRequestConfig) => {
  if (localStorage.getItem("token")) {
    // config.headers!['authorization']!=localStorage.getItem('token')
    // axios.defaults.headers.common['Authorization']=localStorage.getItem("token")!;
    config.headers = { authorization: localStorage.getItem("token")! };
    // config.headers!.authorization != localStorage.getItem("token");
    // config.headers!.token != localStorage.getItem("token");
  }
  return config;
});
personRequest.interceptors.response.use(
  (res) => {
    if (res.data.status == 401) {
      ElMessage.warning("身份信息认证过期，请重新登录！");
      localStorage.removeItem('token')
      router.push({ name: "loginview" });
    }
    return res.data;
  },
  (err) => {
    return Promise.reject(new Error("error"));
  }
);
export default personRequest;

import { defineStore } from "pinia";
import { getTokenInfo, updateUser } from "../api";
import adminRouters from "../router/adminRouters";
import userRouters from "../router/userRouters";
import router from "../router";
import { ElMessage } from "element-plus";

export default defineStore("user", {
  actions: {
    async checkToken() {
      const res:any= await getTokenInfo();
      if (res.status==200) {
        this.nickname=res.data.uname
        return 'ok'
      }
      else{
        return 'error'
        // return Promise.reject(new Error('error'))
      }
    },
    async updateUser(value:any){
      const res:any=await updateUser(value.uid,value.role)
      if(res.code==200){
        ElMessage.success('修改权限成功,下次登录生效!')
        return 'ok'
      }
      else{
        return Promise.reject(new Error('修改失败'))
      }
    },
    async setRoutes() {
      const res:any=await getTokenInfo()
     
      if(res.data.role=='true'){
        await adminRouters.forEach((item: any) => {
          router.addRoute(item);
        });
        // this.routes = adminRouters;

      }
     else if(res.data.role=='false'){
      await userRouters.forEach((item: any) => {
        router.addRoute(item);
      });
            // this.routes = value;            
     }
     this.nickname=res.data.uname
      router.addRoute({
        path: "/:catchAll(.*)",
        name: "404",
        component: () => import("../components/404.vue"),
      });
    },
  },
  getters: {},
  state: () => ({
    token: "",
    nickname:'',
    routes: [],

  }),
});

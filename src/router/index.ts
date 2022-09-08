import {
  createRouter,
  createWebHashHistory,
  RouteRecordName,
} from "vue-router";
// import { us } from "../store/index";
import routes from "./routes";
import adminroutes from "./adminRouters";
import userStore from "../store/user";
import pinia from "../hooks/store";
let user = userStore(pinia);
const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: (to, from, savePositions) => {
    if (savePositions) {
      return savePositions;
    } else {
      return {
        top: 0,
      };
    }
  },
  routes,
});
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("token");
  if (token != "") {
    if (to.path === "/loginview") next();
    if (user.routes.length != 0) {
      // try {
      //   const res=await user.checkToken();
      //   console.log(res);
        
        next();
      // } catch (error) {
      //   ElMessage.warning("身份信息认证过期，请重新登录！");
      //   next("/loginview");
      // }
      // const res=await user.checkToken();
      // if(res=='ok') next()
      // else {
      //   ElMessage.warning("身份信息认证过期，请重新登录！");
      //   next("/loginview");
      // }

    }
    // console.log(router.hasRoute(to.name as RouteRecordName));
    if (router.hasRoute(to.name as RouteRecordName)) next();
    else {
      await user.setRoutes();
      next({ ...to, replace: true });
    }
  } else {
    if (to.path != "/loginview") {
      next("/loginview");
    } else {
      next();
    }
  }
});

export default router;

// import home from '../views/HomeView.vue'
const home = () => import("../views/HomeView.vue");
export default [
  {
    path: "/",
    name: "home",
    component: home,
    redirect: "/management",
    children: [
      {
        name: "role",
        path: "/role",
        component: () => import("../views/Role.vue"),
      },
      {
        name: "management",
        path: "/management",
        component: () => import("../views/Management.vue"),
        meta:{
          role:'tabbar',
          icon:'Setting',
          label:"权限管理"
        },
      },
      {
        name: "order",
        path: "/order",
        component: () => import("../views/Order.vue"),
        meta:{
          role:'tabbar',
          icon:'List',
          label:"订单管理"
        },
      },
      {
        name: "goods",
        path: "/goods",
        component: () => import("../views/Goods.vue"),
        meta:{
          role:'tabbar',
          icon:'Goods',
          label:"商品管理"
        },
      },
      {
        name: "bannerlist",
        path: "/bannerlist",
        component: () => import("../views/BannerList.vue"),
        meta:{
          role:'tabbar',
          icon:'Picture',
          label:"轮播图管理"
        },
      },
    ],
  },
];

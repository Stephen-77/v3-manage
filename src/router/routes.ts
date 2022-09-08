export default [
//   {
//     path: "/",
//     name: "home",
//     component: () => import("../views/HomeView.vue"),
//     redirect: "/order",
//     children: [
//     //   {
//     //     name: "role",
//     //     path: "/role",
//     //     component: () => import("../views/Role.vue"),
//     //   },
//       {
//         name: "order",
//         path: "/order",
//         component: () => import("../views/Order.vue"),
//       },
//       {
//         name: "goods",
//         path: "/goods",
//         component: () => import("../views/Goods.vue"),
//       },
//     ],
//   },
  {
    path: "/loginview",
    name: "loginview",
    component: () => import("../views/LoginView.vue"),
  },
  
];

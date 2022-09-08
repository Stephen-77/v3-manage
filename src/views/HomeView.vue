<template>
  <div class="home">
    <div class="common-layout">
      <el-container style="height: 100vh">
        <el-header>
          <el-row :gutter="20" style="height: 100%">
            <el-col :span="4">
              <div class="logo">
                <img src="../assets/OKcat.gif" style="width: 50px" />
              </div>
            </el-col>
            <el-col :span="16">
              <h3 class="h-center">后台管理系统</h3>
            </el-col>
            <el-col :span="4">
              <h5 class="h-center">
                <el-avatar size="small" :src="circleUrl" />
                <el-popconfirm
                  confirm-button-text="Yes"
                  cancel-button-text="No"
                  :icon="InfoFilled"
                  icon-color="#626AEF"
                  title="确定要退出吗?"
                  @confirm="confirmEvent"
                  @cancel="cancelEvent"
                >
                  <template #reference>
                    <span>{{ user.nickname }}</span>
                  </template>
                </el-popconfirm>
              </h5>
            </el-col>
          </el-row>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <el-scrollbar>
              <el-menu
                :default-active="route.path"
                class="el-menu-vertical-demo"
                :router="true"
              >
              <el-menu-item v-for="item,index in data.tabbars " :key="index" :index="item.path">
                <component style="width: 16px; height:16px;margin-right: 10px;" :is="item.meta.icon"></component>
                <span>{{item.meta.label}}</span>
              </el-menu-item>
                <el-sub-menu index="">
                  <template #title>
                    <el-icon><User></User></el-icon>
                    <span>角色管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="/role">
                      <el-icon><UserFilled /></el-icon>
                      <span>角色1</span>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-sub-menu>
              </el-menu>
            </el-scrollbar>
          </el-aside>
          <el-main>
            <el-scrollbar>
              <router-view></router-view>
            </el-scrollbar>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Menu as IconMenu,
  Message,
  UserFilled,
  Setting,
  User,
  List,
  Goods,
  Picture,
  SetUp,
  InfoFilled,
} from "@element-plus/icons-vue";
import $bus from "@/hooks/mitt";
import useStore from "@/store/index";
import { RouteRecordNormalized } from "vue-router";
const { user } = useStore();
const route = useRoute();
const router = useRouter();
interface route {
  path?: string;
  label: string;
  icon?: string;
  children?: route[];
}
const circleUrl = ref(
  "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
);
const data = reactive({
  tabbars: [] as RouteRecordNormalized[],
  tabbar:[]
});

const cancelEvent = () => {};
const confirmEvent = () => {
  localStorage.removeItem("token");
  user.routes = [];
  router.push({ name: "loginview" });
};
const routes = reactive<route[]>([
  {
    path: "/order",
    label: "订单列表",
    icon: "icon-menu",
  },
  {
    path: "/role",
    label: "角色列表",
    icon: "message",

    children: [
      {
        label: "item1",
      },
      {
        label: "item2",
      },
      {
        label: "item3",
      },
    ],
  },
  {
    path: "/goods",
    label: "商品列表",
  },
  {
    path: "/bannerlist",
    label: "商品列表",
  },
]);

onMounted(() => {
  // $bus.on('nickname',(value:string)=>{
  //   nickname.value=value
  // })
   router.getRoutes().forEach(
    item=>{
      if(item.meta.role=='tabbar')
      data.tabbars.push(item)
    }
   )    
  //  data.tabbar=data.tabbars.find(item=>item.meta.role=='admin')!
});
</script>

<style scoped lang="scss">
.home {
  background-color: rgb(239, 242, 242);

  .el-header {
    height: 70px;
    background-color: aliceblue;
  }
  .el-aside {
    height: calc(100vh - 70px);
    background-color: #ffffff;
  }
  .el-main {
    height: calc(100vh - 70px);
    padding: 10px 10px 0;
  }
  .logo {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .h-center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 16px;
    color: rgb(138, 140, 140);
    span {
      cursor: pointer;
      margin-left: 10px;
    }
  }
}
</style>

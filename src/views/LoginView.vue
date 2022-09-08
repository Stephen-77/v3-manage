<template>
  <div class="login">
    <div class="center">
      <h2>登录</h2>
      <el-form :model="data.loginForm" ref="ruleFormRef" :rules="rules">
        <el-form-item :label-width="data.formLabelWidth" prop="uname">
          <el-input
            v-model="data.loginForm.uname"
            :prefix-icon="User"
            clearable
            placeholder="username"
            autocomplete="off"
            style="width: 250px"
          />
        </el-form-item>
        <el-form-item :label-width="data.formLabelWidth" prop="upass">
          <el-input
            v-model="data.loginForm.upass"
            :prefix-icon="Key"
            clearable
            placeholder="password"
            autocomplete="off"
            style="width: 250px"
          />
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        plain
        size="large"
        style="width: 65%"
        @click="goLogin(ruleFormRef!)"
        >登录</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, FormInstance } from "element-plus";
import { Calendar, Search, User, Key } from "@element-plus/icons-vue";
import { initData } from "../type/login";
import adminRouters from "../router/adminRouters";
import store from '../store/index'

const {user}=store()
const router=useRouter()
const data = reactive(new initData());
const ruleFormRef = ref<FormInstance>();
const vm=getCurrentInstance()

const validateName = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入用户名"));
  } else callback();
};
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else callback();
};

const rules = reactive({
  uname: [{ validator: validateName, trigger: "blur" }],
  upass: [{ validator: validatePass, trigger: "blur" }],
});
console.log(router.getRoutes());

const goLogin =async (formEl: FormInstance) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
        const res=await vm?.proxy?.$API.userLogin(data.loginForm)
        if(res.code==200){
            localStorage.setItem('token',res.token)
            await user.setRoutes();
            ElMessage.success("登录成功");
            console.log(router.getRoutes());

            router.push({path:'/'})     
        }
        else{
            ElMessage.error(res.msg)
        }
    } else {
      ElMessage.error("提交信息失败!");
      return false;
    }
  });
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(180, 224, 236);
  .center {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 350px;
    height: 350px;
    border-radius: 10px;
    background-color: rgb(235, 237, 243);
    h2 {
      margin: 20px;
      color: rgb(134, 138, 137);
    }
    .el-button {
      margin-top: 20px;
    }
  }
}
.login-box {
  display: flex;
  margin: 0 auto;
}
</style>

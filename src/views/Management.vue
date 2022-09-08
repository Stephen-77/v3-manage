<template>
  <div>
    <el-table :data="data.userList" border style="width: 100%">
      <el-table-column prop="uid" label="ID" width="180" />
      <el-table-column prop="uname" label="Name" width="180" />
      <el-table-column prop="role_name" label="Role" width="180" />
      <el-table-column prop="createtime" label="CreateTime" />
      <el-table-column label="管理员权限">
        <template #default="scope">
          <div>
            <el-switch
              v-model="scope.row.role"
              class="mt-2"
              style="margin-left: 24px"
              inline-prompt
              :active-icon="Check"
              :inactive-icon="Close"
              active-value="true"
              inactive-value="false"
              @change="change(scope.row)"
            />
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { initData } from "../type/management";
import { Check, Close } from "@element-plus/icons-vue";
import useStore from "@/store/index";
import { ElMessage } from "element-plus";
const {user}=useStore()
const vm = getCurrentInstance();

let data = reactive(new initData());

const change=async (val:any)=>{
    console.log(val);
    try {
        await user.updateUser(val)
        getUsers()
    } catch (error) {
        ElMessage.error(error as string)
    }
}

const getUsers = async () => {
  const res = await vm?.proxy?.$API.getUsers();
  console.log(res);

  if (res.code == 200) {
    data.userList = res.data;
  }
};
onMounted(() => {
  getUsers();
});
</script>

<style scoped></style>

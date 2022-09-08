<template>
  <div>
    <el-form :model="form" :inline="true" label-width="50px" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="form.name" placeholder="请输入姓名" clearable></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="selectRole" class="m-2" placeholder="全部" clearable size="large">
            <el-option
            v-for="item in form.role"
            :key="item.roleValue"
            :label="item.roleName"
            :value="item.roleValue"
            />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
    </el-form>
    <el-table :data="data.tableData1">
      <el-table-column label="ID" prop="id" width="100px"/>
      <el-table-column label="姓名" prop="nickName" width="200px"/>
        <el-table-column label="角色" width="800px">
            <template #default="scope">
                <el-button v-for="item,index in scope.row.role" type="primary" text>{{item.roleName}}</el-button>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <div>
                    <el-button type="primary" @click="changeRole(scope.row)">编辑</el-button>

                </div>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="dialogFormVisible" title="编辑信息">
        <el-form :model="data.dialogData">
        <el-form-item label="姓名" label-width="200px">
            <el-input v-model="data.dialogData.nickname" style="width: 222px;" autocomplete="off" size="large"/>
        </el-form-item>
        <el-form-item label="角色" label-width="200px">
            <el-select v-model="data.dialogData.roleList" multiple class="m-2" placeholder="全部"  size="large">
                <el-option
                v-for="item in form.role"
                :key="item.roleValue"
                :label="item.roleName"
                :value="item.roleValue"
                />
            </el-select>
        </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="updateRole">确认</el-button>
            </span>
        </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
const vm = getCurrentInstance();
const router=useRouter()
interface roleType {
  roleName: string;
  roleValue: number;
}
const form = reactive({
  name: "" as string,
  role: [
    {
      roleName: "管理员",
      roleValue: 1,
    },
    {
      roleName: "普通用户",
      roleValue: 2,
    },
  ] as roleType[],
});
const dialogFormVisible=ref(false)

const selectRole=ref<number>()
interface dataRoleType{
    role:number,
    roleName:string
}
interface dataType{
    id:number,
    userName:string,
    nickName:string,
    role:dataRoleType[]
}
interface dialogType{
    userId:number
    nickname:string
    roleList:dataRoleType[]
}
let data = reactive({
    tableData:[] as dataType[],
    tableData1:[] as dataType[],
    dialogData:{
        userId:0,
        nickname:"",
        roleList:[]
    } 
});

const changeRole=(row:any)=>{
    dialogFormVisible.value=true
    console.log(row);
    data.dialogData.userId=row.id
    data.dialogData.nickname=row.nickName
    data.dialogData.roleList=row.role.map((item:dataRoleType)=>item.role)
}
const updateRole=()=>{
    if(data.dialogData.nickname!=''&&data.dialogData.roleList.length!=0){
        let index=data.tableData1.findIndex(item=>item.id==data.dialogData.userId)
        data.tableData1[index].nickName=data.dialogData.nickname
        let aa=data.dialogData.roleList.map(item=>({
            role:item,
            roleName:item==1?'管理员':'普通用户'
        }))
        data.tableData1[index].role=[...aa]
        dialogFormVisible.value=false
    }
}

const onSubmit=()=>{    
    if(form.name!=''||typeof(selectRole.value)!='undefined'||selectRole.value!=''){
        data.tableData1=data.tableData.filter(item=>{
            let b= item.role.findIndex(item=>item.role==selectRole.value)
            if(form.name!='') return b!=-1||item.nickName.toLowerCase().includes(form.name.toLowerCase())
            return b!=-1
        })              
    }
    else{
        console.log(11);
        
        data.tableData1=data.tableData
    }
}

const getUserList = async () => {
  const res = await vm?.proxy?.$API.getUserList();
  data.tableData=res.data
  data.tableData1=res.data
  console.log(res);
};
onMounted(() => {
  getUserList();
  console.log(router.getRoutes());
});
</script>

<style scoped></style>

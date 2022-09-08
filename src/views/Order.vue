<template>
    <div>
        <h4>订单管理</h4>
        <el-input v-model="search" placeholder="请输入关键词" :prefix-icon="Search"></el-input>
        <el-table :data="dataList" @row-click="onclick" stripe style="width: 100%;">
        <!-- <el-table :data="data.list.slice((pagination.currentpage-1)*pagination.pagesize,pagination.currentpage*pagination.pagesize)" @row-click="onclick" stripe style="width: 100%;"> -->
        <!-- <el-table :data="state.tableData.slice((currentpage-1)*pagesize,currentpage*pagesize)" @row-click="onclick" stripe style="width: 100%;"> -->
            <el-table-column prop="userId" label="userId" width="80"/>
            <el-table-column prop="id" label="id" width="80" />
            <el-table-column prop="title" label="title" />
            <el-table-column prop="introduce" label="introduce" :show-overflow-tooltip="true" />
        </el-table>
        <div class="footer">
            <el-pagination background layout="prev, pager, next"
                v-model:page-size="state.pagesize"
                v-model:current-page="state.currentpage"
                :total="total"
            />
        </div>
       
    </div>
</template>

<script setup lang="ts">
import { Search} from '@element-plus/icons-vue';
import {initData} from '../type/order'
const vm=getCurrentInstance()
const data=reactive(new initData())
// 解构出来再重新赋值  用.value.*
let {pagination}=toRefs(data)

const total=computed(()=>state.tableData.length)
let search=ref('')
const pagesize:number=10
const currentpage:number=1

let dataList=computed(()=>{
    if(search.value){
        let list=data.list.filter(item=>!search.value||item.title.toLowerCase().includes(search.value.toLowerCase()))
        let fenye=list.slice((data.pagination.currentpage-1)*data.pagination.pagesize,data.pagination.currentpage*data.pagination.pagesize)
        state.tableData=list
        return list as [],fenye
    }
    else{
        let fenye=data.list.slice((state.currentpage-1)*state.pagesize,state.currentpage*state.pagesize)
        state.tableData=data.list
        return fenye
    }
})

// watch(currentpage,(newv,oldv)=>{
//     console.log(newv);
// })
const onclick=()=>{
    console.log(1);
}
interface tableType{
    userId:number,
    id:number,
    title:string
    introduce:string
}
let state=reactive({
    tableData:[] as tableType[],
    pagesize:10 as number,
    currentpage:1 as number,
    obj:{} as tableType
})
const getGoodsList=async ()=>{
     const res=await vm?.proxy?.$API.getGoodsList()
     state.tableData=res.data
     data.list=res.data
}
onMounted(() => {
   getGoodsList()
})
</script>

<style scoped lang="scss">
h4{
    font-weight: 400;
    margin:10px;
}
.el-pagination{
    margin: 10px 0;
    justify-content: center;
}
</style>
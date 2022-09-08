<template>
  <div style="background-color: #ffffff;">
    <el-skeleton style="width: 100%" :loading="loading" animated>
      <template #template>
        <el-skeleton-item variant="button" style="width: 107px; height: 31px;margin: 15px;" />
        <div style="padding: 14px">
          <div style="display: flex; justify-content: space-between;">
            <el-skeleton-item variant="h3" style="width: 200px" />
            <el-skeleton-item variant="h3" style="width: 200px" />
            <el-skeleton-item variant="h3" style="width: 500px" />
          </div>
          <div
            style="
              display: flex;
              align-items: center;
              justify-items: space-between;
              margin-top: 16px;
            "
          >
            <el-skeleton-item variant="image" style="width: 188px;height: 128px;margin-right: 16px" />
            <el-skeleton-item variant="h2" style="width: 500px;margin-left: 30px;"/>
            <el-skeleton-item variant="button" style="width: 100px;margin-left: 30px;"/>
            <el-skeleton-item variant="button" style="width: 100px;margin-left: 30px;"/>
          </div>

        </div>
      </template>
      <template #default>
          <el-button type="primary" :icon="Plus" style="margin-bottom: 10px;" @click="data.addDialogShow=true">添加图片</el-button>
          <el-table :data="data.bannerlist" stripe style="width: 100%">
          <el-table-column label="Picture" width="280">
              <template #default="scope">
                <div class="picture">
                <el-image style="width: 100%; height: 100%" :src="scope.row.banner_url" fit="fill" lazy>
                  <template #error>
                    <div class="image-slot">
                      <el-icon><Picture /></el-icon>
                    </div>
                  </template>
                </el-image>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="banner_name" label="Name" width="480" />

            <el-table-column label="Action" width="440" >
                <template #default="scope">
                    <div>
                      <el-button type="primary" plain round :icon="Edit" @click="openEditDialog(scope.row)">编辑</el-button>
                      <el-button type="danger" plain round :icon="Delete" @click="delBanner(scope.row)">删除</el-button>
                    </div>
                  </template>
            </el-table-column>
          </el-table>
      </template>
    </el-skeleton>

    <el-dialog v-model="data.addDialogShow" title="添加图片" :modal="false">
      <el-form :model="data.addBannerForm" ref="ruleFormRef" :rules="rules">
        <el-form-item label="图片名字" :label-width="data.formLabelWidth" prop="banner_name">
          <el-input v-model="data.addBannerForm.addBanner_name" autocomplete="off" style="width: 200px;" />
        </el-form-item>
        <el-form-item label="上传图片" :label-width="data.formLabelWidth" prop="imgurl">
           <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
             >
            <img v-if="data.addBannerForm.imgUrl" :src="data.addBannerForm.imgUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.addDialogShow = false">取消</el-button>
          <el-button type="primary" @click="submitAdd(ruleFormRef!)">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="data.editDialogShow" title="修改信息" :modal="false" @close="closeDialog">
      <el-form :model="data.addBannerForm" ref="ruleFormRef" :rules="rules">
        <el-form-item label="图片名字" :label-width="data.formLabelWidth" prop="banner_name">
          <el-input v-model="data.addBannerForm.addBanner_name" autocomplete="off" style="width: 200px;" />
        </el-form-item>
        <el-form-item label="上传图片" :label-width="data.formLabelWidth" prop="imgurl">
           <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
             >
            <img v-if="data.addBannerForm.imgUrl" :src="data.addBannerForm.imgUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.editDialogShow= false">取消</el-button>
          <el-button type="primary" @click="editBanner(ruleFormRef!)">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Plus,Picture, Edit, Delete } from "@element-plus/icons-vue";
import axios from "axios";
import { ElMessage, ElMessageBox, UploadFile, UploadFiles, UploadRequestOptions } from "element-plus";
import type { UploadProps,FormInstance} from "element-plus";
import { initData } from "../type/banner";

const router = useRouter();
const vm = getCurrentInstance();
const data = reactive(new initData());

const loading=ref(true)
const imageUrl = ref("");
const ruleFormRef=ref<FormInstance>()

const validateName=(rule:any,value:any,callback:any)=>{
   if (data.addBannerForm.addBanner_name === '') {
    callback(new Error('请输入图片名字'))
  }
  else callback()
}
const validateImgUrl=(rule:any,value:any,callback:any)=>{
 if (data.addBannerForm.imgUrl === '') {
    callback(new Error('请上传图片'))
  }
  else callback()
}
const rules = reactive({
  banner_name: [{ validator: validateName, trigger: 'blur' }],
  imgurl: [{ validator: validateImgUrl, trigger: 'blur' }],
})

const uploadImage = async (options: UploadRequestOptions) => {
  let form = new FormData();
  form.append("file", options.file);
  const res = await vm?.proxy?.$API.updateBannerList(form);
  if (res.code == 200) {
    imageUrl.value = res.data.imgurl;
  }
};
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("上传图片必须是JPG/Jpeg哦!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("文件大小不能超过2MB!");
    return false;
  }
  else {
     data.addBannerForm.imgUrl = URL.createObjectURL(rawFile!)
     data.formData=rawFile
  }
};

const getbannerlist = async () => {
  const res = await vm?.proxy?.$API.getBannerList();
  if (res.code == 200) {
    data.bannerlist = res.data.bannerlist;
    loading.value=false
  }
};
const delBanner = (item:any) => {  
  ElMessageBox.confirm(
    '确定删除吗?',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async() => {
      const res = await vm?.proxy?.$API.delBanner(item.banner_id);
      if (res.code == 200) {
        getbannerlist()
        ElMessage.success('图片删除成功！')
      }
      else{    
        ElMessage.error(res.msg)
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
};
const submitAdd=(formEl:FormInstance)=>{
  if(!formEl) return
 formEl.validate(async (valid) => {
    if (valid) {
       let form = new FormData();
        form.append("file", data.formData as string);
        const res = await vm?.proxy?.$API.addBanner(form,data.addBannerForm.addBanner_name);
        if (res.code == 200) {
          data.addBannerForm.addBanner_name=''
          data.addBannerForm.imgUrl=''
          data.addDialogShow=false
          ElMessage.success('添加图片成功！')
          getbannerlist()
        }
    } else {
      ElMessage.error('error submit!')
      return false
    }
  })
}
const openEditDialog=(item:any)=>{
  data.addBannerForm.addBanner_name=item.banner_name
  data.addBannerForm.imgUrl=item.banner_url
  data.currentId=item.banner_id
  data.editDialogShow=true
}
const editBanner=(formEl:FormInstance)=>{
  if(!formEl) return 
 formEl.validate(async (valid) => {
    if (valid) {
       let form = new FormData();
        form.append("file", data.formData as string);
        const res = await vm?.proxy?.$API.editBanner(form,data.addBannerForm.addBanner_name,data.currentId);
        if (res.code == 200) {
          data.addBannerForm.addBanner_name=''
          data.addBannerForm.imgUrl=''
          data.editDialogShow=false
          data.currentId=''
          ElMessage.success('修改信息成功！')
          getbannerlist()
        }
    } else {
      ElMessage.error('error submit!')
      return false
    }
  })
}
const closeDialog=()=>{
  data.addBannerForm.addBanner_name=''
  data.addBannerForm.imgUrl=''
  data.currentId=''
}
onMounted(() => {
  getbannerlist();
})


</script>

<style scoped lang="scss">

.picture{
  width: 200px;
  height: 120px;
  .image-slot{
     display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--el-fill-color-light);
    color: var(--el-text-color-secondary);
    font-size: 30px;
  }
}

::v-deep(.avatar-uploader .avatar) {
  width: 168px;
  height: 128px;
  display: block;
}
::v-deep(.avatar-uploader)  {
  .el-upload{
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

}

::v-deep(.avatar-uploader .el-upload:hover) {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 168px;
  height: 128px;
  text-align: center;
}
</style>

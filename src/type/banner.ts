interface bannerlist {
  banner_id: number;
  banner_name: string;
  banner_url: string;
}
interface addBannerForm {
  addBanner_name:string
  imgUrl:string

}
export  class initData {
  bannerlist: bannerlist[] = [];
  addDialogShow:boolean=false
  editDialogShow:boolean=false
  addBanner_name:string=''
  addBannerForm:addBannerForm={
    addBanner_name:'',
    imgUrl:''
  }
  formLabelWidth:string='200'
  imgUrl:string=''
  formData={}
  currentId:string=''
}

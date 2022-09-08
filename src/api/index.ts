import request from './request'
import personRequest from './personRequest'

export const getGoodsList=()=>request({url:'/getGoodsList',method:'get'})
export const getUserList=()=>request({url:'/getUserList',method:'get'})


export const userLogin=(data:any)=>personRequest({url:'/api/login',method:'post',data})
export const getTokenInfo=()=>personRequest({url:'/check',method:'get',})

export const getBannerList=()=>personRequest({url:'/banner/getbanner',method:'get'})
export const delBanner=(id:number)=>personRequest({url:`/banner/delbanner?banner_id=${id}`,method:'get'})
export const editBanner=(formData:any,banner_name:string,banner_id:string)=>personRequest({
    url:`/banner/editbanner?banner_id=${banner_id}&banner_name=${banner_name}`,
    method:'post',
    data:formData,
    headers:{
        'Content-Type': 'multipart/form-data',
    }
})
export const addBanner=(formData:any,banner_name:string)=>personRequest({
    url:`/banner/addbanner?banner_name=${banner_name}`,
    method:'post',
    data:formData,
    headers:{
        'Content-Type': 'multipart/form-data',
    }
})
export const getUsers=()=>personRequest({url:'/data/getuser',method:'get',})
export const updateUser=(uid:number,role:string)=>
    personRequest({
        url:`/data/updateuser?uid=${uid}&role=${role}`,
        method:'get'
    })

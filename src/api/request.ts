import axios from "axios";
const request=axios.create({
    baseURL:'https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api',
    timeout:5000
})
request.interceptors.request.use(
    (config)=>{


        
        return config
    }
)
request.interceptors.response.use(
    (res)=>{
        return res.data
    },
    (err)=>{
        return Promise.reject(new Error('error'))
    }
)
export default request
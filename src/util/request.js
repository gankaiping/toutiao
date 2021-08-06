import axios from "axios";
import jsonBig from 'json-bigint'
const req =axios.create({
    //配置基准地址
    baseURL:'http://api-toutiao-web.itheima.net',
    //做一下大数据转换
    transformResponse: [function (data) {
        try {
            // 如果转换成功则返回转换的数据结果
            return jsonBig.parse(data)
        } catch (err) {
            // 如果转换失败，则包装为统一数据格式并返回
            return {
                data
            }
        }
    }]
})
//配置拦截器配置token
req.interceptors.request.use(config=>{
    // config.data=JSON.stringify(config.data);
    if(window.sessionStorage.getItem('token')){
        //有token就设置token
        config.headers.Authorization='Bearer '+window.sessionStorage.getItem('token');
    }
    return config;
})
export default  req

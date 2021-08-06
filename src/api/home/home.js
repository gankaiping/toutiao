import req from "../../util/request";
export const getuserinfo=()=>{
    return  req({
        method:'GET',
        url:'/mp/v1_0/user/profile',
    })
}
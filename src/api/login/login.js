import req from "../../util/request";
export const login=(data)=>{
   return  req({
       headers: {
           'Content-Type': 'application/json'
       },
        method:'POST',
        url:'/mp/v1_0/authorizations',
        data:data
    })
}
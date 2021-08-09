import req from "../../util/request";

export  const wzpublish=(data,draftflag=false)=>{
    return req({
        method:'POST',
        url:'/mp/v1_0/articles',
        params:{
            draft:draftflag
        },
        data:data
    })
}

export const wzupdateimg=(data)=>{
    return req({
        method:'POST',
        url:'/mp/v1_0/user/images',
        data:data
    })
}
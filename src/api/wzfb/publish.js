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
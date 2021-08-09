import req from "../../util/request";
//修改文章的评论状态
export  const alertphoto=(photo)=>{
    return req({
        method:'PATCH',
        url:'/mp/v1_0/user/photo',
        params:photo

    })
}
export  const alertuser=(data)=>{
    return req({
        method:'PATCH',
        url:'/mp/v1_0/user/profile',
        data:data
    })
}
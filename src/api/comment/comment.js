import req from "../../util/request";
//修改文章的评论状态
export  const commentstatus=(query,data)=>{
    return req({
            method:'PUT',
            url:'/mp/v1_0/comments/status',
            params:{
                article_id:query
            },
            data:{
                allow_comment:data
            }

    })
}
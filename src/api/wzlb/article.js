import req from "../../util/request";
//获取文章数据
export const getarticledata=(param)=>{
    return req({
        method:'GET',
        url:'/mp/v1_0/articles',
        params:param
    })
}
//获取频道列表的接口
export  const getArticleChannels=()=>{
        return req({
            method:'GET',
            url:'/mp/v1_0/channels'
        })
}

//删除文章
export const deleteArticle=(id)=>{
    return req({
        method:'DELETE',
        url:`/mp/v1_0/articles/${id}`
    })
}

//修改文章
export const alertarticle=(id,draft,data)=>{
    return req({
        method:'PUT',
        url:`/mp/v1_0/articles/${id}`,
        params:{
            draft:draft
        },
        data:data
    })
}
//获取指定的文章
export  const  gettargetarticle=(id)=>{
    return req({
        method:'GET',
        url:`/mp/v1_0/articles/${id}`
    })
}
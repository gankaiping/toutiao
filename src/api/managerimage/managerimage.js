import req from "../../util/request";
export  const  getImages=paramdata=>{
    return req({
        method:'GET',
        url:'/mp/v1_0/user/images',
        params:paramdata
    })
}
export  const collect=(id,flag)=>{
    return req({
        method:'PUT',
        url:`/mp/v1_0/user/images/${id}`,
        data:{
            collect:flag
        }
    })
}

export  const deletecollect=(id)=>{
    return req({
        method:'DELETE',
        url:`/mp/v1_0/user/images/${id}`
    })
}
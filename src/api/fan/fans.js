import req from '../../util/request'
export  const getfanslist=(data)=>{
    return req({
        method:'GET',
        url:'/mp/v1_0/followers',
        params:data
    })
}
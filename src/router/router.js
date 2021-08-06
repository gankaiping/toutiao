import Vue from 'vue'
import Router from 'vue-router'
import login from "../components/login/login.vue";
import home from '../components/home/home.vue'
import webcome from "../api/home/webcome.vue";
import article from "../components/wzlb/article.vue";
import  publish from '../components/xwfb/publish.vue'
import mangerimages from '../components/scgl/mangerimages.vue'
import comment from "../components/plgl/comment.vue";
Vue.use(Router);
const router=new Router({
    routes:[
        {path:'/',redirect:'/login'},
        {path:'/login',component:login},
        {path:'/home',component:home,children:[
                {path:'/home',redirect:'/webcome'},
                {path:'/webcome',component:webcome},
                {path:'/article',component:article},
                {path:'/publish',component:publish},
                {path:'/mangerimages',component:mangerimages},
                {path:'/comment',component:comment}
            ]}
    ]
})
router.beforeEach((to, from, next)=>{
//    如果是登入也直接去登入
    if(to.path==='/login'){
        return next();
    }else {
        if(window.sessionStorage.getItem('token')){
            return next()
        }else {
            return  next('/login')
        }
    }
})
export  default router
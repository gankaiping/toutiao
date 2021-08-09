<template>
  <el-container class="container">
    <el-aside :width="meunexpend?'auto':'200px'">
<!--    传入expend  -->
      <meun class="meuncs" :collapse="meunexpend"></meun>
    </el-aside>
    <el-container>
      <el-header>
          <div class="headertitle">
            <i @click="meunexpendfnc"  :class="{'el-icon-s-fold':!meunexpend,'el-icon-s-unfold':meunexpend}"></i>
            <span>gkp提供技术支持</span>
          </div>
        <el-dropdown>
         <div class="userheadertitle">
           <img class="headerimg" :src="userinfo.photo">
           <span class="namesize">{{userinfo.name}}<i class="el-icon-arrow-down el-icon--right"></i></span>
         </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item >我的设置</el-dropdown-item>
            <el-dropdown-item @click.native="backlogin">退出登入</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </el-header>
      <el-main>
              <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import gloabus from '../../util/gloabbus'
import meun from '../pubmeun/meun.vue'
import {getuserinfo} from '../../api/home/home'
export default {
name: "home",
  data(){
        return {
          userinfo:{
            email:'',
            id:'',
            intro:'',
            mobile:'',
            name:'',
            photo:''
          },
          //控制菜单的展开
          meunexpend:false
        }
  },
  created() {
      this.getruserinfofnc();
    gloabus.$on('updateuser',(data)=>{
          this.userinfo.name=data.name;
          this.userinfo.photo=data.photo;
      })
  },
  methods:{
    getruserinfofnc(){
      getuserinfo().then(res=>{
        console.log(res);
        this.userinfo=res.data.data;
      }).catch(err=>{
        console.log(err);
        console.log(window.sessionStorage.getItem('token'))
      })
    },
    backlogin(){
      //    清除token跳转
        window.sessionStorage.removeItem('token');
        this.$router.push('/');
    },
    meunexpendfnc(){
      this.meunexpend=!this.meunexpend;
    }
  },
  components:{
    meun:meun
  }
}
</script>

<style scoped>
  .container{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }
  .el-aside{
      background-color: #545c64;
  }
  .el-header{
    height: 60px;
    /*background-color: #b3c0d1;*/
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;

  }
  .meuncs{
    height: 100%;
  }
  .headertitle{
      line-height: 20px;
  }
  .userheadertitle{
      display: flex;
      align-items: center;
    justify-content: center;
  }
  .namesize{
    margin-left: 8px;
    font-weight: bolder;
  }
  .headerimg{
    height: 38px;
    width: 38px;
    border-radius: 50%;
  }
  .el-main{
      background-color: #e9eef3;
  }
</style>
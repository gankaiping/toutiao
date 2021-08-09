<template>
  <el-menu
      :default-active="'/'+currentActive"
      background-color="#545c64"
      text-color="#fff"
      router
      :collapse="collapse"
      active-text-color="#ffd04b">
    <el-menu-item index="/webcome" @click="getActive('webcome')">
      <i class="el-icon-menu"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/article" @click="getActive('article')">
      <i class="el-icon-document"></i>
      <span slot="title">文章列表</span>
    </el-menu-item>
    <el-menu-item index="/mangerimages" @click="getActive('mangerimages')">
      <i class="el-icon-document"></i>
      <span slot="title">图片素材</span>
    </el-menu-item>
    <el-menu-item index="/publish"  @click="getActive('publish')">
      <i class="el-icon-document"></i>
      <span slot="title">文章发布</span>
    </el-menu-item>
    <el-menu-item index="/comment"  @click="getActive('comment')">
      <i class="el-icon-setting"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/fans"  @click="getActive('fans')">
      <i class="el-icon-setting"></i>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="/mysetting"  @click="getActive('mysetting')">
      <i class="el-icon-setting"></i>
      <span slot="title">我的设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
name: "meun",
  data(){
      return {
        currentActive:''
      }
  },
  created() {
    console.log(window.sessionStorage.getItem('path'));
    this.currentActive=window.sessionStorage.getItem('path');
  },
  methods:{
      getActive(path){
        window.sessionStorage.setItem('path',path);
      }
  },
  props:{
    collapse:{required: true}
  }
}
</script>

<style scoped>

</style>
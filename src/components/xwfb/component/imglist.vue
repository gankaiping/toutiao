<template>
  <div>
    <div class="navdoit">
      <el-radio-group v-model="queryinfo.collect" @change="radiochang">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
    </div>
    <el-row  :gutter="40">
      <el-col :xs="12"  :sm="8" :md="6" :lg="6" :xl="6" v-for="(item,index) in imagearr" :key="index">
        <el-image  class="imgstyle" :src="item.url" fit="contain"></el-image>
        <div class="imgmask">

        </div>
      </el-col>
    </el-row>
    <el-pagination
        background
        :page-size="queryinfo.per_page"
        :current-page="queryinfo.page"
        layout="prev, pager, next"
        @current-change="pagechang"
        :total="total">
    </el-pagination>
  </div>

</template>

<script>
import {collect, getImages} from "../../../api/managerimage/managerimage";

export default {
name: "imglist",
  data(){
    return {
      //分页查询对象
      queryinfo:{
        collect:false,
        page:1,
        per_page:20
      },
      //总数据条数
      total:0,
      //  图片数据对象
      imagearr:[],
      //控制添加素材的按钮
      addimageflag:false,
      header:{
        Authorization:null
      }
    }
  },
  created() {
    this.header.Authorization='Bearer '+window.sessionStorage.getItem('token')
    console.log(this.header.Authorization);
    this.getImagesfnc();
  },
  methods:{
    //初始化数据
    getImagesfnc(){
      getImages(this.queryinfo).then(res=>{
        res.data.data.results.forEach((item)=>{
          item.loding=false;
        });
        this.imagearr=res.data.data.results;
        this.total=res.data.data.total_count;
        console.log(res);
      }).catch(err=>{
        console.log(err);
      })
    },
    //  收藏与全部的改变
    radiochang(){
      console.log(this.queryinfo.collect);
      console.log(this.total);
      this.getImagesfnc();
    },
    // 成功之后发生回调
    successfnc(res){
      console.log('图片上传成功');
      console.log(res);
      this.addimageflag=false;
    },
    //  添加到收藏
    addcollect(image){
      image.loding=true;
      console.log(image);
      collect(image.id,!image.is_collected).then(res=>{
        console.log(res);
        this.$message.success("操作成功！");
        //刷新数据
        this.getImagesfnc();
        image.loding=false;
      }).catch(err=>{
        image.loding=false;
        console.log(err);
        this.$message.error("操作失败！");
      })
    },
    //  绑定页签改变的方法
    changepage(currentpage){
      this.queryinfo.per_page=currentpage;
      //重新请求数据
      this.getImagesfnc();
    },
    pagechang(val){
          this.queryinfo.page=val;
          this.getImagesfnc();
    }
  },
}
</script>

<style scoped>
.el-row{
  margin-top: 40px;
}
.imgstyle{
  height: 180px;
  width: 180px;
  /*width: 100%;*/
}
.navdoit{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.upload-demo{
  text-align: center;
}
.el-col{
  position: relative;
  padding-top: 15px;
}
.cddoit{
  position: absolute;
  height: 45px;
  background-color: rgba(204,204,204,.3);
  bottom: 0;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.imgmask{
      position: absolute;
      height: 100px;
     width: 100px;
      background: yellowgreen;
}
</style>
<template>
      <div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/webcome' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>图片素材</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="navdoit">
            <el-radio-group v-model="queryinfo.collect" @change="radiochang">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
            <el-button  type="success" @click="addimage">添加素材</el-button>
          </div>
          <el-row  :gutter="40">
            <el-col :xs="12"  :sm="8" :md="6"  :xl="4" v-for="(item,index) in imagearr" :key="index">
              <el-image  class="imgstyle" :src="item.url" fit="contain"></el-image>
              <div class="cddoit">
                <el-button type="warning" :icon="{'el-icon-star-off':!item.is_collected,'el-icon-star-on':item.is_collected}" circle @click="addcollect(item)" :loading="item.loding"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle :loading="item.loding" @click="deletecollect(item)"></el-button>
              </div>
            </el-col>
          </el-row>
          <el-pagination
              background
              :page-size="queryinfo.page"
              :current-page="queryinfo.per_page"
              layout="prev, pager, next"
              :total="total">
          </el-pagination>
        </el-card>
        <el-dialog
            :append-to-body="true"
            :visible.sync="addimageflag"
            @current-change="changepage"
            width="25%"
            >
          <el-upload
              v-if="addimageflag"
              class="upload-demo"
              drag
              action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
              name="image"
              :headers="header"
              :on-success="successfnc"
              multiple>
            <i class="el-icon-upload"></i>
          </el-upload>
        </el-dialog>
      </div>
</template>

<script>
import {getImages,collect,deletecollect} from "../../api/managerimage/managerimage";
export default {
name: "mangerimages",
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
    //添加素材
    addimage(){
        this.addimageflag=true;
    },
  // 成功之后发生回调
    successfnc(){
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
    deletecollect(image){
        image.loding=true;
      console.log(image);
      deletecollect(image.id).then(res=>{
        image.loding=false;
        this.$message.success("删除成功！");
        //重新渲染数据
        this.getImagesfnc();
        console.log(res);
      }).catch(err=>{
        image.loding=false;
        console.log(err);
        this.$message.error("删除失败");
      })
    }
  }
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
</style>
<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/webcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{isalertf?'文章修改':'文章发布'}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form :model="publishfrom" :rules="publishfromrules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="publishfrom.title"></el-input>
      </el-form-item>
      <el-form-item label="文章所属频道" prop="channel_id">
        <el-select v-model="publishfrom.channel_id" placeholder="请选择频道">
          <el-option v-for="(item,index) in channelid" :label="item.name" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章内容">
          <quill-editor v-model="publishfrom.content" :options="options">
          </quill-editor>
      </el-form-item>
      <el-form-item label="封面类型">
        <el-radio-group v-model="publishfrom.cover.type">
          <el-radio :label="-1">自动</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="1">一张</el-radio>
          <el-radio :label="3">三张</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="publishfrom.cover.type>0">
        <div class="showingbox">
          <imgitem :value="publishfrom.cover.images[index]"  v-for="(item,index) in publishfrom.cover.type" :key="item" @updateimg="dataimgimplement(index,$event)"></imgitem>
        </div>

      </template>
      <el-form-item>
        <el-button :type="isalertf?'warning':'primary'" @click="publishfnc()">{{isalertf?'确认修改':'立即发布'}}</el-button>
        <el-button v-if="!isalertf" @click="draftfnc">存为草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import imgitem from "./component/imgitem";
import {getArticleChannels,gettargetarticle,alertarticle} from '../../api/wzlb/article'
import  {wzpublish} from '../../api/wzfb/publish'
export default {
name: "publish",
  data(){
      return {
        //发布from
        publishfrom:{
          title:'',
          channel_id:null,
          cover:{
            type:0,
            images:[]
          },
          content:''
        },
        //发布数据规则
        publishfromrules:{

        },
      // channelid频道数组
        channelid:[],
      //  富文本编辑器的配置
        options:{
          theme: "snow",
          placeholder: "请输入正文"
        },
      //  判断是否是修改
        isalertf:false,
      }
  },
  created() {
      this.getArticleChanneldata();
      this.isalert();
  },
  components:{
    imgitem:imgitem
  },
  methods:{
    //获取频道信息
    getArticleChanneldata(){
        getArticleChannels().then(res=>{
          console.log(res);
          this.channelid=res.data.data.channels;
        }).catch(err=>{
          console.log(err);
        })
      },
    //发布文章
    publishfnc(){
      if(this.isalertf){
        const id=this.$route.query.id;
        alertarticle(id,false,this.publishfrom).then(res=>{
          console.log('修改成功');
          this.$message.success("修改成功！");
          this.$router.push('/article');
          console.log(res);
        }).catch(err=>{
          this.$message.error("修改失败！");
          console.log(err);
        })
      }else{
        //新增文章的接口
        wzpublish(this.publishfrom,false).then(res=>{
          console.log(res);
          this.$message.success("发布成功！");
        }).catch(err=>{
          this.$message.error("发布失败！");
          console.log(err);
        })
      }
      console.log(this.publishfrom);
    },
  //  判断是否是修改，并且把通过接口查到的数据绑定到form表单中
    isalert(){
      const id=this.$route.query.id;
      console.log(id);
      if(id){
       this.isalertf=true;
      //进行请求接口
        gettargetarticle(id).then(res=>{
          //把文章信息渲染到from表单中
          this.publishfrom=res.data.data;
          console.log(res);
        }).catch(err=>{
          console.log(err);
        })
      }else {
        this.isalertf=false;

      }
    },
  //  存为草稿
    draftfnc(){
      wzpublish(this.publishfrom,true).then(res=>{
        console.log(res);
        this.$message.success("发布成功！");
      }).catch(err=>{
        this.$message.error("发布失败！");
        console.log(err);
      })
    },
  //  获取到了传过来的图片
    dataimgimplement(index,url){
      this.publishfrom.cover.images[index]=url;
      console.log(this.publishfrom.cover.images[index]);

    }

  }
}
</script>

<style scoped>
  .showingbox{
    width: 30%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
<template>
    <div>
        <el-card>
          <div slot="header" class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/webcome' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>我的设置</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <el-row :gutter="24">
              <el-col :span="16">
                <el-form  label-width="80px" ref="userform" :model="userdata">
                  <el-form-item label="名称">
                    <el-input v-model="userdata.name"></el-input>
                  </el-form-item>
                  <el-form-item label="电话">
                    <label >{{userdata.mobile}}</label>
<!--                    <el-input v-model="userdata.mobile"></el-input>-->
                  </el-form-item>
                  <el-form-item label="邮箱">
                    <el-input v-model="userdata.email"></el-input>
                  </el-form-item>
                  <el-form-item label="介绍">
                    <el-input  type="textarea" v-model="userdata.intro"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="alertuser">确认修改</el-button>
                    <el-button>重置</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="8">
                    <label for="imgupdate">
                      <el-avatar :size="180" shape="square" :src="userdata.photo"></el-avatar>
                    </label>
                    <input
                        id="imgupdate"
                        type="file"
                        hidden
                        @change="changeimg"
                        ref="imguploads"

                    >
                    </input>

              </el-col>
          </el-row>
        </el-card>
      <el-dialog
          title="提示"
          append-to-body
          :visible.sync="imgvisable"
          @opened="openddiogimg"
          width="30%"
      >
       <div>
         <img class="zsimg" ref="img" :src="preimage">
       </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="imgvisable = false">取 消</el-button>
        <el-button type="primary" @click="alertimagefnc" :loading="imgload">确 定</el-button>
        </span>
      </el-dialog>

    </div>
</template>

<script>
import gloabus from '../../util/gloabbus'
import {getuserinfo} from '../../api/home/home'
import  {alertphoto,alertuser} from '../../api/setting/setting'
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
export default {
name: "mysetting",
  data(){
        return{
          userdata:{
            email:'',
            id:1,
            intro:'',
            mobile:'',
            name:'',
            photo:''
          },
          //控制添加图片对话框
          imgvisable:false,
        //  改变后的图片
          preimage:'',
          //定义剪切
          cropper:null,
          //图片的loading
          imgload:false
        }
  },
  created() {
  this.getInformations();
  },
  methods:{
        getInformations(){
          getuserinfo().then(res=>{
            console.log(res);
            this.userdata=res.data.data;
          }).catch(err=>{
            console.log(err);
          })
        },
    alertuser(){
          this.$refs.userform.validate(val=>{
                if(!val){
                    return   this.$message.error("数据校验不通过");
                }
                alertuser(this.userdata).then(res=>{
                  this.$message.success("成功！");
                  console.log(res);
                  //发布订阅用于数据共享
                  gloabus.$emit('updateuser',this.userdata);
                }).catch(err=>{
                  this.$message.error("失败！");
                  console.log(err);
                })
          })
      console.log(this.userdata);

    },
    changeimg(){
        this.imgvisable=true;
      console.log(this.$refs.imguploads.files[0]);
      this.preimage=window.URL.createObjectURL(this.$refs.imguploads.files[0]);
        this.$refs.imguploads.value='';
    },
  //  当图片渲染完毕 1.需要渲染数据 2，定义剪辑功能
    openddiogimg(){
          if(this.cropper){
                this.cropper.replace(this.preimage);
          }else {
            this.cropper = new Cropper(this.$refs.img, {
              aspectRatio: 16 / 9,
              viewMode:1,
              dragMode:'none',
              background:false,
              movable:false
            });
          }
    },
    alertimagefnc(){
          this.imgload=true;
      this.cropper.getCroppedCanvas().toBlob((blob)=>{
        const data=new FormData();
        data.append("photo",blob);
        alertphoto(data).then(res=>{
          this.$message.success("头像更换成功");
          this.userdata.photo=window.URL.createObjectURL(blob);
          this.imgload=false;
          console.log("图片文件");
          gloabus.$emit('updateuser',this.userdata);
          this.imgvisable=false;
          console.log(this.userdata.photo);
          console.log(res);
        }).catch(err=>{
          this.imgload=false;
          this.imgvisable=false;
          this.$message.error("头像更换失败");
          console.log(err);
        })
        console.log(data);
      });
    }


  }
}
</script>

<style scoped>
.zsimg {
  display: block;
    height: 200px;
  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
</style>
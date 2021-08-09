<template>
      <div>
        <div class="imgbox" @click="showupdataimg">
          <img ref="backimg" :src="value" class="backimg">
        </div>
<!--   弹出框     -->
        <el-dialog
            title="上传封面"
            append-to-body
            :visible.sync="selectimg"
            width="50%"
           >
          <el-tabs v-model="activeName" type="card" >
            <el-tab-pane label="图片素材" name="first">
                    <imglist/>
            </el-tab-pane>
            <el-tab-pane label="图片上传" name="second">
              <img ref="upimg">
              <input ref="fe" type="file" @change="changupdataimg"></input>
            </el-tab-pane>
          </el-tabs>
          <span slot="footer" class="dialog-footer">
          <el-button @click="selectimg = false">取 消</el-button>
          <el-button type="primary" @click="sureselect">确 定</el-button>
  </span>
        </el-dialog>
      </div>
</template>

<script>
import imglist from "./imglist";
import {wzupdateimg} from '../../../api/wzfb/publish'
export default {
name: "imgitem",
  data(){
      return {
        //控制弹出框
        selectimg:false,
        activeName:'first'
      }
  },
  props:['value'],
  components:{
      imglist:imglist
  },
  methods:{
    //显示对话框
    showupdataimg(){
        this.selectimg=true;
    },
    changupdataimg(){
      console.log(this.$refs.upimg);
      this.preimage=window.URL.createObjectURL(this.$refs.fe.files[0]);
        this.$refs.upimg.src=window.URL.createObjectURL(this.$refs.fe.files[0]);

    },
  //  点击确认上传图片
    sureselect(){
        if(this.activeName==='second'){
            if(!this.$refs.fe.files[0]){
              return this.$message.info("请选择图片");
            }
            let file=this.$refs.fe.files[0];
            const fb=new FormData();
            fb.append('image',file);
          wzupdateimg(fb).then(res=>{
             this.$emit('updateimg',res.data.data.url);
            this.$refs.backimg.src=res.data.data.url;
            this.selectimg=false;
          })
        }
    }

  }
}
</script>

<style scoped>
.imgbox{
  height: 120px;
  width: 100px;
  border: 1px solid #cccccc;
  margin-left: 40px;
  margin-bottom: 20px;
}
.backimg{
  height: 120px;
  width: 100px;
}
</style>
<template>
        <div class="login-container">
<!--         登入表单   -->
          <el-form :model="loginForm" status-icon :rules="loginFormrules" ref="ruleForm"  class="demo-ruleForm">
            <el-form-item  prop="mobile">
              <el-input placeholder="请输入手机号" v-model="loginForm.mobile" prefix-icon="iconfont icon-user">
              </el-input>
            </el-form-item>
            <el-form-item  prop="code">
              <el-input  placeholder="请输入密码" type="password" v-model="loginForm.code" prefix-icon="iconfont icon-lock_fill"></el-input>
            </el-form-item>
            <el-form-item  prop="checked">
              <el-checkbox v-model="loginForm.checked">我已阅读并同意隐私协议</el-checkbox>
            </el-form-item>
            <el-form-item>
                  <el-button class="loginbtn" type="primary" @click="userlogin" :loading="loginloding">登入</el-button>
            </el-form-item>
          </el-form>
        </div>
</template>

<script>
import {login} from "../../api/login/login";

export default {
name: "login",
  data(){
      return {
        //登入form表单数据
        loginForm:{
          mobile:'',
          code:'',
          //是否同意协议
          checked:false,
        },
        //登入表单数据和验证规则
        loginFormrules:{
          mobile:[
            {required: true, message: '请输入手机号', trigger: 'blur'},
          ],
          code:[
            {required: true, message: '请输入密码', trigger: 'blur'},
          ],
          checked:[
            //  指定校验
            {validator:(rule, value, callback)=>{
                  if(!value){
                    return callback( new Error("请勾选协议"));
                  }else{
                   return  callback();
                  }
              },
              trigger: 'blur'
            }
          ]
        },
        //防止一直点登入按钮
        loginloding:false
      }
  },
  methods:{
  //    登入方法
    userlogin(){
      // if(this.checked===false){
      //   return this.$message.error("请勾选用户协议")
      // }
      //通过验证把登入框禁用
      this.loginloding=true;
      // const res=await this.$http.post('mp/v1_0/authorizations',this.loginForm);
      // console.log(res);
      //进行表单验证如果通过则发送请求并且保留token
      this.$refs.ruleForm.validate((val)=>{
          if(!val){
            this.loginloding=false;
            return this.$message.error("数据校验不通过");
          }
        login(this.loginForm).then(res=>{
            //登入成功把token值存入session中
            window.sessionStorage.setItem("token",res.data.data.token);
            //进行页面跳转
            this.$router.push('/home');
            console.log(res);
            this.loginloding=false;
          }).catch(err=>{
            //登入失败
            this.loginloding=false;
            console.log(err);
            return this.$message.error("登入失败");
          })

      });
    }
  }
}
</script>


<style scoped>
.login-container{
  position: fixed;
  left: 0;
  right: 0;
  top:0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../../assets/bg_ground.jpg") no-repeat;
  background-size: 100% 100%;

}
.el-form{
  width: 500px;
  padding:85px 45px 40px 45px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
}

.loginbtn{
    width: 100%;
}
</style>
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/webcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>文章列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--    查询表单-->
      <el-form :model="seachfrom" :rules="seachfromrules" ref="seachfromForm" size="mini" label-width="100px" class="demo-ruleForm">
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="seachfrom.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" prop="channelid">
          <el-select v-model="seachfrom.channelid" placeholder="请选择频道">
            <el-option  label="不选择频道" :value="null"></el-option>
            <el-option v-for="(item,index) in channelids" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
              v-model="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" @click="submitForm()">查询</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>根据查询条件共查询到{{total}}条数据</span>
      </div>
      <el-table
          v-loading="loading"
          :data="articledata"
          stripe
          border
          style="width: 100%">
        <el-table-column
            align="center"
            width="160px"
            label="封面">
          <template v-slot:default="scope">
<!--                {{scope.row}}-->
            <el-image class="fmimages" :src="scope.row.cover.images[0]"></el-image>
          </template>
        </el-table-column>
        <el-table-column
            prop="title"
            label="标题">
        </el-table-column>
        <el-table-column
            prop="status"
            label="状态">
          <template v-slot:default="scope">
              <el-tag type="info" v-if="scope.row.status===0">草稿</el-tag>
              <el-tag type="primary" v-else-if="scope.row.status===1">待审核</el-tag>
              <el-tag type="success" v-else-if="scope.row.status===2">审核通过</el-tag>
              <el-tag type="danger" v-else-if="scope.row.status===3">审核未通过</el-tag>
            <el-tag type="warning" v-else-if="scope.row.status===4">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="pubdate"
            label="发布时间">
        </el-table-column>
        <el-table-column
            label="操作">
          <template v-slot:default="scope">
            <el-button type="primary" icon="el-icon-edit" @click="editbut(scope.row)" circle></el-button>
            <el-button type="danger" icon="el-icon-delete"  @click="deletebut(scope.row)" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
<!--      分页  -->
      <el-pagination
          :disabled="loading"
          background
          :current-page.sync="querypageinfo.page"
          @current-change="crrentpage"
          layout="prev, pager, next"
          :total="total">
      </el-pagination>

      <el-dialog :visible.sync="dialogVisible" :modal="false">
        <p>hakjhgkja</p>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">打开内层 Dialog</el-button>
        </div>
      </el-dialog>
    </el-card>
<!--  弹出框  -->

  </div>

</template>

<script>
import  {getarticledata,getArticleChannels,deleteArticle} from '../../api/wzlb/article'
export default {
name: "article",
  data(){
      return {
        //查询表单
        seachfrom:{
          status:'',
          //频道id
          channelid:null,
        },
        seachfromrules:{

        },
        //查询到的数据量
        total:0,
      //  数据表格
        articledata:[],
      //  daterange是指时间
        daterange:null,
        //频道数组
        channelids:[],
        //分页的效果
        querypageinfo:{
          //默认
          page:1,
          //默认每页10
          per_page:10,
        },
        loading:false,
        //控制修改对话框
        dialogVisible:false


      }
  },
  created() {
      this.getarticledatas();
      this.getArticleChannel();
  },
  methods:{
    //表单提交
    submitForm(){
      this.loading=true;
      console.log(this.seachfrom);
      console.log(this.daterange);
      getarticledata({
        status:this.seachfrom.status,
        channel_id:this.seachfrom.channelid,
        begin_pubdate:this.daterange?this.daterange[0]:null,
        end_pubdate:this.daterange?this.daterange[1]:null
      }).then(res=>{
        this.loading=false;
        console.log("请求返回数据");
        console.log(res);
        this.total=res.data.data.total_count;
        this.articledata=res.data.data.results;
      }).catch(err=>{
        this.loading=false;
        console.log(err);
      })
    },
  //  重置表单
    resetForm(){
          this.$refs.seachfromForm.resetFields();
    },
  //页面开始加载就展示页面数据就获取表单数据
    getarticledatas(){
      getarticledata().then(res=>{
       this.total=res.data.data.total_count;
        this.articledata=res.data.data.results;
      }).catch(err=>{
        console.log(err);
      })
    },
  //  获取选项框数据
    getArticleChannel(){
      getArticleChannels().then((res)=>{
        this.channelids=res.data.data.channels;
      }).catch(err=>{
        console.log(err);
      })
    },
  //  当分页改变时
    crrentpage(crrentpage){
      //重新发请求
      this.querypageinfo.page=crrentpage;
      getarticledata(this.querypageinfo).then(res=>{
        console.log(res);
        this.total=res.data.data.total_count;
        this.articledata=res.data.data.results;
      }).catch(err=>{
        console.log(err);
      })
    },
    //编辑按钮
    editbut(row){
      //    通过动态路由跳转到发布页，公用一个from表单
      this.$router.push('/publish?id='+row.id);
    },
    //删除按钮
    deletebut(row){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading=true;
          deleteArticle(row.id).then(res=>{
            this.$message.success("成功！");
              console.log(res);
              this.loading=false;
          }).catch(err=>{
            this.loading=false;
            console.log(err);
          });
        //  刷新数据
        this.getarticledatas();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      console.log(deleteArticle());
      console.log(row);
    }

  }
}
</script>

<style scoped>
   .fmimages{
     width: 80px;
     height: 80px;
     background-size: cover;
   }
</style>
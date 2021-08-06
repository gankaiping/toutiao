<template>
      <div>
          <el-card>
            <div slot="header" class="clearfix">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/webcome' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>评论管理</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <el-table
                border
                stripe
                :data="commentdata"
                style="width: 100%">
              <el-table-column
                  prop="title"
                  label="标题">
              </el-table-column>
              <el-table-column
                  prop="total_comment_count"
                  label="总评论数">
              </el-table-column>
              <el-table-column
                  prop="fans_comment_count"
                  label="粉丝评论数">
              </el-table-column>
              <el-table-column
                  prop="scope"
                  align="center"
                  label="状态">
                <template v-slot:default="scope">
<!--                  {{scope.row.comment_status}}-->
                  <el-switch
                      v-model="scope.row.comment_status"
                      @change="datachang(scope.row.id,scope.row.comment_status)"
                      active-color="#13ce66"
                      inactive-color="#ff4949">
                  </el-switch>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryinfo.page"
                :page-sizes="[10, 20,40, 50]"
                :page-size="queryinfo.per_page"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
          </el-card>
      </div>
</template>

<script>
import {getarticledata} from '../../api/wzlb/article'
import {commentstatus} from '../../api/comment/comment'
export default {
name: "comment",
  data(){
      return {
        //发文数据
        commentdata:[],
      //  查询管理
        queryinfo:{
          page:1,
          per_page:10,
          response_type:'comment'
        },
      //  数据条数
        total:0,
      //  查询条件

      }
  },
  created() {
      this.getarticledatas();
  },
  methods:{
      getarticledatas(){
        getarticledata(this.queryinfo).then(res=>{
          console.log(res);
          this.commentdata=res.data.data.results;
          this.total=res.data.data.total_count;
        }).catch(err=>{
          console.log(err);
        })
      },
    datachang(id,status){
      console.log(id);
      console.log(status);
      commentstatus(id,status).then(res=>{
        this.$message.success("状态以改变！");
        console.log(res);
      }).catch(err=>{
        this.$message.error("错误！");
        console.log(err);
      })
    },
  //  当页面数据发生改变时
    handleSizeChange(size){
          this.queryinfo.per_page=size;
          this.getarticledatas();
    },
  //  当前页被修改时
    handleCurrentChange(currentpage){
      this.queryinfo.page=currentpage;
      this.getarticledatas();
    }
  }
}
</script>

<style scoped>

</style>
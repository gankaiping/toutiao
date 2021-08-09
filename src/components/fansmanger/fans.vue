<template>
      <el-card>
        <div slot="header" class="clearfix">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/webcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
          </el-breadcrumb>
          <el-tabs v-model="tabvalue" type="card" @tab-click="changepane">
            <el-tab-pane name="1" label="粉丝列表">
                <el-row :gutter="20">
                      <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="2" v-for="(fan,index) in fansdata" :key="index">
                            <div class="fansitem">
                              <el-avatar :size="60" :src="fan.photo">
                              </el-avatar>
                              <span>{{fan.name}}</span>
                              <el-button size="mini" type="primary">+ 关注</el-button>
                            </div>
                      </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane name="2" label="统计分析">
              <div>
                <div ref="echar" style="width: 600px;height:400px;"></div>
                <airreport></airreport>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
</template>

<script>
import * as echarts from 'echarts'
import {getfanslist} from "../../api/fan/fans";
import airreport from '../testechars/airreport.vue'

export default {
name: "fans",
  data(){
      return {
        //tab当前的值
        tabvalue:'1',
        //查询数组
        queryinfo:{
          page:1,
          per_page:20
        },
      //  粉丝数据
        fansdata:[]
      }
  },
  created() {
      this.getfansdata();
  },
  mounted() {
    var myChart = echarts.init(this.$refs.echar);
    // 指定图表的配置项和数据
    let option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data:['销量']
      },
      xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
  methods:{
      getfansdata(){
            getfanslist(this.queryinfo).then(res=>{
              console.log(res);
              this.fansdata=res.data.data.results;
            }).catch(err=>{
              console.log(err);
            });
      },
    //当tab被改变时
    changepane(){
        if(this.tabvalue==='2'){
          console.log(this.$refs.echar);
        }
    }

  },
  components:{
    airreport:airreport
  }

}
</script>

<style scoped>
    .fansitem{
      padding: 20px 10px;
        border: 1px solid #cccccc;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      height: 180px;
      /*width: 136px;*/
    }
</style>
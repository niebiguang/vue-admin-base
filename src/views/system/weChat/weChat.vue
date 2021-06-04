<!--
 * @Descripttion: 
 * @version: 客服微信管理
 * @Author: niebiguang
 * @Date: 2020-12-22 15:47:59
 * @LastEditors: niebiguang
 * @LastEditTime: 2021-01-19 14:57:05
-->
<template>
  <div class="container">
    <el-button class="btn" type="primary" size="default" @click="handleDialog()">创建</el-button>
    
    <el-table :data="pageInfo.dataList" border stripe >
      <el-table-column prop="id" align="center" label="ID" min-width="100"></el-table-column>
      <el-table-column prop="wechatNumber" align="center" label="微信号" min-width="100"></el-table-column>
      <el-table-column prop="wechatCollPhone" align="center" label="微信手机号" min-width="100"></el-table-column>
      <el-table-column prop="wechatName" align="center" label="微信名称" min-width="100"></el-table-column>
      <el-table-column prop="remark" align="center" label="备注" min-width="100"></el-table-column>
      <el-table-column prop="id" align="center" label="状态" min-width="100">
        <template slot-scope="scope"> 
          <div>{{scope.row.state ? '正常':'异常'}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="username" align="center" label="关联后台用户" min-width="100"></el-table-column>
      <el-table-column label="操作" align="center" min-width="180" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleDialog(scope.row)"
          >编辑</el-button>
        </template>
      </el-table-column>

    </el-table>
    <pagination
      :total="pageInfo.total"
      :page.sync="pageInfo.page"
      :limit.sync="pageInfo.pageSize"
      @pagination="getDataList()"
    />
    <!-- 编辑、创建弹窗 -->
    <el-dialog
      title="创建"
      :visible.sync="dialogVisible"
      width="30%"
      @close="">
      <el-form :model="weChatInfo" ref="form" label-width="120px" :inline="false" size="normal">
        <el-form-item label="微信号" required>
          <el-input v-model="weChatInfo.wechatNumber"></el-input>
        </el-form-item>
        <el-form-item label="微信手机号">
          <el-input v-model="weChatInfo.wechatCollPhone"></el-input>
        </el-form-item>
        <el-form-item label="微信名称" required>
          <el-input v-model="weChatInfo.wechatName"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="weChatInfo.remark"></el-input>
        </el-form-item>
        <el-form-item label="关联后台用户" required size="normal">
          <el-select v-model="weChatInfo.relationUserId" value-key="" placeholder="请选择" clearable filterable @change="">
            <el-option v-for="item in uesrList"
              :key="item.id"
              :label="item.username"
              :value="item.id">
            </el-option>
          </el-select>
        
        </el-form-item>
        <el-form-item label="可用状态" size="normal">
          <el-switch
            v-model="weChatInfo.state"
          >
          </el-switch>
        </el-form-item>
        
      </el-form>
      
      <span slot="footer">
        <!-- <el-button @click=" = false">Cancel</el-button> -->
        <el-button type="primary" @click="handleCreated">{{weChatInfo.id ? '保存':'创建'}}</el-button>
        <el-button @click="handleDelete(weChatInfo.id)" v-if="weChatInfo.id">删除</el-button>
      </span>
    </el-dialog>
    
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { getSystemUser, getCusetomerWechatList, addOrUpdateWechat, deleteWechat } from '@/api/system/wechat'
export default {
  components:{
    Pagination
  },
  data() {
    return {
      dialogVisible: false,
      pageInfo: {
        total: 0,
        page: 1,
        pageSize: 10,
        dataList:[]
      },
      uesrList:[],
      weChatInfo:{
        wechatNumber:'',
        wechatCollPhone: '',
        wechatName: '',
        remark:'',
        state:false,
        relationUserId:''
      }
    }
  },
  created() {
    this.getDataList()
    this.getSystemUser()
  },
  methods:{
    // 获取列表数据
    getDataList() {
      let params = {
        page: this.pageInfo.page,
        size: this.pageInfo.pageSize
      }
      getCusetomerWechatList(params).then(res => {
        this.pageInfo.total = res.data.totalPage
        this.pageInfo.dataList = res.data.pageData
        console.log(res)
      })
    },
    // 获取所有后台用户
    getSystemUser() {
      getSystemUser().then(res => {
        this.uesrList = res.data
      })
    },
    // 保存信息
    handleCreated() {
      let params = {...this.weChatInfo}
      console.log('params>>>>',this.weChatInfo)
      addOrUpdateWechat(params).then(res => {
        if(res.code == 200) {
          this.$message.success(res.msg)
          this.weChatInfo = {}
          this.dialogVisible = false
          this.getDataList()
        }
      })
    },
    // 打开编辑弹窗
    handleDialog(data) {
      this.dialogVisible = true
      if(data) {
        this.weChatInfo = {...data}
        // let {  }
      }
      // 删除客服微信状态
      delete this.weChatInfo.clientWechatId
      delete this.weChatInfo.followPeople
      delete this.weChatInfo.username
        console.log('>>>>>',this.weChatInfo)
      // if(this.weChatInfo.state) {
      //   delete this.weChatInfo.state
      //   console.log('>>>>>',this.weChatInfo)
      // }
    },
    // 删除信息
    handleDelete(id) {
      this.$confirm('确认删除该微信?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = id
        deleteWechat(data).then(res => {
          this.$message.success(res.msg)
          this.dialogVisible = false
          this.getDataList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });  
      })
    }
  }
}
</script>

<style scoped lang="less">
  @import "../../common.less";
  .btn{
    float: right;
    margin-bottom: 20px;
  }
</style>
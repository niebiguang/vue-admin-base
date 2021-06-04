<template>
    <div>
      <el-row class="container">
        <el-card shadow="always" :body-style="{ padding: '20px' }">
          <el-button type="primary" size="default" @click="addVisible = true">添加协商专员</el-button>
          <el-table style="margin-top:20px" :data="pageDetail.commissionerList" border stripe>
            <el-table-column prop="id" label="专员ID"  min-width="180" align="center"></el-table-column>
            <el-table-column prop="nickname" label="昵称"  min-width="180" align="center"></el-table-column>
            <el-table-column prop="productName" label="头像"  min-width="180" align="center">
              <template slot-scope="scope">
                <div>
                  <img class="avatar" :src="scope.row.avatar" alt="">
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="wechatNum" label="微信号"  min-width="180" align="center"></el-table-column>
            <el-table-column prop="productName" label="操作"  min-width="180" align="center">
              <template slot-scope="scope">
                <div>
                  <el-button type="text" size="default" @click="handleEdit(scope.row)">修改</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            :total="pageDetail.total"
            :page.sync="pageDetail.page"
            :limit.sync="pageDetail.pageSize"
            @pagination="getCommissionerList"
          />
        </el-card>
        <el-dialog
          :title="listId ? '修改' : '添加'"
          :visible.sync="addVisible"
          width="40%"
          @close="handleClose"
          center="">
          <el-form style="width:600px" :model="addInfo" ref="form" :rules="rules" label-width="120px" :inline="false" size="normal">
            <el-form-item label="昵称" required>
              <el-input v-model="addInfo.nickname" placeholder="请输入协商专员昵称"></el-input>
            </el-form-item>
            <el-form-item label="头像" required>
              <img class="avatar" :src="addInfo.avatar" alt="" v-if="addInfo.avatar">
              <el-upload
                class="upload-demo"
                action="https://mng.51gouxiao.com/oss/yun/upFile"
                :on-success="handleSuccess"
                multiple
               
                >
                <el-button size="small" type="primary">上传</el-button>
              </el-upload>
              
            </el-form-item>
            <el-form-item label="关联后台用户名">
              <el-autocomplete
                v-model="relationSysUserName"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输后台用户名称"
                value-key="username"
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item label="微信号">
              <el-input v-model="addInfo.wechatNum" placeholder="请输入协商专员微信号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">{{listId ? '修改' : '添加'}}</el-button>
              <!-- <el-button>取消</el-button> -->
            </el-form-item>
          </el-form>
          
        </el-dialog>
        
      </el-row>
    </div>
</template>

<script>
import { addOrUpdate, getCommissionerList, searchSysUser } from '@/api/system'
import pagination from '@/components/Pagination'
export default {
    props: {

    },
    data() {
        return {
          rules:{

          },
          pageDetail:{
            total: 0,
            page: 1,
            pageSize: 10,
            commissionerList:[]
          },
          addVisible: false,
          addInfo:{
            nickname:'',
            avatar:'',
            wechatNum:'',
            relationSysUserId:''
          },
          relationSysUserName:'',
          listId:''
        };
    },
    computed: {

    },
    created() {
      this.getCommissionerList()
    },
    mounted() {

    },
    watch: {

    },
    methods: {
      // 获取协商专员列表
      getCommissionerList() {
        let params = {
          page: this.pageDetail.page,
          size: this.pageDetail.pageSize
        }
        getCommissionerList(params).then(res => {
          this.pageDetail.commissionerList = res.data.pageData
          this.pageDetail.total = res.data.totalPage
        })
      },
      // 上传成功回调
      handleSuccess(res) {
        this.addInfo.avatar = res.url
      },
      // 搜索后台用户
      querySearchAsync(query,cb) {
        let params = {
          username: query || ''
        }
        searchSysUser(params).then(res => {
          cb(res.data)
        })
      },
      handleSelect(item) {
        console.log('item',item)
        this.addInfo.relationSysUserId = item.id
        this.relationSysUserName = item.username
      },
      // 修改
      handleEdit(data) {
        this.addInfo.nickname = data.nickname
        this.addInfo.avatar = data.avatar
        this.addInfo.relationSysUserId = data.relationSysUserId
        this.listId = data.id
        this.addInfo.wechatNum = data.wechatNum
        this.relationSysUserName = data.relationSysUserName
        this.addVisible = true
        // console.log('info>>>>'.this.addInfo)
      },
      // 添加 or 修改
      onSubmit() {
        let data = {...this.addInfo}
        if(this.listId) {
          data['id'] = this.listId
        }
        addOrUpdate(data).then(res => {
          console.log('res>>>>',res)
          this.$message.success(res.msg)
          this.addInfo.nickname = ''
          this.addInfo.avatar = ''
          this.addInfo.relationSysUserId = ''
          this.addInfo.wechatNum = ''
          this.listId = ''
          this.getCommissionerList()
          this.addVisible = false
        })
      },
      // 关闭弹窗
      handleClose() {
        this.addInfo.nickname = ''
        this.addInfo.avatar = ''
        this.addInfo.relationSysUserId = ''
        this.addInfo.wechatNum = ''
        this.listId = ''
      }
    },
    components: {
      pagination
    },
};
</script>

<style scoped lang="less">
  @import "../../common.less";
  .avatar{
    width: 80px;
    height: 80px;
  }
</style>

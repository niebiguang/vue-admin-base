<!--
 * @Descripttion: 
 * @version: 标签配置
 * @Author: niebiguang
 * @Date: 2020-12-22 15:50:05
 * @LastEditors: niebiguang
 * @LastEditTime: 2021-01-06 18:47:59
-->
<template>
  <div class="container">
    <el-button class="btn" type="primary" size="default" @click="handleDialog()">创建</el-button>
    <el-table v-loading="loading" :data="pageInfo.dataList" border stripe>
      <el-table-column prop="categoryDescribe" align="center" label="分类" min-width="100"></el-table-column>
      <el-table-column prop="sort" align="center" label="排序" min-width="100"></el-table-column>
      <el-table-column prop="labelContent" align="center" label="标签内容" min-width="100"></el-table-column>
      <el-table-column label="操作" align="center" min-width="180" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleDialog(scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="pageInfo.total"
      :page.sync="pageInfo.page"
      :limit.sync="pageInfo.pageSize"
      @pagination="getDataList()"
    />
    <!-- 创建、编辑弹窗 -->
    <el-dialog
      :title="tagInfo.id ? '保存':'创建'"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form :model="tagInfo" ref="form" label-width="120px" :inline="false" size="normal">
        <el-form-item label="分类" required size="normal">
          <el-select v-model="tagInfo.categoryId" value-key="" placeholder="请选择" clearable filterable @change="">
            <el-option v-for="item in tagList"
              :key="item.id"
              :label="item.categoryDescribe"
              :value="item.id">
            </el-option>
          </el-select>
        
        </el-form-item>
        <el-form-item label="排序" required>
          <el-input v-model="tagInfo.sort"></el-input>
        </el-form-item>
        <el-form-item label="标签内容" required>
          <el-input v-model="tagInfo.labelContent" type="textarea" rows="5"></el-input>
        </el-form-item>
        
      </el-form>
      
      <span slot="footer">
        <!-- <el-button @click=" = false">Cancel</el-button> -->
        <el-button type="primary" @click="handleCreated">{{tagInfo.id ? '保存':'创建'}}</el-button>
        <!-- <el-button @click="handleDelete(tagInfo.id)" v-if="tagInfo.id">删除</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getLabelConfig, getLabelContentList, addOrUpdateTag, deleteTag } from '@/api/system/tagConfig'
import Pagination from "@/components/Pagination";
export default {
  components: {
    Pagination
  },
  data () {
    return {
      loading: false,
      dialogVisible:false,
      pageInfo: {
        total: 0,
        page: 1,
        pageSize: 10,
        dataList:[]
      },
      tagList:[],
      tagInfo:{
        categoryId:'',
        sort: '',
        labelContent: ''
      }
    }
  },
  created() {
    this.getDataList()
    this.getLabelConfig()
  },
  methods:{
    // 获取列表数据
    getDataList() {
      this.loading = true
      let params = {
        page: this.pageInfo.page,
        size: this.pageInfo.pageSize
      }
      getLabelContentList(params).then(res => {
        this.loading = false
        this.pageInfo.total = res.data.totalPage
        this.pageInfo.dataList = res.data.pageData
      }).catch(fail => {
        this.loading = false
      })
    },
    // 删除标签
    handleDelete(id) {
      this.$confirm('确认删除该标签?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('id>>>>>',id)
        let data = id
        deleteTag(data).then(res => {
          this.$message.success(res.msg)
          this.getDataList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });  
      })
      
    },
    // 打开编辑弹窗
    handleDialog(data) {
      this.dialogVisible = true
      if(data) {
        this.tagInfo = {...data}
        console.log(this.tagInfo,data)
      }
    },
    // 获取分类标签
    getLabelConfig() {
      getLabelConfig().then(res => {
        this.tagList = res.data
      })
    },
    // 保存信息
    handleCreated() {
      let params = {...this.tagInfo}
      // console.log('params>>>>',this.weChatInfo)
      addOrUpdateTag(params).then(res => {
        if(res.code == 200) {
          this.$message.success(res.msg)
          this.tagInfo = {}
          this.dialogVisible = false
          this.getDataList()
        }
      })
    },
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
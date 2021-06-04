<!--
 * @Author: niebiguang
 * @Date: 2020-11-21 18:17:52
 * @LastEditTime: 2020-11-25 10:59:13
 * @LastEditors: niebiguang
 * @Description: 在库案件配置
 * @FilePath: \gouxiao-manage-fd\src\views\system\case\caseConfig.vue
 * @可以输入预定的版权声明、个性签名、空行等
-->
<template>
    <div class="container">
			<el-card shadow="always" :body-style="{ padding: '20px' }">
				<div class="tem-list">
					<!-- <el-button type="primary" size="default" @click="">下载模板</el-button> -->
					<a class="link-upload" href="//files.51gouxiao.com/2020-11-24/在库案件模板.xlsx">下载模板</a>
					<el-button type="primary" size="default" @click="addVisible = true">新增批次</el-button>
					
				</div>
				<el-table :data="pageDetail.dataList" border stripe>
					<el-table-column prop="createTime" align="center" label="创建时间" min-width="100"></el-table-column>
					<el-table-column prop="createName" align="center" label="创建人" min-width="100"></el-table-column>
					<el-table-column prop="batchNum" align="center" label="批次号" min-width="120"></el-table-column>
					<el-table-column prop="batchDesc" align="center" label="批次备注" min-width="100"></el-table-column>
					<el-table-column prop="caseCount" align="center" label="案件数" min-width="100"></el-table-column>
					<el-table-column prop="inDatabaseCount" align="center" label="在库数量" min-width="100"></el-table-column>
					<el-table-column align="center" label="操作" min-width="180" fixed="right">
						<template slot-scope="scope">
							<el-button
									size="mini"
									type="text"
									@click="handleCaseManager(scope.row.batchNum)"
							>个案管理</el-button>
							
						</template>
					</el-table-column>
				</el-table>
				<pagination
					:total="pageDetail.total"
					:page.sync="pageDetail.page"
					:limit.sync="pageDetail.pageSize"
					@pagination="getList"
				/>
			</el-card>
			<!-- 新建批次弹窗 -->
			<el-dialog
				title="新建批次"
				:visible.sync="addVisible"
				width="30%">
					<el-form :model="form" ref="form" label-width="80px" :inline="false" size="normal">
						<el-form-item label="批次备注">
							<el-input v-model="form.batchNote"></el-input>
						</el-form-item>
						<el-form-item label="文件" required>
							<el-upload
								class="upload-demo"
								:action="baesUrl"
								:on-success="handleSuccess"
          			:show-file-list=false
								multiple
								>
								<el-button size="small" type="primary">上传</el-button>
							</el-upload>
						</el-form-item>
						<el-form-item label="是否在库">
							<el-radio-group v-model="isCase" @change="handleChange">
								<el-radio label="1">是</el-radio>
								<el-radio label="2">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="onSubmit">立即创建</el-button>
							<!-- <el-button>取消</el-button> -->
						</el-form-item>
					</el-form>
			</el-dialog>
			<!-- 个案管理弹窗 -->
			<el-dialog
				title="个案管理"
				:visible.sync="caseVisible"
				width="70%">
				<div class="tem-list">
					<label>输入个案号：</label>
					<el-input
						class="search-input margin-right-10"
						v-model="caseManagerInfo.caseNo"
						placeholder="请输入个案号"
					></el-input>
				</div>
				<div class="tem-list">
					<label>手机号：</label>
					<el-input
						class="search-input margin-right-10"
						v-model="caseManagerInfo.mobilePhone"
						placeholder="请输入手机号"
					></el-input>
				</div>

				<div class="tem-list">
					<label>姓名：</label>
					<el-input
						class="search-input margin-right-10"
						v-model="caseManagerInfo.username"
						placeholder="请输入姓名"
					></el-input>
				</div>

				<div class="tem-list">
					<label>身份证：</label>
					<el-input
						class="search-input margin-right-10"
						v-model="caseManagerInfo.userIdNo"
						placeholder="请输入身份证"
					></el-input>
				</div>
				<div class="tem-list">
					<label>在库状态：</label>
					<el-radio-group v-model="caseStatus" @change="hanldeChangeCase">
						<el-radio label="1">在库</el-radio>
						<el-radio label="2">不在库</el-radio>
					</el-radio-group>
				</div>
				<div class="tem-list">
					<el-button type="primary" size="default" @click="handleUpdataStatus('',true)">全部改在库</el-button>
					<el-button type="primary" size="default" @click="handleUpdataStatus('',false)">全部改不在库</el-button>
					
				</div>
				<div class="tem-list">
					<el-button type="primary" size="default" @click="handleSearch">搜索</el-button>
					
				</div>
				<el-table :data="caseManagerDetail.dataList" border stripe>
					<el-table-column prop="caseNo" align="center" label="个案号" min-width="100"></el-table-column>
					<el-table-column prop="userMobilePhone" align="center" label="手机号" min-width="100"></el-table-column>
					<el-table-column prop="username" align="center" label="姓名" min-width="100"></el-table-column>
					<el-table-column prop="userIdNo" align="center" label="身份证" min-width="100"></el-table-column>
					<el-table-column prop="productName" align="center" label="产品" min-width="100"></el-table-column>
					<el-table-column prop="partner" align="center" label="合作方" min-width="100"></el-table-column>
					<el-table-column prop="id" align="center" label="在库" min-width="100">
						<template slot-scope="scope">
							<div>
								{{scope.row.inDatabaseStatus ? '是' : '否'}}
							</div>
						</template>
					</el-table-column>
					<el-table-column align="center" label="操作" min-width="180" fixed="right">
						<template slot-scope="scope">
							<el-switch
								v-model="scope.row.inDatabaseStatus"
								active-color="#409EFF"
								inactive-color="#8c8c8c"
								@change="handleUpdataStatus(scope.row.caseNo,scope.row.inDatabaseStatus)">
							</el-switch>
						</template>
					</el-table-column>
				</el-table>
				<pagination
					:total="caseManagerDetail.total"
					:page.sync="caseManagerDetail.page"
					:limit.sync="caseManagerDetail.pageSize"
					@pagination="getCaseList"
				/>
			</el-dialog>
			
    </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { getAllCaseConfig, createCaseConfig, upCaseConfigFile, getAllCaseInfo, updateInDatabaseStatus } from '@/api/system'
export default {
    props: {
                        
    },
    data() {
        return {
					baesUrl: process.env.VUE_APP_BASE_API + '/case/upCaseConfigFile',
					addVisible: false,
					caseVisible: false,
					pageDetail: {
						total: 0,
						page: 1,
						pageSize: 10,
						dataList: [],
					},
					form: {
						batchNote:'',
						configStatus: true,
						listData:[]
					},
					isCase:'1',
					caseStatus:'1',
					caseManagerDetail: {
						total: 0,
						page: 1,
						pageSize: 10,
						dataList: [],
					},
					caseManagerInfo: {
						mobilePhone:'',
						caseNo:'',
						username:'',
						userIdNo:'',
						inDatabase:true,
						batchNum:''
					}
        };
    },
    computed: {

    },
    created() {
			this.getList()
    },
    mounted() {

    },
    watch: {

    },
    methods: {
			getList() {
				let params = {
					page: this.pageDetail.page,
					size: this.pageDetail.pageSize
				}
				getAllCaseConfig(params).then(res => {
					if(res.code == 200) {
						this.pageDetail.dataList = res.data.pageData;
            this.pageDetail.total = res.data.totalPage;
					}
				})
			},
			// 选择是否在库
			handleChange(e) {
				console.log(e)
				if(e == 2) {
					this.form.configStatus = false
				}else{
					this.form.configStatus = true
				}
			},
			// 上传成功
			handleSuccess(res) {
				console.log(res)
				this.form.listData = [...res.data]
			},
			// 新建批次提交
			onSubmit( ) {
				let params = {
					...this.form
				}
				createCaseConfig(params).then(res => {
					this.$message.success(res.msg)
					this.getList()
					this.addVisible = true
					console.log('res>>>>',res)
				})
			},
			// 个案管理
			handleCaseManager(data) {
				this.caseManagerInfo.batchNum = data
				this.caseVisible = true
				this.getCaseList()
				console.log('data>>>>',data)
				
			},
			hanldeChangeCase(e) {
				if(e == 2) {
					this.caseManagerInfo.inDatabase = false
				}else{
					this.caseManagerInfo.inDatabase = true
				}
			},
			// 搜索在库案件
			handleSearch() {
				this.getCaseList()
			},
			getCaseList() {
				let params = { ...this.caseManagerInfo }
				params['page'] = this.caseManagerDetail.page
				params['size'] = this.caseManagerDetail.pageSize
				getAllCaseInfo(params).then(res => {
					if(res.code == 200) {
						this.caseManagerDetail.dataList = res.data.pageData;
            this.caseManagerDetail.total = res.data.totalPage;
					}
				}).catch(fail => {
					console.log(fail)
				})
			},
			// 修改在库案件状态
			handleUpdataStatus(id,status) {
				this.caseManagerInfo.inDatabase = status
				let params = {
					inDatabaseStatus:status
				}
				if(id && status) {
					params['caseNo'] = id
				}
				updateInDatabaseStatus(params).then(res => {
					this.$message.success(res.msg)
					this.getCaseList()
				}).catch(fail => {
					console.log(fail)
				})
			}
    }, 
    components: {
			Pagination
    },
};
</script>

<style scoped lang="less">
@import "../../common.less";
.link-upload{
	width: 98px;
	height: 40px;
	font-size: 14px;
	border-radius: 4px;
	margin-right: 10px;
	color: #FFF;
	background-color: #409EFF;
	border-color: #409EFF;
	line-height: 40px;
	text-align: center;
}
</style>

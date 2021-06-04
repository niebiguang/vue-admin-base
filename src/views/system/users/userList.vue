<style lang="less">
@import "../../common.less";
</style>

<template>
  <div>
    <el-row class="container">
      <el-card>
        <div class="tem-flex margin-bottom-20">
          <div class="tem-list">
            <label>姓名：</label>
            <el-input
              class="search-input margin-right-10"
              v-model="searchParams.username"
              placeholder="请输入姓名"
            ></el-input>
          </div>

          <div class="tem-list">
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="handleSearch"
              >搜索</el-button
            >
            <el-button icon="el-icon-refresh" size="mini" @click="handleClear"
              >重置</el-button
            >
          </div>
        </div>

        <div class="margin-bottom-20">
          <el-button type="primary" size="mini" @click="handleAdd" v-if="hasPerm('user_sys:insert')"
            >添加用户</el-button
          >
        </div>

        <el-table border v-loading="loading" :data="pageDetail.dataList">
          <el-table-column
            label="ID"
            prop="id"
            align="center"
            fixed="left"
            min-width="100"
          />
          <el-table-column
            label="用户名"
            prop="username"
            align="center"
            fixed="left"
            min-width="120"
          />
          <el-table-column
            label="昵称"
            prop="userNickName"
            align="center"
            min-width="120"
          />
          <el-table-column
            label="角色"
            prop="roleName"
            align="center"
            min-width="120"
          />

          <el-table-column
            label="状态"
            prop="status"
            align="center"
            min-width="100"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.status == false">停用</span>
              <span v-if="scope.row.status == true">启用</span>
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            align="center"
            min-width="200"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                class="margin-right-10"
                size="mini"
                type="text"
                @click="handleEdit(scope.row)"
                v-if="hasPerm('user_sys:update')"
                >编辑</el-button
              >

              <el-button
                size="mini"
                type="text"
                class="margin-right-10"
                @click="handleStatus(scope.row)"
              >
                <span v-if="scope.row.status == false">启用</span>
                <span v-if="scope.row.status == true">停用</span>
              </el-button>

              <el-button size="mini" type="text" @click="handleReset(scope.row)"
                >重置密码</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <pagination
          :total="pageDetail.total"
          :page.sync="pageDetail.page"
          :limit.sync="pageDetail.pageSize"
          @pagination="getUserList"
        />
      </el-card>
    </el-row>

    <el-dialog
      v-loading="editLoading"
      element-loading-text="加载中，请稍后..."
      width="30%"
      append-to-body
      title="添加用户"
      :visible.sync="addUserVisible"
    >
      <creatUser ref="creatUser" :row="row" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserVisible = false">取消</el-button>
        <el-button type="primary" @click="addUserOk">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      v-loading="editLoading"
      element-loading-text="加载中，请稍后..."
      width="30%"
      append-to-body
      title="编辑用户"
      :visible.sync="editUserVisible"
    >
      <creatUser ref="editUser" :row="row" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="editUserVisible = false">取消</el-button>
        <el-button type="primary" @click="editUserOk">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      width="30%"
      append-to-body
      title="重置密码"
      :visible.sync="editPasswordVisible"
    >
      <div ref="changePassword">
        <el-form
          :model="reform"
          :rules="reRules"
          ref="reform"
          label-width="100px"
        >
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input
              v-model="reform.oldPassword"
              placeholder="请输入"
              style="width: 70%"
            ></el-input>
          </el-form-item>

          <el-form-item label="新密码" prop="newPassword">
            <el-input
              v-model="reform.newPassword"
              placeholder="请输入"
              style="width: 70%"
            ></el-input>
          </el-form-item>

          <!-- <el-form-item label="确认密码" prop="lastpassword">
            <el-input
              v-model="reform.lastpassword"
              placeholder="请输入"
              style="width: 70%"
            ></el-input>
          </el-form-item> -->
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editPasswordVisible = false">取消</el-button>
        <el-button type="primary" @click="editPasswordOk">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import creatUser from "./compontents/creatUser";
import Pagination from "@/components/Pagination";
import { getSysUser, saveOrUpdateUser, updatePassword } from "@/api/system";
import { sha1 } from '@/libs/sha1'
export default {
  components: {
    Pagination,
    creatUser,
  },
  data() {
    return {
      row: {},
      addUserVisible: false,
      editUserVisible: false,
      editPasswordVisible: false,
      loading: false,
      editLoading: false,
      addLoading: false,
      paramsDate: "",
      searchParams: {
        username: "",
      },
      pageDetail: {
        total: 0,
        page: 1,
        pageSize: 10,
        dataList: [],
      },
      platformList: [],
      channelList: [],
      reform: {},
      redorms:{},
      reRules: {
        oldPassword: { required: true, message: "不能为空", trigger: "blur" },
        newPassword: { required: true, message: "不能为空", trigger: "change" },
        // lastpassword:{required: true, message: '不能为空', trigger: 'blur' },
      },
    };
  },
  methods: {
    paramsFormat(e) {
      this.paramsDate = e;
      this.searchParams.regTimeStartTime = this.paramsDate
        ? this.paramsDate[0]
        : "";
      this.searchParams.regTimeEndTime = this.paramsDate
        ? this.paramsDate[1]
        : "";
    },
    handleSearch() {
      this.pageDetail.page = 1;
      this.pageDetail.total = 0;
      this.getUserList();
    },
    handleClear() {
      this.paramsDate = "";
      this.searchParams = {};
      this.pageDetail.page = 1;
      this.pageDetail.total = 0;
      this.getUserList();
    },
    getUserList() {
      if (!this.hasPerm('user_sys:list')) {
        return
      }
      let params = Object.assign({}, this.searchParams);
      params["page"] = this.pageDetail.page;
      params["size"] = this.pageDetail.pageSize;
      getSysUser(params).then((res) => {
        let data = res.data;
        this.pageDetail.dataList = data.pageData;
        this.pageDetail.total = data.totalPage;
      });
    },
    handleAdd() {
      this.addUserVisible = true;
      this.$nextTick(() => {
        this.$refs.creatUser.form = {};
        this.$refs.creatUser.getRoleList();
      });
    },
    addUserOk() {
      this.$refs.creatUser.saveUserData((data) => {
        if (data) {
          this.addUserDataList(data);
          this.addUserVisible = false;
        }
      });
    },

    async addUserDataList(datalist) {
      let params = datalist;
      params["id"] = this.row.id ? this.row.id : "";
      this.editLoading = true;
      await saveOrUpdateUser(params).then((res) => {
        this.editLoading = false;
        // let data = res.data
        this.$message.success(res.msg);
        this.getUserList();
      });
    },

    handleEdit(row) {
      this.row = row;
      this.editUserVisible = true;
      this.$nextTick(() => {
        // this.$refs.editUser.form = {};
        this.$refs.editUser.getRoleList();
        this.$refs.editUser.form.username = row.username;
        // this.$refs.editUser.form.password = row.password
        this.$refs.editUser.form.roleId = row.roleId;
        this.$refs.editUser.form.userNickName = row.userNickName;
      });
    },
    editUserOk() {
      this.$refs.editUser.saveUserData((data) => {
        if (data) {
          this.addUserDataList(data);
          this.editUserVisible = false;
        }
      });
    },

    handleStatus(row) {
      let title = "";
      let deleteStatus;
      if (row.status == true) {
        title = "停用";
        deleteStatus = 2;
      } else {
        title = "启用";
        deleteStatus = 1;
      }
      this.$confirm("确认" + title + "？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {
            deleteStatus: deleteStatus,
            roleId:row.roleId,
            id: row.id,
            userNickName:row.userNickName,
            username:row.username
          };
          saveOrUpdateUser(params).then((res) => {
            let data = res.data;
            this.$message.success(res.msg);
            this.getUserList();
          });
        })
        .catch(function () {});
    },
    handleReset(row) {
      this.reform = {};
      this.editPasswordVisible = true;
    },
    editPasswordOk() {
      this.saveUserData((data) => {
        if (data) {
          // if(this.reform.newpassword != this.reform.lastpassword){
          //   this.$message.error('两次输入密码不一致,请重新输入')
          // }

          let params = {
            newPassword:sha1(data.newPassword),
            oldPassword:sha1(data.oldPassword)
          }
          params["sysUserId"] = this.row.id;
          updatePassword(params).then((res) => {
            this.$message.success(res.msg);
            this.getUserList();
            this.editPasswordVisible = false;
          });
        }
      });
    },
    saveUserData(callback) {
      this.$refs.reform.validate((valid) => {
        if (valid) {
          callback(this.reform);
        } else {
          callback(null);
          this.$message.error("请完善信息");
        }
      });
    },
  },
  mounted() {
    this.handleClear();
  },
};
</script>

<style scoped>
</style>
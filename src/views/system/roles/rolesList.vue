<style lang="less">
@import "../../common.less";
</style>

<template>
  <div>
    <el-row class="container">
      <el-card>
        <div class="tem-flex margin-bottom-20">
          <div class="tem-list">
            <label>角色名称：</label>
            <el-input
              class="search-input margin-right-10"
              v-model="searchParams.roleName"
              placeholder="请输入角色名称"
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
          <el-button v-if="hasPerm('user_role:insert')" type="primary" size="mini" @click="handleAdd"
            >添加角色</el-button
          >
        </div>

        <el-table border v-loading="loading" :data="pageDetail.dataList">
          <el-table-column
            label="角色ID"
            prop="roleCode"
            align="center"
            min-width="100"
          />

          <el-table-column
            label="角色名称"
            prop="roleName"
            align="center"
            fixed="left"
            min-width="150"
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
            label="更新时间"
            prop="updateTime"
            align="center"
            min-width="180"
          />
          <el-table-column
            label="操作"
            align="center"
            min-width="180"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                class="margin-right-10"
                @click="handleEdit(scope.row)"
                v-if="hasPerm('user_role:update')"
                >编辑</el-button
              >

              <el-button
                size="mini"
                type="text"
                class="margin-right-10"
                @click="handleStatus(scope.row)"
              >
                <span v-if="scope.row.status == true">停用</span>
                <span v-if="scope.row.status == false">启用</span>
              </el-button>
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
      title="添加角色"
      :visible.sync="addRoleVisible"
    >
      <creatRoles ref="creatRoles" :row="row" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRoleVisible = false">取消</el-button>
        <el-button type="primary" @click="addUserOk">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      v-loading="editLoading"
      element-loading-text="加载中，请稍后..."
      width="30%"
      append-to-body
      title="编辑角色"
      :visible.sync="editRoleVisible"
    >
      <creatRoles ref="editRoles" :row="row" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="editRoleVisible = false">取消</el-button>
        <el-button type="primary" @click="editUserOk">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import creatRoles from "./compontents/createRoles";
import Pagination from "@/components/Pagination";
import {
  getSysRole,
  saveOrUpdateRole,
  getSysRolePermission,
} from "@/api/system";
export default {
  components: {
    Pagination,
    creatRoles,
  },
  data() {
    return {
      row: {},
      addRoleVisible: false,
      editRoleVisible: false,
      loading: false,
      editLoading: false,
      addLoading: false,
      paramsDate: "",
      searchParams: {
        roleName: "",
      },
      pageDetail: {
        total: 0,
        page: 1,
        pageSize: 10,
        dataList: [],
      },
      platformList: [],
      channelList: [],
      rolePermission: [],
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
      if (!this.hasPerm('user_role:list')) {
        return
      }
      let params = Object.assign({}, this.searchParams);
      params["page"] = this.pageDetail.page;
      params["size"] = this.pageDetail.pageSize;
      getSysRole(params).then((res) => {
        let data = res.data;
        this.pageDetail.dataList = data.pageData;
        this.pageDetail.total = data.totalPage;
      });
    },
    handleAdd() {
      this.addRoleVisible = true;
      this.$nextTick(() => {
        this.$refs.creatRoles.form = {};
        this.$refs.creatRoles.getPermissionData();
        this.$refs.creatRoles.permission = [];
      });
    },
    addUserOk() {
      // console.log(this.$refs.creatRoles.saveUserData())
      // this.$refs.creatRoles.saveUserData((data) => {
      //   if (data) {
      //     this.addUserDataList(data);
      //     this.addRoleVisible = false;
      //   }
      // });

      this.$refs.creatRoles.saveUserData((data) => {
        if (data) {
          this.addUserDataList(data);
          this.addRoleVisible = false;
        }
      });
    },

    async addUserDataList(datalist) {
      let params;
      if (
        this.row.roleId == undefined ||
        typeof this.row.roleId == "undefined"
      ) {
        params = datalist;
        params["deleteStatus"] = 1;
      } else {
        params = datalist;
        params["deleteStatus"] = 1;
        params["roleId"] = this.row.roleId;
      }
      console.log(params)
      this.editLoading = true;
      await saveOrUpdateRole(params).then((res) => {
        this.editLoading = false;
        // let data = res.data
        this.$message.success(res.msg);
        this.getUserList();
      });
    },

    handleEdit(row) {
      this.row = row;
      this.editRoleVisible = true;
      let _this = this
      this.$nextTick(() => {
        _this.$refs.editRoles.getPermissionData();
        _this.$refs.editRoles.getRoleData()
        _this.$refs.editRoles.form.roleName = row.roleName
        _this.$refs.editRoles.form.roleCode = row.roleCode
        // console.log(this.$refs.editRoles.menuCodeList,'menuCodeList')

        // _this.$refs.editRoles.menuCodeList.forEach((i,n) => {
          
        //   let node = _this.$refs.editRoles.$refs.tree.getNode(i);
        //   console.log(node,'node')
        //   if(node.isLeaf){
        //     _this.$refs.tree.setChecked(node, true);
        //   }
        // });
      });
    },
    editUserOk() {
      this.$refs.editRoles.saveUserData((data) => {
        if (data) {
          this.addUserDataList(data);
          this.editRoleVisible = false;
        }
      });
    },
    handleStatus(row) {
      let params = {
        roleId: row.roleId,
      };
      getSysRolePermission(params).then((res) => {
        let data = res.data;
        this.rolePermission = data;
        let permission = [];
        let array1 = [];
        let array2 = [];
        let array3 = [];
        if (this.rolePermission.length > 0) {
          this.rolePermission.map((item, index) => {
            item.permissionCode.map((item1, index1) => {
              array1.push(item1.id);
            });
            if (item.childPermissionList.length > 0) {
              item.permissionCode.map((item2, index2) => {
                array2.push(item2.id);
              });
            }
          });
        } else {
          array3 = [];
        }
        array3 = array3.concat(array1, array2);
        permission = array3;

        this.row = row;
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
            let params;
            if (permission.length > 0) {
              params = {
                deleteStatus: deleteStatus,
                roleId: row.roleId,
                roleCode: row.roleCode,
                roleName: row.roleName,
                permissionList: permission,
              };
            } else {
              params = {
                deleteStatus: deleteStatus,
                roleId: row.roleId,
                roleCode: row.roleCode,
                roleName: row.roleName,
              };
            }
            saveOrUpdateRole(params).then((res) => {
              let data = res.data;
              this.$message.success(res.msg);
              this.getUserList();
            });
          })
          .catch(function () {});
      });
    },
    getSysRoleData(roleId) {},
  },
  mounted() {
    this.handleClear();
  },
};
</script>

<style scoped>
</style>
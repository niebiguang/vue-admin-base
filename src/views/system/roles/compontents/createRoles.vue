<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="角色名" prop="roleName">
        <el-input
          v-model="form.roleName"
          placeholder="请填写角色名"
          style="width: 70%"
        ></el-input>
      </el-form-item>

      <el-form-item label="角色ID" prop="roleName">
        <el-input
          v-model="form.roleCode"
          placeholder="请填写角色名"
          style="width: 70%"
        ></el-input>
      </el-form-item>

      <el-form-item label="角色" prop="role">
        <!-- <el-select v-model="form.role" placeholder="请选择角色" style="width:70%">
          <el-option v-for="(item,index) in rolesList" :key="index" :label="item.role" :value="item.id"></el-option>
        </el-select> -->

        <el-tree
          :data="dataList"
          show-checkbox
          node-key="menuCode"
          :default-checked-keys="menuCodeList"
          :props="defaultProps"
          :filter-node-method="filterNode"
          @check-change="handleCheckChange"
          @check="handleCheck"
          ref="tree"
        ></el-tree>
      </el-form-item>

      <!-- <el-form-item label="昵称" prop="nick">
        <el-input v-model="form.nick" placeholder="请输入昵称" style="width:70%"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" style="width:70%"></el-input>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
import { getSysPermission,getSysRolePermission } from "@/api/system";
export default {
  props:['row'],
  data() {
    return {
      form: {
        roleName:'',
        roleCode:'',
        permissionList:[]
      },
      rules: {
        roleName: { required: true, message: "不能为空", trigger: "blur" },
        roleCode: { required: true, message: "不能为空", trigger: "blur" },
      },
      rolesList: [],
      defaultProps: {
        // label: "menuName",
        label:function(data,node){
          // console.log('node',data,node)
          return data.menuName
        },
        children: "childPermissionList",
        isLeaf:function(data,node){
          // console.log('node',data,node)
          return node.isLeaf
        },
      },
      dataList: [],
      permission: [],
      // permissionRole: [],
      rolePermission:[],
      menuCodeList:[]
    };
  },
  methods: {
    saveUserData (callback) {
      this.$refs.form.validate(valid => {
        if (valid) {
          callback(this.form)
        } else {
          callback(null)
          this.$message.error('请完善信息')
        }
      })
    },
    getPermissionData() {
      getSysPermission().then((res) => {
        let data = res.data;
        this.dataList = data;
      });
    },
    handleCheckChange(data, checked, indeterminate) {
      // console.log(this.menuCodeList,'menuCodeList')
      // this.permission = this.$refs.tree.getCheckedNodes();
      // // console.log('this.$refs.tree',this.$refs.tree.getHalfCheckedKeys(),this.permission)

      // let permission = [];
      // let array1 = [];
      // let array2 = [];
      // let array3 = [];
      // if (this.permission.length > 0) {
      //   this.permission.map((item, index) => {
      //     item.permissionCode.map((item1, index1) => {
      //       array1.push(item1.id);
      //     });
      //     if (item.childPermissionList.length > 0) {
      //       item.childPermissionList.map((item2, index2) => {
      //         item2.permissionCode.map((item3, index3) => {
      //           array2.push(item3.id);
      //         });
      //       });
      //     }
      //   });
      // } else {
      //   array3 = [];
      // }
      // array3 = array3.concat(array1, array2);
      // permission = array3;
      // // console.log(permission, "permission");

      // if (permission.length > 0) {
      //   for (let i = 0; i < permission.length; i++) {
      //     for (let j = i + 1; j < permission.length; j++) {
      //       if(permission[i] == permission[j]){
      //         permission.splice(j,1)
      //         j--
      //       }
      //     }
      //   }
      // }else{
      //   permission = []
      // }
      // this.form.permissionList = permission

      // console.log('this.form.permissionList',this.form.permissionList)
    },
    handleCheck(data,checked){
      this.form.permissionList = []
      this.permission = []
      let checkedKeys = []
      let halfKeys = []
      checkedKeys = checked.checkedNodes
      halfKeys = checked.halfCheckedNodes
      this.permission = checkedKeys.concat(halfKeys)
     

      let permission = [];
      let array1 = [];
      let array2 = [];
      let array3 = [];
      // console.log(this.permission,'this.permission')
      if (this.permission.length > 0) {
        this.permission.map((item, index) => {
          item.permissionCode.map((item1, index1) => {
            array1.push(item1.id);
          });
          if (item.childPermissionList.length > 0) {
            item.childPermissionList.map((item2, index2) => {
              item2.permissionCode.map((item3, index3) => {
                array2.push(item3.id);
              });
            });
          }
        });
      } else {
        array3 = [];
      }
      // console.log(array1,array2)
      array3 = array1;
      permission = array3;
      // console.log(permission, "permission");

      if (permission.length > 0) {
        for (let i = 0; i < permission.length; i++) {
          for (let j = i + 1; j < permission.length; j++) {
            if(permission[i] == permission[j]){
              permission.splice(j,1)
              j--
            }
          }
        }
      }else{
        permission = []
      }
      this.form.permissionList = permission
      // console.log(this.form.permissionList)

      

    },
    filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
    getRoleData(){
      let _this = this
      let params = {
        roleId: this.row.roleId,
      };
      getSysRolePermission(params).then((res) => {
        let data = res.data;
        setTimeout(function(){
          _this.rolePermission = data;
        // console.log(data)
        
        let array = []
        let array1 = []
        let array2 = []

        let permission = []
        let permission1 = []
        let permission2 = []
        let permission3 = []
        if(_this.rolePermission.length>0){
          _this.rolePermission.map((item,index)=>{
            array.push(item.menuCode)
            if(item.childPermissionList.length>0){
              item.childPermissionList.map((item1,index1)=>{
                array1.push(item1.menuCode)
              })
            }
          })
        }
        array2 = array2.concat(array,array1)

        _this.menuCodeList = array2
        

        _this.$refs.tree.setCheckedKeys([])
        
        let arr = []

        _this.menuCodeList.forEach((i,n) => {
          var node = _this.$refs.tree.getNode(i);
          // console.log(_this.$refs.tree.getNode(i))
          if(node.isLeaf == false){
            // console.log
            // console.log(node,i,n,'i')
             _this.menuCodeList.splice(n,1)
             arr = _this.menuCodeList
            
            _this.$refs.tree.setChecked(node, true);
          }
        });
        _this.menuCodeList = arr

        },100)
        
        // console.log(this.menuCodeList,'menuCodeList',this.$refs.tree)
      })
    }
  },
};
</script>

<style scoped>
/deep/ .el-tree {
  top: 10px;
}
</style>
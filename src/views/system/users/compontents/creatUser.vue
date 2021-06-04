<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="角色" prop="roleId">
        <el-select v-model="form.roleId" placeholder="请选择角色" style="width:70%">
          <el-option v-for="(item,index) in rolesList" :key="index" :label="item.roleName" :value="item.roleId">{{item.roleName}}</el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="昵称" prop="userNickName">
        <el-input v-model="form.userNickName" placeholder="请输入昵称" style="width:70%"></el-input>
      </el-form-item>

      <el-form-item label="登录名" prop="username">
        <el-input v-model="form.username" placeholder="请输入登录名" style="width:70%"></el-input>
      </el-form-item>

      <!-- <el-form-item label="密码" prop="password" v-if="pswEditVisiable || !row.id">
        <el-input v-model="form.password" placeholder="请输入密码" style="width:70%"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password" v-if="!pswEditVisiable && row.id">
        <span>******</span>
        <el-button style="margin-left: 20px; color: #48A0FF;" class="margin-right-10" size="mini" type="text" @click="handleChangePsw">修改</el-button>
      </el-form-item> -->

      <!-- <FormItem :label="$t('password')" prop="password" v-if="pswEditVisiable || !id">
          <Input v-model="formValidate.password" style="width: 75%" />
      </FormItem>
      <FormItem :label="$t('password')" prop="password" v-if="!pswEditVisiable && id">
          <span>******</span>
          <Button :ghost="true" style="margin-left: 20px; color: #48A0FF;" type="text" size="default" @click="handleChangePsw">修改</Button>
      </FormItem> -->
    </el-form>
  </div>
</template>

<script>
import { getAllRole } from "@/api/system";
export default {
  props:['row'],
  data() {
    return {
      pswEditVisiable:false,
      form: {
        username:'',
        roleId:'',
        userNickName:'',
        // password:''
      },
      rules: {
        username:{ required: true, message: '不能为空', trigger: 'blur' },
        roleId:{ required: true, message: '不能为空', trigger: 'change' },
        userNickName:{ required: true, message: '不能为空', trigger: 'blur' },
        // password:{ required: true, message: '不能为空', trigger: 'blur' },
      },
      rolesList:[]
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
    getRoleList(){
      getAllRole().then((res) => {
        let data = res.data;
        this.rolesList = data
      });
    },
    handleChangePsw () {
      this.pswEditVisiable = !this.pswEditVisiable
    },
  },
};
</script>
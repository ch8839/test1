<template>
  <div class="userManage-container">
    <el-button type="primary" @click="handleAddUser">添加用户</el-button>

    <el-table :data="userList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="id" width="220">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column align="center" label="头像" width="220">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" class="user-avatar">
        </template>
      </el-table-column>
      <el-table-column align="center" label="昵称" width="220">
        <template slot-scope="scope">{{ scope.row.username }}</template>
      </el-table-column>
      <el-table-column align="center" label="角色">
        <template slot-scope="scope">{{ scope.row.roles }}</template>
      </el-table-column>
      <el-table-column align="center" label="负责项目">
        <template slot-scope="scope">
          <template v-if="scope.row.roles!=='super admin'">
            <el-tag v-for="(item,index) in scope.row.project_owner" :key="index">{{project_list_Map.get(item)}}</el-tag>
          </template>
          <template v-else>
            <el-tag>全部</el-tag>
          </template>

        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleUpdateUser(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDeleteUser(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑用户':'增加用户'">
      <el-form :model="user" label-width="80px" label-position="left">
        <el-form-item label="昵称">
          <el-input v-model="user.username" placeholder="用户昵称" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input :type="pwdType" v-model="user.password" placeholder="用户密码" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="user.roles" placeholder="请选择角色" @change='rolesChange'>
            <el-option label="超级管理员" value="super admin"></el-option>
            <el-option label="普通管理员" value="admin"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责项目">
          <el-select v-model="user.project_owner" placeholder="请选择负责项目" :disabled="isdisabled" multiple
            @change='projectOwnerChange'>
            <el-option v-for="(item,index) in project_list" :key="index" :label="item.project_name"
              :value="item.project_num"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="头像">
          <el-button type="primary" size="small" @click="handleUploadAvatar">选择文件</el-button>
          <img :src="user.avatar" class="avatar">
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmRole">确认</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import {
    getUserList,
    getProjectList,
    addUser,
    updateUser,
    deleteUser
  } from '@/api/user/usermanage.js'

  const defaultUser = {
    username: '',
    password: '',
    roles: '',
    project_owner: [],
    avatar: ''
  }
  export default {
    name: 'UserManage',
    data() {
      return {
        userList: [],
        user: {},
        dialogVisible: false,
        dialogType: 'edit',
        pwdType: 'password',
        project_list: [],
        project_list_Map: new Map(),
        isdisabled: false
      }
    },

    methods: {
      async handleAddUser() {
        // console.log("add")
        this.dialogType = 'add'
        this.dialogVisible = true
        this.user = Object.assign({}, defaultUser)
      },

      async handleUpdateUser(scope) {
        this.dialogVisible = true
        this.dialogType = 'edit'
        this.pwdType = 'password'
        console.log('scope.row', scope.row)

        let select_user = scope.row
        this.user = JSON.parse(JSON.stringify(select_user))
        this.user.project_owner = this.user.project_owner.filter(item => item)
        if (this.user.roles == 'super admin') {
          this.isdisabled = true
        } else {
          this.isdisabled = false
        }
        console.log('this.user ', this.user)
      },

      async handleDeleteUser(id) {
        this.$confirm('是否删除该用户?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(async () => {
            let res = await deleteUser(id)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.init()
          })
          .catch(err => {
            console.log(err)
            this.$message({
              type: 'info',
              message: '取消删除'
            })
          })
      },

      async handleUploadAvatar() {
        console.log('changchaun')
      },

      async confirmRole() {
        const isEdit = this.dialogType == 'edit'

        if (isEdit) {
          let update_data = JSON.parse(JSON.stringify(this.user))
          update_data.project_owner = update_data.project_owner.join('、')
          console.log('update_data', update_data)
          let res = await updateUser(update_data)
          if (res.data.code == 200) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          }
        } else {
          let add_data = JSON.parse(JSON.stringify(this.user))
          add_data.project_owner = add_data.project_owner.join('、')
          console.log('add_data', add_data)
          let res = await addUser(add_data)
          if (res.data.code == 200) {
            this.$message({
              type: 'success',
              message: '新增成功!'
            })
          }
        }
        this.init()
        this.dialogVisible = false
      },

      rolesChange(value) {
        if (value == 'super admin') {
          this.isdisabled = true
        } else {
          this.isdisabled = false
        }
        console.log('value', value)
      },

      projectOwnerChange(value) {
        console.log('projectOwnerChange', value)
      },

      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      async init() {
        let res = await getUserList()
        this.userList = res.data.res
        console.log('getUserList', res)

        let res2 = await getProjectList()
        this.project_list = res2.data.res
        console.log('getProjectList', res2)

        let project_list_Map = []
        this.project_list.forEach(item => {
          project_list_Map.push([item.project_num, item.project_name])
        })
        console.log('project_list_Map', project_list_Map)
        this.project_list_Map = new Map(project_list_Map)
        this.userList = this.userList.map(item => {
          item.project_owner = item.project_owner.split('、')
          return item
        })
      }
    },

    mounted() {
      this.init()
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .userManage-container {
    padding: 20px;

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }

    .avatar {
      display: block;
      width: 40%;
      height: 30%;
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: #eeeeee;
      cursor: pointer;
      user-select: none;
    }
  }

</style>

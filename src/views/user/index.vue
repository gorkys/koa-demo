<style rel="stylesheet/scss" lang="scss" scoped>
  .el-input__icon {
    font-size: 20px;
  }
</style>

<template>
  <div id="user" class="padding">
    <el-row :gutter="10">
      <el-col>
        <el-card shadow="hover">
          <div slot="header">
            <h2>用户管理</h2>
          </div>
          <el-row>
            <el-row>
              <el-button type="primary" style="margin-bottom: 5px" size="small" icon="el-icon-plus" @click="userDialog('add','')">新增用户
              </el-button>
            </el-row>
            <el-row style="margin-top: 2rem">
              <el-table
                :data="userList"
                border
                style="width: 100%">
                <el-table-column
                  prop="nickname"
                  label="用户昵称"
                  align="center"
                />
                <el-table-column
                  prop="username"
                  label="登录名"
                  align="center"
                />
                <el-table-column
                  prop="creationTime"
                  label="创建时间"
                  align="center"/>
                <el-table-column
                  prop="updateTime"
                  label="更新时间"
                  align="center"/>
                <el-table-column
                  label="操作"
                  align="center"
                  width="260">
                  <template slot-scope="scope">
                    <el-button type="warning" size="mini" @click="userDialog('edit',scope.row.id)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="delUser(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                :total="pageTotal"
                style="float: right;margin-top: 2rem"
                layout="total, prev, pager, next"
                @current-change="pageChange"/>
            </el-row>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="changeUser"
      width="480px">
      <el-form ref="formUser" :model="formUser" :rules="rules" status-icon label-width="80px" label-position="left">
        <el-form-item label="用户昵称" prop="name">
          <el-input v-model="formUser.nickname" maxlength="10" placeholder="请输入用户昵称"/>
        </el-form-item>
        <el-form-item label="登录账号" prop="user">
          <el-input v-model="formUser.username" maxlength="15" placeholder="请输入登录账号"/>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="formUser.password" :type="pwType" placeholder="请输入密码">
            <i
              slot="suffix"
              :class="[pwType === 'password'?'el-icon-view':'el-icon-view']"
              title="显示密码"
              style="cursor:pointer;"
              class="el-input__icon iconfont"
              @click="changePass"></i>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeUser = false">取 消</el-button>
        <el-button type="primary" @click="confirmUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getUesr,
  addUser,
  editUser,
  delUser
} from '@/api/user'

export default {
  components: { },
  data() {
    return {
      userList: [],
      changeUser: false,
      passDialog: false,
      pwType: 'password', // 明暗文切换
      dialogTitle: '新建用户',
      formUser: {
        id: '',
        nickname: '',
        username: '',
        password: ''
      },
      userId: void 0,
      pageNo: 1,
      pageSize: 10,
      pageTotal: 0,
      rules: {
        nickname: [{ required: true, message: '用户昵称不能为空', trigger: 'blur' }],
        username: { required: true, message: '用户名不能为空', trigger: 'blur' },
        password: { required: true, message: '密码不能为空', trigger: 'blur' }
      },
      passRules: {
        password: { required: true, message: '密码不能为空', trigger: 'change' }
      },
      formPass: {
        password: ''
      }
    }
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      getUesr(params).then(res => {
        this.userList = res.cust.userList
        this.pageTotal = res.cust.pages.total
      })
    }, // 获取权限列表
    userDialog(type, id) {
      this.changeUser = true
      if (type !== 'add' && id !== '') {
        this.dialogTitle = '编辑用户'
        this.userId = id
        /**
           *根据已有用户列表判断进行回显
           */
        for (const item of this.userList) {
          if (item.id === id) {
            this.$nextTick(() => { /* 为了能够清空表单*/
              this.formUser.nickname = item.nickname
              this.formUser.username = item.username
              this.formUser.password = item.password
            })
          }
        }
      } else {
        this.dialogTitle = '新建用户'
        if (this.$refs.formUser !== undefined) {
          this.$refs.formUser.resetFields()
        }
      }
    }, // 打开用户弹窗
    confirmUser() {
      this.$refs.formUser.validate(valid => {
        if (valid) {
          const data = {
            nickname: this.formUser.nickname,
            username: this.formUser.username,
            password: this.formUser.password
          }
          if (this.dialogTitle === '新建用户') {
            addUser(data).then(res => {
              this.$message({ type: 'success', message: res.info })
              this.getUserList()
              this.changeUser = false
            })
          } else {
            data['id'] = this.userId
            editUser(data).then(res => {
              this.$message({ type: 'success', message: res.info })
              this.getUserList()
              this.changeUser = false
            })
          }
        }
      })
    }, // 确认新增与编辑
    delUser(id) {
      this.$confirm('此操作将永久删除该项, 是否删除?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = { id: id }
        delUser(params).then(res => {
          this.$message({ type: 'success', message: res.info })
          this.getUserList()
        })
      })
    }, // 删除用户
    changePass() {
      this.pwType = this.pwType === 'password' ? 'text' : 'password'
    }, // 密码明密文切换
    pageChange(val) {
      this.pageNo = val
      this.getUserList()
    } // 分页
  }
}
</script>

export default {
  data() {
    // 自定义校验规则
    const checkEmail = (rule, value, callback) => {
      if (!value.trim()) return callback(new Error('邮箱不能为空'))
      if (/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)) {
        callback()
      } else {
        callback(new Error('邮箱格式不正确'))
      }
    }
    const checkMobile = (rule, value, callback) => {
      if (!value.trim()) return callback(new Error('手机号码不能为空'))
      if (/^1[3-9][0-9]\d{4,8}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号码格式不正确'))
      }
    }
    return {
      userList: [],
      // 请求列表的数据对象
      queryInfo: {
        query: '',
        pagenum: 1, // 当前页码值
        pagesize: 2
      },
      total: 0,
      addDialog: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addFormRules: {
        username: [{ required: true, message: '请输入用户名称！', trigger: 'blur' }],
        password: [{ required: true, message: '请输入用户密码！', trigger: 'blur' }],
        email: [
          { validator: checkEmail, trigger: 'blur' },
          { required: true, message: '请输入邮箱地址', trigger: 'blur' }
        ],
        mobile: [
          { validator: checkMobile, trigger: 'blur' },
          { required: true, message: '请输入邮箱地址', trigger: 'blur' }
        ]
      },
      // 控制编辑的对话框
      editDialogVisible: false,
      // 编辑的用户对象
      editForm: {
        username: '',
        email: '',
        mobile: ''
      },
      editFormRules: {
        email: [
          { validator: checkEmail, trigger: 'blur' },
          { required: true, message: '请输入邮箱地址', trigger: 'blur' }
        ],
        mobile: [
          { validator: checkMobile, trigger: 'blur' },
          { required: true, message: '请输入邮箱地址', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getuseList()
  },
  methods: {
    async getuseList() {
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      if (res.meta.status !== 200) return this.$message.error('获取数据失败！')
      this.userList = res.data.users
      this.total = res.data.total
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getuseList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getuseList()
    },
    async stateChange(id, state, user) {
      const { data: res } = await this.$http.put(`users/${id}/state/${state}`)
      if (res.meta.status !== 200) {
        user.mg_state = !user.mg_state
        return this.$message.error('修改失败！')
      }
    },
    addDialogClose() {
      this.$refs.addFormRef.resetFields()
      this.addDialog = false
    },
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        // console.log(valid) // 校验成功返回true，失败返回false
        if (!valid) return
        const { data: res } = await this.$http.post('users', this.addForm)
        if (res.meta.status !== 201) return this.$message.error('添加失败')
        this.$message.success('添加用户成功')
        this.addDialog = false
        this.getuseList()
      })
    },
    async remove(id) {
      const res = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (res !== 'confirm') {
        return this.$message({ type: 'info', message: '已取消删除' })
      }
      const { data: resCon } = await this.$http.delete('users/' + id)
      if (resCon.meta.status !== 200) return this.$message.error('删除用户失败')
      this.$message.success('删除用户成功！')
      // 此时只是把当前页面上唯一的一条数据从数据库中删除了，但userList的长度还为1
      if (this.userList.length === 1 && this.queryInfo.pagenum > 1) {
        this.queryInfo.pagenum--
      }
      this.getuseList()
    },
    // 显示编辑对话框
    async showEditDialog(id) {
      // 通过axios获得表单中的数据
      const { data: res } = await this.$http.get('users/' + id)
      if (res.meta.status !== 200) return this.$message.error('获取用户数据失败！')
      this.editForm = res.data
      this.editDialogVisible = true
    },
    // 对话框关闭后重置表单
    edirDialogClose() {
      this.$refs.editFormRef.resetFields()
    },
    // 点击确定提交修改后的用户数据
    saveUserInfo(id) {
      // 提交数据之前先整体验证表单
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        // 验证成功发起请求
        const {data: res} = await this.$http.put('users/' + this.editForm.id, {
          mobile: this.editForm.mobile,
          email: this.editForm.email
        })
        if (res.meta.status !== 200) return this.$message.error('编辑用户失败')
        this.$message.success('编辑用户成功!')
        this.getuseList()
        this.editDialogVisible = false
      })
    }
  }
}

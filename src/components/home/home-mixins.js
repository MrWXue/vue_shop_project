export default {
  data() {
    return {
      menulist: [],
      iconlist: ['icon-users', 'icon-tijikongjian', 'icon-shangpin', 'icon-danju', 'icon-baobiao'],
      collapse: false
    }
  },
  created() {
    this.getMenulist()
  },
  methods: {
    logout() {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    },
    async getMenulist() {
      const { data: res } = await this.$http.get('/menus')
      if (res.meta.status !== 200) return this.$message.error('获取左侧菜单失败！')
      this.menulist = res.data
    }
  }
}

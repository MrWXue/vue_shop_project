<template>
  <el-container class="home-container">
  <!-- 头部 -->
  <el-header>
    <div class="logo-box">
      <img src="../../assets/images/heima.png" alt="">
      <span>电商后台管理系统</span>
    </div>
    <el-button type="info" @click="logout">退出</el-button>
  </el-header>
  <el-container>
    <!-- 侧边栏区域 -->
    <el-aside :width="collapse? '64px': '200px'">
      <div class="toggle_bar" @click="collapse = !collapse">|||</div>
      <!-- 菜单 -->
      <el-menu
        background-color="#333744"
        text-color="#fff"
        active-text-color="#409eff"
        :unique-opened="true"
        :collapse="collapse"
        :collapse-transition="false"
        :router="true">
        <el-submenu :index="item.id + ''" v-for="(item, i) in menulist" :key="item.id" :style="'width:' + collapse? '64px': '200px'">
          <template slot="title">
            <i :class="['iconfont', iconlist[i]]"></i>
            <span>{{item.authName}}</span>
          </template>
          <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id">
          <i class="el-icon-menu"></i>
          <span>{{subItem.authName}}</span></el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- 主体内容区域 -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
  </el-container>
</template>

<script>
import mix from './home-mixins.js'
export default {
  mixins: [mix]
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
  .el-header {
  width: 100%;
  height: 60px;
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  margin: 0;
  padding-right: 15px;
  .logo-box {
    display: flex;
    color: #fff;
    align-items: center;
    font-size: 20px;
    user-select: none;
    img {
      margin-right: 20px;
      width: 50px;
      height: 50px;
    }
  }
  }
  .el-aside {
  background-color: #333744;
  }
  .el-main {
  background-color: #eaedf1;
  }
  .toggle_bar {
  color: #fff;
  font-size: 12px;
  text-align: center;
  line-height: 25px;
  background-color: #4a5064;
  user-select: none;
  cursor: pointer;
  letter-spacing: 0.1em;
  }
  .el-menu {
  user-select: none;
  }
}
</style>

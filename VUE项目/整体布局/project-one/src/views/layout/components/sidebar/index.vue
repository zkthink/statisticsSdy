<template>
    <div class="sidebar-container" :class="isCollapse ? 'collapse' : 'no-collapse'">
      <div class="el-scrollbar__wrap">
        <div class="el-scrollbar__view" :class="isCollapse ? 'collapse' : 'no-collapse'">
          <CollapseSvg :toggleClick="toggleSideBar" :isActive="isCollapse"></CollapseSvg>
          <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">导航一</span>
              </template>
               
              <el-menu-item index="1-1" key="1-1" @click="goPath('/dashboard')">
                <!-- router-link不实用，原因是行内元素，必选点击到文字才可以跳转--坑 -->
                <!-- 使用 router-link 组件来导航. -->
                <!-- 通过传入 `to` 属性指定链接. -->
                <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
                <!-- <router-link to="/dashboard">页面1</router-link> -->
                <span>页面1</span>
              </el-menu-item>
              <el-menu-item index="1-2" key="1-2" @click="goPath('/logMng')">
                <span>页面2</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item index="2" @click="goPath('/systemMng')">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" @click="goPath('/userMng')">
              <i class="el-icon-setting"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
</template>

<script>
import CollapseSvg from './collapseSvg'

export default {
  name: 'sidebar',
  components: {
    CollapseSvg
  },
  computed: {
    
  },
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },

    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    toggleSideBar() {
      this.isCollapse = !this.isCollapse
      this.Bus.$emit('isCollapse', this.isCollapse);
    },

    goPath(path) {
      //catch回调为了解决 NavigationDuplicated 问题
      this.$router.push(path).catch(err => {err})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.sidebar-container {
  position: relative;
  -webkit-transition: width .28s;
  transition: width .28s;
  height: 100%;
  // 第一层隐藏滑动条
  overflow: hidden;

  &.collapse {
    width: 60px;
  }

  &.no-collapse {
    width: 180px;
  }

  // 第二层父元素允许滑动条
  .el-scrollbar__wrap {
    position: absolute; 
    left: 0;
    // width: 190px; // 使用绝对定位时，可使用宽度设定
    overflow-x: hidden;
    overflow-y: auto;
    
    // 第三层：实现隐藏滑动条--原理就是父元素负责滚动，子元素负责遮盖
    .el-scrollbar__view {
      &.collapse {
        width: 60px;
      }

      &.no-collapse {
        width: 180px;
      }
    }
  }

  /deep/ .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 100%;
  }

  .el-submenu .el-menu-item {
    height: 50px;
    line-height: 50px;
    padding: 0 45px;
    min-width: 100%;
  }
}
</style>

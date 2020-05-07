<template>
  <div class="app-wrapper">
    
    <div class="Navbar-box">
      <Navbar></Navbar>
    </div>
    
    <div class="Sidebar-box">
      <transition>
        <Sidebar></Sidebar>
      </transition>
    </div>
    
    <div class="mainbar-box" :class="{active: !isActive}">
      <Mainbar></Mainbar>
    </div>
  </div>
</template>

<script>
import {Navbar, Sidebar, Mainbar} from './components/index'

export default {
  name: 'layout',
  components: {
    Navbar, Sidebar, Mainbar
  },
  computed: {
    
  },
  data() {
    return {
      isActive: true
    }
  },
  created() {
    // 简单利用事件总线注册、触发、销毁事件 -- 需自定义监听标识isCollapse
    this.Bus.$on('isCollapse', this.switchCollapse);
  },

  beforeDesotry() {
    this.Bus.$off('isCollapse');
  },
  methods: {
    switchCollapse(val) {
      this.isActive = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}

// 顶部区域
.Navbar-box {
  position: fixed;
  width: 100%;
  min-width: 420px;
  overflow: hidden;
  overflow-x: auto;
  z-index: 999;
  height: 60px;
  line-height: 60px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);
  background-color:aquamarine;
}

// 左侧区域
.Sidebar-box {
  position: fixed;
  top: 60px;
  bottom: 0;
  left: 0;
  background-color: aqua;
}

.Sidebar-box::-webkit-scrollbar {
  display: none;
}

// 主体区域
.mainbar-box {
  height: 100%;
  transition: margin-left .28s;
  margin-left: 60px;
  padding-top: 60px;
  background: bisque;

  &.active {
    margin-left: 180px;
  }
}
</style>

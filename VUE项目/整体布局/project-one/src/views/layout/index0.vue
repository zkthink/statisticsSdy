<template>
  <div class="app-wrapper">
    <div class="sidebar-box">
      <span>sidebar-box</span>
    </div>

    <div class="navbar-box">
      <span>navbar-box</span>
    </div>
    
    <div class="main-container">
      <span>main-container</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'layout',
  components: {
  },
  computed: {
    
  },
  methods: {
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
.navbar-box {
  position: absolute;
  width: 100%;
  min-width: 420px;
  z-index: 999;
  height: 60px;
  line-height: 60px;
  color: #333333;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);
  background-color:aquamarine;
}

// 左侧区域
.sidebar-box {
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 0;
  width: 180px;
  min-height: 400px;
  background-color: aqua;
}

// 主体区域
.main-container {
  position: absolute;
  top: 60px;
  left: 180px;
  height: calc(100% - 60px);
  width: calc(100% - 180px);
  transition: margin-left .28s;
  background: bisque;
}
</style>

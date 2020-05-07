<template>
  <div>
    <span> {{'PAGE4........ ' + $route.path}} </span>
    <el-button @click="goPath(1)">跳转</el-button>
  </div>
</template>

<script>

export default {
  name: 'mainbar',
  components: {
  },
  computed: {
    
  },
  watch: {
    // 通过监听路由 -- 监测变化
    // '$route' (to, from) {
    //   console.log(to, from, 'to, from')
    //   // 对路由变化作出响应...
    // }
  },
  
  // 通过导航守卫 -- 监测变化 和上面watch监听--使用方式二选一
  beforeRouteUpdate (to, from, next) {
    console.log(to, from, next, 'to, from, next')
    // react to route changes...
    // don't forget to call next() 导航守卫一定要使用next() 否则url不更新
    next()
  },

  methods: {
    goPath(val) {
      // 注意这个跳转方式path
      this.$router.push({path: `/userMng/index/${val}`}).catch(err => {err})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

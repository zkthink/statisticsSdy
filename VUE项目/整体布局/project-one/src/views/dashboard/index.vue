<template>
  <div>
    <span> PAGE1........ </span>
    <div>{{username}}</div>
    <el-button type="primary" @click="goBack">返回</el-button>
  </div>
</template>

<script>

export default {
  name: 'mainbar',
  components: {
  },
  computed: {
    username() {
      // 我们很快就会看到 `params` 是什么
      return this.$route.params.username
    }
  },
  methods: {
    goBack() {
      console.log("通过注入路由器")
      console.log("我们可以在任何组件内通过 this.$router 访问路由器：", this.$router)
      console.log("也可以通过 this.$route 访问当前路由：", this.$route)

      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <span> PAGE1........ </span>
    <div>{{username}}</div>
    <el-button type="primary" @click="goBack">返回</el-button>
    <div>
      <el-button type="primary" @click="incrementAsync2({amount: 10})">自增</el-button>
      <span>数字： {{count}} </span>
      <span> {{countAlias}} </span> 
      <span> {{countPlusLocalState}} </span> 
      <span> {{doneTodos}} </span> 
      <span> {{doneCount}} </span> 
    </div>
    <div>************************************************************************************************************</div>
    <div>
      <el-button type="primary" @click="incrementAge">自增年龄</el-button>
      <el-button type="primary" @click="asyncIncrementAge">异步年龄</el-button>
      <span>年龄： {{$store.getters.getAge}} </span>
    </div>
  </div>
</template>

<script>
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'

export default {
  name: 'mainbar',
  components: {
  },
  data() {
    return {
      localCount: 1000
    }
  },
  computed: {
    username() {
      // 我们很快就会看到 `params` 是什么
      return this.$route.params.username
    },
    // getter
    doneTodos() {
      return this.$store.getters.doneTodos
    },
    // doneTodosCount() {
    //   return this.$store.getters.doneTodosCount
    // },
    ...mapGetters({
      // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
      doneCount: 'doneTodosCount'
    }),
    // ...对象展开运算符 -- 将它与局部计算属性混合使用
    ...mapState({
      // 箭头函数可使代码更简练
      // count: state => state.count,

      // 传字符串参数 'count' 等同于 `state => state.count`
      countAlias: 'count',

      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      countPlusLocalState (state) {
        return state.count + this.localCount
      }
    }),
    // 映射 this.count 为 store.state.count -- 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
    ...mapState(['count'])
  },
  methods: {
    goBack() {
      console.log("通过注入路由器")
      console.log("我们可以在任何组件内通过 this.$router 访问路由器：", this.$router)
      console.log("也可以通过 this.$route 访问当前路由：", this.$route)

      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },

    // // 变更值
    // increment() {
    //   this.$store.commit('increment')
    //   console.log(this.$store.state.count)
    // },

    // increment2() {
    //   this.$store.commit('increment2', 10000)
    // },

    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'increment2' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    }),

    // incrementAsync() {
    //   this.$store.dispatch('incrementAsync')
    // },

    // incrementAsync2() {
    //   this.$store.dispatch({
    //     type: 'incrementAsync2',
    //     amount: 10
    //   })
    // },

    ...mapActions([
      'incrementAsync', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementAsync2' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'incrementAsync' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    }),

    /**********************************************************************************************************************************************/ 
    
    incrementAge() {
      this.$store.commit('addAge')
    },

    asyncIncrementAge() {
      this.$store.dispatch('asyncAddAge')
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

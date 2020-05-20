/***
 * 
  Vuex是什么？
  Vuex是一个转为Vue.js应用程序开发的状态管理模式
  它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化

  什么事状态管理模式

  每个Vuex应用的核心就是store（仓库）。"store"基本上就是一个容器，它包含着你的应用中大部分的状态（state）。Vuex和单纯的全局对象有以下两点不同：
    1、Vuex的状态存储是响应式的。当Vue组件从store中读取状态的时候，若store中的状态发生变化，那么相应的组件也会相应地得到高效更新
    2、不能直接改变store中的状态。改变store中的状态的唯一途径就是显示的提交（commit）mutation。这样使得我们可以方便的跟踪每一个状态的变化，
      从而让我们能够实现一些工具帮助我们更好地了解我们的应用
  
  最简单的 Store

  Vuex使用单一状态树--是的，用一个对象就包含了全部应用层级状态。
  至此它便作为一个“唯一数据源”而存在。这也意味着，每个应用将仅仅包含一个store实例。

  Vuex 通过 store 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 Vue.use(Vuex)）：
  通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到。

  state数据 -- 状态对象
    mapState 辅助函数：当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用mapState辅助函数帮助我们生成计算属性
  
  Getter(可认为是store的计算属性) -- 对状态对象进行计算取值
    mapGetters 辅助函数：将 store 中的 getter 映射到局部计算属性

  Mutation(更改 Vuex 的 store 中的状态的唯一方法是提交 mutation)
    Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
    这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数。
    以相应的 type 调用 store.commit 方法：store.commit('increment')。
    提交载荷（Payload）-- 可以向 store.commit 传入额外的参数，即 mutation 的 载荷（payload）：store.commit('increment', 10)
    一条重要的原则就是要记住 mutation 必须是同步函数
    mapMutations 辅助函数：将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）。
  
  Action 类似于 mutation，不同在于：
    Action 提交的是 mutation，而不是直接变更状态。
    Action 可以包含任意异步操作。

    Action函数接受一个与store实例具有相同方法和属性的context对象，因此可以调用content.commit提交一个mutation，或者通过context.state和content.getter来获取state和getter。
    当我们在之后介绍到Modules时，你就知道context对象为什么不是store实例本身

    实践中，我们会经常用到ES2015的参数结构来简化代码

    分发Action：Action通过store.dispatch方法触发

    在组件中分发Action：组件中使用this.$store.dispatch('XXX')分发action，或者使用mapActions辅助函数将组件的methods映射为store.dispatch调用（需要现在根节点注入store）

    组合Action：Action通常是异步的，那么如何知道Action时候结束呢，更重要的是，我们如何才能组合多个action，以处理更加复杂的异步流程。
    要明白store.dispatch可以处理被触发的action的处理函数返回Promise，并且store.dispatch仍旧返回Promise

    由于使用单一状态树，应用的所有状态会集中到一个比较强大的对象。当应用变的非常复杂时，store对象就有可能变得相当臃肿
    为了解决以上问题，Vuex允许我们将store分割成模块（module）。每个模块拥有自己的state、mutation、action、getter、甚至是嵌套子模块--从上至下进行同样方式的分割

    模块的局部状态
    对于模块内部的mutation和getter，接收的第一个参数是模块的局部状态对象
 * 
 * ***/ 
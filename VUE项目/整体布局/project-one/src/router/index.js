// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
import Vue from 'vue'
import Router from 'vue-router'

// 1. 定义 (路由) 组件 -- 或者 -- 可以从其他文件 import 进来
/* Layout */
import Layout from '@/views/layout/index'

Vue.use(Router)

const errorPage = () => import('@/views/errorPage/404')
const dashboard = () => import('@/views/dashboard/index')

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
export const constantRouterMap = [
  {
    path: '/404',
    component: errorPage,
    hidden: true
  },
  {
    path: '/',
    redirect: '/dashboard/index',
    hidden: true
  },
  {
    path: '/dashboard',
    component: Layout,
    hidden: true,
    redirect: '/dashboard/index',
    children: [{
      path: 'index',
      component: dashboard,
      name: 'icons',
      meta: {
        title: 'dashboard',
        icon: 'icon',
        code: 'dashboard',
        noCache: true
      }
    }]
  },
  {
    path: '/logMng',
    component: Layout,
    hidden: true,
    redirect: '/logMng/index',
    children: [{
      path: 'index',
      component: () => import('@/views/logMng/index'),
      name: 'icons',
      meta: {
        title: 'logMng',
        icon: 'icon',
        code: 'logMng',
        noCache: true
      }
    }]
  },
  {
    path: '/systemMng',
    component: Layout,
    hidden: true,
    redirect: '/systemMng/index',
    children: [{
      path: 'index',
      component: () => import('@/views/systemMng/index'),
      name: 'icons',
      meta: {
        title: 'systemMng',
        icon: 'icon',
        code: 'systemMng',
        noCache: true
      }
    }]
  },
  {
    path: '/userMng',
    component: Layout,
    hidden: true,
    redirect: '/userMng/index/-1',
    children: [{
      path: 'index/:id',
      component: () => import('@/views/userMng/index'),
      name: 'icons',
      meta: {
        title: 'userMng',
        icon: 'icon',
        code: 'userMng',
        noCache: true
      }
    }]
  }
]
// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
export default new Router({
  // mode: 'history', // require service support
  // scrollBehavior: () => ({
  //   y: 0
  // }),
  // base: '/sys/',
  routes: constantRouterMap
})

/************ 第四步是在main.js使用 ***************/ 
// 4. 创建和挂载根实例。
/**
 * svg目录：主要用于存放 svg 文件
 * index.js内容：功能就是把组件注册到全局
 * **/ 
import Vue from 'vue'
import SvgIcon from '@/components/svgIcon' // svg组件
 
// 注册到全局
Vue.component('svg-icon', SvgIcon)

// requires and returns all modules that match
const requireAll = requireContext => requireContext.keys().map(requireContext)
// import all svg(将icons/svg中的所有svg导入)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
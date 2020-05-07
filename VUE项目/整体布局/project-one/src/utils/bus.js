import Bus from 'vue';
let install = function (Vue) {
  // 设置eventBus
  Vue.prototype.Bus = new Bus();
}
export default {install};

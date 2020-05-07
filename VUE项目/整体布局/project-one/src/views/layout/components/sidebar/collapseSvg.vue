<template>
  <div @click="toggleClick" class="box-hamburger">
    <svg-icon class="hamburger" icon-class="collapse" :class="{'is-active':isActive}"></svg-icon>
  </div>
</template>

<script>
export default {
  name: 'hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.box-hamburger{
  width:100%;
  cursor: pointer;
  text-align: center;
  background: $hamburgerBg;
  padding-left:3px;
}
.hamburger {
  width:100%;
  display:inline-block;
  cursor: pointer;
  color:white;
  font-size: 30px;
  transform: rotate(90deg);
  transition: .38s;
  transform-origin: 50% 50%;
}

.hamburger.is-active {
  transform: rotate(0deg);
}
</style>

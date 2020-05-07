<template> 
  <canvas id="live2dcanvas" width="300" height="300" 
    style="position: fixed; opacity: 0.7; right: 0px; bottom: 0px; z-index: 99999; pointer-events: none; border: 0px dashed rgb(204, 204, 204);">
  </canvas>
</template>

<script>

export default {
  name: 'L2D',
  data() {
    return {
      jsonPath: ''
    }
  },
  watch: {
    jsonPath() {
      this.L2Dwidget()
    }
  },
  created() {
    window.addEventListener('load', () => {
      this.jsonPath = "/lib/live2d-widget/model/live2d-widget-model-wanko/assets/wanko.model.json"
    })
  },
  methods: {
    L2Dwidget() {
      /**
       * 
        // 本地
        "jsonPath": "/lib/live2d-widget/model/live2d-widget-model-koharu/assets/koharu.model.json",
        "jsonPath": "/lib/live2d-widget/model/live2d-widget-model-chitose/assets/chitose.model.json",
        "jsonPath": "/lib/live2d-widget/model/live2d-widget-model-epsilon2_1/assets/epsilon2.1.model.json",
        "jsonPath": "/lib/live2d-widget/model/live2d-widget-model-gf/assets/Gantzert_Felixander.model.json",
        "jsonPath": "/lib/live2d-widget/model/live2d-widget-model-haru/01/assets/haru01.model.json",
        "jsonPath": "/lib/live2d-widget/model/live2d-widget-model-haru/02/assets/haru02.model.json",
        "jsonPath": "/lib/live2d-widget/model/live2d-widget-model-haruto/assets/haruto.model.json",
        "jsonPath": "/lib/live2d-widget/model/live2d-widget-model-hibiki/assets/hibiki.model.json",
        "jsonPath": "/lib/live2d-widget/model/live2d-widget-model-hijiki/assets/hijiki.model.json",
        "jsonPath": "/lib/live2d-widget/model/live2d-widget-model-izumi/assets/izumi.model.json",
        "jsonPath": "/lib/live2d-widget/model/live2d-widget-model-miku/assets/miku.model.json",
        "jsonPath": "/lib/live2d-widget/model/live2d-widget-model-ni-j/assets/ni-j.model.json",
        "jsonPath": "/lib/live2d-widget/model/live2d-widget-model-nico/assets/nico.model.json",
        "jsonPath": "/lib/live2d-widget/model/live2d-widget-model-nietzsche/assets/nietzsche.model.json",
        "jsonPath": "/lib/live2d-widget/model/live2d-widget-model-nipsilon/assets/nipsilon.model.json",
        "jsonPath": "/lib/live2d-widget/model/live2d-widget-model-nito/assets/nito.model.json",
        "jsonPath": "/lib/live2d-widget/model/live2d-widget-model-shizuku/assets/shizuku.model.json",
        "jsonPath": "/lib/live2d-widget/model/live2d-widget-model-tororo/assets/tororo.model.json",
        "jsonPath": "/lib/live2d-widget/model/live2d-widget-model-tsumiki/assets/tsumiki.model.json",
        "jsonPath": "/lib/live2d-widget/model/live2d-widget-model-unitychan/assets/unitychan.model.json",
        "jsonPath": "/lib/live2d-widget/model/live2d-widget-model-wanko/assets/wanko.model.json",
        "jsonPath": "/lib/live2d-widget/model/live2d-widget-model-z16/assets/z16.model.json",
        // 线上
        "jsonPath": "https://unpkg.com/live2d-widget-model-koharu@1.0.5/assets/koharu.model.json",
       * 
       * **/ 
      
      let l2dParams = {
        "model": {
          "scale": 0.3
        },
        "display": {
          "position": "right",
          "width": 180,
          "height": 260,
          "hOffset": 0,
          "vOffset": 0
        },
        "mobile": {
          "show": true,
          "scale": 0.5
        },
        "react": {
          "opacityDefault": 0.7,
          "opacityOnHover": 0.7
        }
      }

      this.jsonPath && (l2dParams.model.jsonPath = this.jsonPath)
      // 初始化
      window.L2Dwidget.init(l2dParams);
    }
  }
}
</script>

<style>

</style>

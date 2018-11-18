<template>
  <div class="img-magnifier-wrapper">
    <img :src="configs.smallImg.src"
         :width="configs.smallImg.width"
         :height="configs.smallImg.height">
    <transition name="fade">
      <div class="mask"
           :style="configs.maskStyle"
           ref="mask"></div>
    </transition>
    <div class="big-img-wrap"
         ref="bigImgWrap">
      <img class="big-img"
           :src="configs.bigImg.src"
           :width="configs.bigImg.width"
           :height="configs.bigImg.height">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    configs: {
      type: Object,
      required: true,
      validator(val) {
        // smallImg bigImg maskStyle 都必填
        let flag = val.smallImg
          && val.bigImg
          && val.maskStyle
          && val.smallImg.width
          && val.smallImg.height
          && val.smallImg.src
          && val.bigImg.width
          && val.bigImg.height
          && val.bigImg.src
          && val.maskStyle.width
          && val.maskStyle.height
          && typeof val.smallImg.width === 'number'
          && typeof val.smallImg.height === 'number'
          && typeof val.smallImg.src === 'string'
          && typeof val.bigImg.width === 'number'
          && typeof val.bigImg.height === 'number'
          && typeof val.bigImg.src === 'string';
        if (!flag) {
          return false;
        }
        return true;
      }
    }
  },
  data() {
    return {
      mask: null,
      maskSize:null,
      scaleX:0,
      scaleY:0
    };
  },
  mounted() {
    this.initImgMagnifier();
  },
  methods: {
    initImgMagnifier() {
      let smallImgConf = this.configs.smallImg;
      let bigImgConf = this.configs.bigImg;
      // 计算缩放比
      this.scaleX = bigImgConf.width / smallImgConf.width;
      this.scaleY = bigImgConf.height / smallImgConf.height;
      // 存下mask元素
      this.mask = this.$refs.mask;
      this.maskSize = {
        width : this.mask.offsetWidth,
        height:this.mask.offsetHeight
      };
      // 设置显示区域大小、以及位置
      let bigImgWrap = this.$refs.bigImgWrap;
      bigImgWrap.style.width = this.maskSize.width * this.scaleX + 'px';
      bigImgWrap.style.height = this.maskSize.height * this.scaleY + 'px';
      let posWay = this.configs.bigImgPos.way.replace(/^\s*|\s*$/g, "");
      if (posWay !== 'absolute' || posWay !== 'fixed') {
        posWay = 'absolute';
      }
      let o = {
        'position': posWay,
        left: this.configs.bigImgPos.left,
        right: this.configs.bigImgPos.right,
        bottom: this.configs.bigImgPos.bottom,
        top: this.configs.bigImgPos.top
      };
      for (let key in o) {
        if (o[key] === null || o[key] === undefined) {
          continue;
        }
        bigImgWrap.style[key] = o[key];
      }
    }
  }
};
</script>

<style scoped>
.img-magnifier-wrapper {
  position: relative;
  display: inline-block;
  font-size: 0;
}
/* .fade-enter,
.fade-leave-active {
  opacity: 0 !important;
}
.big-img {
  position: absolute;
  left: 0;
  top: 0;
} */
</style>

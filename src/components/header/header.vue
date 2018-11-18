<template>
  <div class="header">
    <div class="content-wrap">
      <img :src="seller.avatar"
           width="64"
           height="64"
           alt=""
           class="avatar">
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="desc">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div v-if="seller.supports"
             class="support-wrap">
          <!-- <span class="icon" :class="supportTypeMap[seller.supports[0].type]"></span> -->
          <!-- :size="48" :score="seller.score" -->
          <support-icon :size="1"
                        :iconType="seller.supports[0].type"></support-icon>
          <span class="support">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports"
           class="support-qty-wrap"
           @click="showDetail">
        <span class="support-qty">{{seller.supports.length}}个</span>
        <i class="icon icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div v-if="seller.supports"
         class="bulletin-wrap"
         @click="showDetail">
      <span class="bulletin-icon"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right bulletin-arrow"></i>
    </div>
    <div class="background-wrap">
      <img :src="seller.avatar"
           width="100%"
           height="100%"
           class="background">
    </div>
    <transition name="fade">
      <div v-show="isShowDetail"
           class="detail-wrap">
        <div class="detail-content-wrap clearfix">
          <div class="detail-content">
            <h1 class="name">{{seller.name}}</h1>
            <div class="stars-wrap">
              <stars :size="48"
                     :score="seller.score"></stars>
            </div>
            <div class="detail-title-wrap">
              <div class="line"></div>
              <div class="detail-title">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="support-list">
              <li class="support-item"
                  v-for="(item,index) in seller.supports"
                  :key="index">
                <!-- <i class="support-type" :class="supportTypeMap[item.type]"></i> -->
                <div class="support-icon-wrap">
                  <support-icon :size="2"
                                :iconType="item.type"></support-icon>
                </div>
                <span class="support-description">{{item.description}}</span>
              </li>
            </ul>
            <div class="detail-title-wrap">
              <div class="line"></div>
              <div class="detail-title">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close"
             @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Stars from '@@/stars/stars';
import SupportIcon from '@@/support-icon/support-icon';
export default {
  components: {
    Stars,
    SupportIcon
  },
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      isShowDetail: false
    };
  },
  created() {
    this.supportTypeMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  methods: {
    showDetail() {
      this.isShowDetail = true;
    },
    hideDetail() {
      this.isShowDetail = false;
    }
  }

};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.header
  position: relative
  background-color: rgba(7, 17, 27, 0.5)
  color: #fff
  overflow: hidden
  .content-wrap
    position: relative
    padding: 24px 12px 18px 24px
    font-size: 0
    .avatar
      display: inline-block
      border-radius: 2px
      vertical-align: top
    .content
      display: inline-block
      margin-left: 16px
      margin-top: 2px
      font-size: 12px
      .title
        margin-bottom: 8px
        .brand
          display: inline-block
          width: 30px
          height: 18px
          margin-right: 6px
          vertical-align: top
          bg-img('brand')
          background-size: 30px 18px
        .name
          line-height: 18px
          font-weight: bold
      .desc
        height: 12px
        line-height: 12px
        margin-bottom: 10px
      .support-wrap
        .support
          margin-left: 4px
          line-height: 12px
          font-size: 10px
    .support-qty-wrap
      position: absolute
      right: 12px
      bottom: 15px
      height: 24px
      padding: 0 8px
      background-color: rgba(0, 0, 0, 0.2)
      border-radius: 15px
      .support-qty
        line-height: 24px
        font-size: 10px
      .icon
        font-size: 12px
        line-height: 24px
  .bulletin-wrap
    position: relative
    display: flex
    height: 28px
    padding: 0 22px 0 12px
    background-color: rgba(7, 17, 27, 0.2)
    align-items: center
    .bulletin-icon
      width: 22px
      height: 12px
      bg-img('bulletin')
      background-size: 22px 12px
      background-repeat: no-repeat
    .bulletin-text
      flex: 1
      margin-left: 4px
      line-height: 28px
      font-size: 10px
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis
    .bulletin-arrow
      position: absolute
      right: 12px
      font-size: 10px
      line-height: 10px
      bottom: 9px
  .background-wrap
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: -1
    filter: blur(10px)
  .detail-wrap
    position: fixed
    top: 0
    left: 0
    z-index: 50
    width: 100%
    height: 100%
    overflow: auto
    transition: all 0.5s
    background-color: rgba(7, 17, 27, 0.8)
    backdrop-filter: blur(10px)
    &.fade-enter, &.fade-leave-active
      opacity: 0
      background-color: rgba(7, 17, 27, 0)
    .detail-content-wrap
      min-height: 100%
      .detail-content
        width: 80%
        margin: 0 auto
        padding: 64px 0
        .name
          line-height: 16px
          text-align: center
          font-size: 16px
          font-weight: 700
        .stars-wrap
          margin-top: 18px
          padding: 2px 0
          font-size: 0
          text-align: center
        .detail-title-wrap
          display: flex
          margin: 28px 0 24px
          align-items: center
          .line
            flex: 1
            border-bottom: 1px solid rgba(255, 255, 255, 0.2)
          .detail-title
            padding: 0 12px
            font-size: 14px
            font-weight: 700
        .support-list
          .support-item
            padding: 0 12px
            margin-bottom: 12px
            font-size: 0
            &:last-child
              margin-bottom: 0
            .support-icon-wrap
              display: inline-block
              margin-right: 6px
              vertical-align: top
            .support-description
              display: inline-block
              line-height: 16px
              font-size: 12px
        .bulletin
          .content
            padding: 0 12px
            line-height: 24px
            font-size: 12px
    .detail-close
      width: 32px
      height: 32px
      margin: -64px auto 0 auto
      padding: 0 10px
      clear: both
      font-size: 32px
</style>
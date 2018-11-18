<template>
  <div class="seller"
       ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="name">{{seller.name}}</h1>
        <div class="desc border-1px">
          <stars :size="36"
                 :score="seller.score"></stars>
          <span class="rank-rate">({{seller.ratingCount}})</span>
          <span class="sell-count">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="list">
          <div class="block">
            <h2 class="title">起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>
              <span class="text">元</span>
            </div>
          </div>
          <div class="block">
            <h2 class="title">商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>
              <span class="text">元</span>
            </div>
          </div>
          <div class="block">
            <h2 class="title">平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>
              <span class="text">分钟</span>
            </div>
          </div>
        </ul>
        <div class="favorite-wrap"
             @click="toggleFavorite">
          <i class="icon-favorite"
             :class="{active:favorite}"></i>
          <span class="favorite-text">{{favoriteTxt}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <p class="bulletin-text border-1px">{{seller.bulletin}}</p>
        <ul v-if="seller.supports && seller.supports.length"
            class="support-list">
          <li class="support-item border-1px"
              v-for="(item,index) in seller.supports"
              :key="index">
            <support-icon :size="2"
                          :iconType="item.type"></support-icon>
            <span class="support-description">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="scene"
           v-if="seller.pics &&seller.pics.length">
        <h1 class="title">商家实景</h1>
        <div class="pics"
             ref="pics">
          <ul ref="picsUl">
            <li v-for="(pic,index) in seller.pics"
                :key="index"
                class="pic-wrap">
              <img width="120"
                   height="90"
                   class="pic"
                   :src="pic"
                   alt="">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul class="info-list">
          <li v-for="(info,index) in seller.infos"
              :key="index"
              class="info-item border-1px">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Stars from '@@/stars/stars';
import Split from '@@/split/split';
import SupportIcon from '@@/support-icon/support-icon';
import BScroll from 'better-scroll';
import { saveToLocal, getFromLocal } from 'common/js/store';
export default {
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    Stars,
    Split,
    SupportIcon
  },
  data() {
    return {
      favorite: true
    };
  },
  created() {
    this.favorite = getFromLocal(this.seller.sellerId, 'favorite', false);
  },
  mounted() {
    this.initScroll();
    this.initImgScroll();
  },
  watch: {
    seller() {
      this.initScroll();
      this.initImgScroll();
    }
  },
  methods: {
    initScroll() {
      if (!this.scroll) {
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        });
      } else {
        this.scroll.refresh();
      }
    },
    initImgScroll() {
      if (!this.seller.pics || !this.seller.pics.length) {
        return;
      }
      this.$nextTick(() => {
        const imgWidth = 120;
        const imgMargin = 6;
        let width = (imgWidth + imgMargin) * this.seller.pics.length - imgMargin;
        this.$refs.picsUl.style.width = width + 'px';
        if (!this.imgScroll) {
          this.$nextTick(() => {
            this.imgScroll = new BScroll(this.$refs.pics, {
              scrollX: true,
              eventPassthrough: 'vertical'
            });
          });
        } else {
          this.imgScroll.refresh();
        }
      });
    },
    toggleFavorite() {
      this.favorite = !this.favorite;
      saveToLocal(this.seller.sellerId, 'favorite', this.favorite);
    }
  },
  computed: {
    favoriteTxt() {
      return this.favorite ? '已收藏' : '收藏';
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.seller
  position: absolute
  top: 174px
  left: 0
  bottom: 0
  width: 100%
  overflow: hidden
  .seller-content
    .overview
      position: relative
      padding: 18px
      .name
        margin-bottom: 8px
        line-height: 14px
        font-size: 14px
        color: rgb(7, 17, 27)
      .desc
        padding-bottom: 18px
        font-size: 0
        border-1px(rgba(7, 17, 27, 0.1))
        .stars, .rank-rate, .sell-count
          display: inline-block
          vertical-align: top
        .rank-rate, .sell-count
          font-size: 10px
          color: rgb(77, 85, 93)
          line-height: 18px
        .stars
          padding-top: 1px
          margin-right: 8px
        .rank-rate
          margin-right: 12px
      .list
        padding-top: 18px
        display: flex
        .block
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border-right: none
          .title
            margin-bottom: 4px
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .content
            font-size: 0
            color: rgb(7, 17, 27)
            .stress
              font-size: 24px
              line-height: 24px
            .text
              font-size: 10px
              line-height: 24px
      .favorite-wrap
        position: absolute
        right: 11px
        top: 18px
        width: 50px
        text-align: center
        .icon-favorite
          display: block
          margin-bottom: 4px
          line-height: 24px
          font-size: 24px
          color: #d4d6d9
          &.active
            color: rgb(240, 20, 20)
        .favorite-text
          line-height: 10px
          font-size: 10px
          color: rgb(77, 85, 93)
    .bulletin
      padding: 18px 18px 0 18px
      .title
        margin-bottom: 8px
        line-height: 14px
        font-size: 14px
        color: rgb(7, 17, 27)
      .bulletin-text
        padding: 16px 12px
        line-height: 24px
        font-size: 12px
        color: rgb(240, 20, 20)
        border-1px(rgba(7, 17, 27, 0.1))
      .support-list
        .support-item
          padding: 16px 12px
          font-size: 0
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-1px-none()
          .icon
            margin-right: 6px
          .support-description
            font-size: 12px
            color: rgb(7, 17, 27)
            line-height: 16px
    .scene
      padding: 18px 0 18px 18px
      .title
        margin-bottom: 12px
        line-height: 14px
        font-size: 14px
        color: rgb(7, 17, 27)
      .pics
        width: 100%
        overflow: hidden
        font-size: 0
        white-space: nowrap
        .pic-wrap
          display: inline-block
          margin-right: 6px
          &:last-child
            margin-right: 0
    .info
      padding: 18px 18px 0 18px
      .title
        padding-bottom: 12px
        line-height: 14px
        font-size: 14px
        color: rgb(7, 17, 27)
        border-1px(rgba(7, 17, 27, 0.1))
      .info-list
        .info-item
          padding: 16px 12px
          line-height: 16px
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
          &:last-child
            border-1px-none()
</style>
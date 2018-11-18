<template>
  <transition name="move">
    <div class="food-wrapper"
         v-show="showFood"
         ref="food">
      <div>
        <div class="cover-wrapper">
          <img class="cover"
               :src="food.image">
          <div class="back-wrapper"
               @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="extra">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span>好评率{{food.rating}}%</span>
          </div>
          <div class="price-wrap">
            <span class="price">￥{{food.price}}</span>
            <span v-show="food.oldPrice"
                  class="old-price">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food"></cartcontrol>
          </div>
          <transition name="fade">
            <div v-show="!food.count"
                 class="buy">
              <button @click.stop="addCart"
                      class="add-cart">加入购物车</button>
            </div>
          </transition>
        </div>
        <split></split>
        <div class="food-info-wrap">
          <h2 class="title">商品介绍</h2>
          <div class="info">{{food.info}}</div>
        </div>
        <split></split>
        <div class="food-rating-wrap">
          <h2 class="title">商品评价</h2>
          <ratingselect :desc="desc"
                        :ratings="food.ratings"
                        :rateType="rateType"
                        :onlyContent="onlyContent"
                        @toggleOnlyContent="toggleOnlyContent"
                        @updateRateType="updateRateType"></ratingselect>
          <ul v-show="mapRatings.length" class="rating-list">
            <li v-for="(rating,index) in mapRatings"
                :key="index"
                class="rating border-1px">
              <div class="username-avatar">
                <div class="username">{{rating.username}}</div>
                <img :src="rating.avatar"
                     alt=""
                     class="avatar">
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
              <div class="rating-text-wrap">
                <i :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></i>
                <span class="text">{{rating.text}}</span>
              </div>
            </li>
          </ul>
          <div v-show="!mapRatings.length" class="no-data">暂无评价</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import eventBus from 'common/js/eventBus';
import { formatDate } from 'common/js/date';
import Cartcontrol from '@@/cartcontrol/cartcontrol';
import Split from '@@/split/split';
import Ratingselect from '@@/ratingselect/ratingselect';
import BScroll from 'better-scroll';

const ALL = 2;
export default {
  components: {
    Cartcontrol,
    Split,
    Ratingselect
  },
  props: {
    food: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      showFood: false,
      rateType: ALL,
      onlyContent: false,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    };
  },
  methods: {
    show() {
      this.showFood = true;
      this.rateType = ALL;
      this.onlyContent = false;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    hide() {
      this.showFood = false;
    },
    addCart(e) {
      this.$set(this.food, 'count', 1);
      eventBus.$emit('cart-add', e.target);
    },
    updateRateType(rateType) {
      this.rateType = rateType;
    },
    toggleOnlyContent() {
      this.onlyContent = !this.onlyContent;
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  computed: {
    mapRatings() {
      if (!this.food.ratings) {
        return [];
      }
      let map = JSON.parse(JSON.stringify(this.food.ratings));

      if (this.onlyContent) {
        map = map.filter(item => item.text !== '');
      }
      if (this.rateType === ALL) {
        return map;
      }
      return map.filter(item => {
        return item.rateType === this.rateType;
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.food-wrapper
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 48px
  background-color: #fff
  z-index: 10
  transition: transform 0.4s
  transform: translate3d(0, 0, 0)
  &.move-enter, &.move-leave-active
    transform: translate3d(100%, 0, 0)
  .cover-wrapper
    position: relative
    width: 100%
    height: 0
    padding-top: 100%
    .cover
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
    .back-wrapper
      position: absolute
      top: 10px
      left: 10px
      padding: 16px
      .icon-arrow_lift
        font-size: 20px
        font-weight: 700
        opacity: 0.8
        color: #fff
  .content
    position: relative
    padding: 0 18px
    .title
      height: 14px
      padding-top: 18px
      line-height: 14px
      font-size: 14px
      font-weight: 700
      color: rgb(7, 17, 27)
    .extra
      margin: 8px 0
      font-size: 10px
      color: rgb(147, 153, 159)
      line-height: 10px
      .sell-count
        margin-right: 12px
    .price-wrap
      margin-top: 18px
      padding-bottom: 18px
      height: 14px
      font-weight: 700
      line-height: 14px
      .price
        margin-right: 8px
        font-size: 14px
        color: #f01414
      .old-price
        font-size: 10px
        color: rgb(147, 153, 159)
        text-decoration: line-through
    .cartcontrol-wrapper
      position: absolute
      bottom: 14px
      right: 12px
  .buy
    position: absolute
    bottom: 20px
    right: 12px
    transition: opacity 0.4s
    &.fade-enter, &.fade-leave-active
      opacity: 0
    .add-cart
      box-sizing: content-box
      padding: 6px
      height: 12px
      line-height: 12px
      font-size: 10px
      border-radius: 12px
      background-color: rgb(0, 160, 220)
      color: #fff
  .food-info-wrap
    padding: 18px
    .title
      height: 14px
      margin-bottom: 6px
      font-size: 14px
      line-height: 14px
      color: #07111b
    .info
      padding: 0 8px
      font-size: 12px
      line-height: 24px
      color: rgb(77, 85, 93)
  .food-rating-wrap
    padding: 18px 0
    .title
      height: 14px
      padding: 0 18px
      font-size: 14px
      line-height: 14px
      color: #07111b
    .rating-list
      .rating
        position: relative
        padding: 16px 0
        margin: 0 18px
        border-1px(rgba(7, 17, 27, 0.1))
        .username-avatar
          position: absolute
          top: 16px
          right: 18px
          font-size: 0
          .username
            display: inline-block
            height: 12px
            margin-right: 6px
            line-height: 12px
            vertical-align: top
            font-size: 10px
            color: rgb(147, 153, 159)
          .avatar
            display: inline-block
            width: 12px
            height: 12px
            line-height: 12px
            vertical-align: top
            border-radius: 50%
        .time
          margin-bottom: 6px
          line-height: 12px
          font-size: 10px
          color: rgb(147, 153, 159)
        .rating-text-wrap
          height: 24px
          .icon-thumb_up, .icon-thumb_down
            line-height: 24px
            font-size: 12px
            margin-right: 4px
          .icon-thumb_up
            color: rgb(0, 160, 220)
          .icon-thumb_down
            color: rgb(147, 153, 159)
          .text
            font-size: 12px
            color: rgb(7, 17, 27)
            line-height: 24px
    .no-data
      font-size:12px;
      color:rgb(7,17,27)
      padding:18px;
</style>
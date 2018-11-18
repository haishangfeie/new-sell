<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left"
             @click="toggleCartList">
          <div class="logo-wrap">
            <div class="logo"
                 :class="{highlight:totalCount>0}">
              <i class="icon-shopping_cart"></i>
            </div>
            <div class="num"
                 v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price"
               :class="{highlight:totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay"
               :class="{enough:totalPrice-minPrice>=0}"
               @click="pay">{{payDesc}}</div>
        </div>
      </div>
      <div class="ball-wrapper">
        <div v-for="(ball,index) in balls"
             :key="index">
          <transition name="drop"
                      @before-enter="beforeDrop"
                      @enter="droping"
                      @after-enter="afterDrop"
                      v-bind:css="false">
            <div v-show="ball.show"
                 class="ball">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>

      </div>
      <transition name="slide">
        <div class="shopcart-list"
             v-show="listShow">
          <div class="header">
            <h1 class="title">购物车</h1>
            <span class="empty"
                  @click="empty">清空</span>
          </div>
          <div class="list-content"
               ref="listWrap">
            <ul>
              <li class="food border-1px"
                  v-for="(food,index) in selectFoods"
                  :key="index">
                <div class="name">￥{{food.name}}</div>
                <div class="price">{{food.price * food.count}}</div>
                <div class="cartcontrol-warpper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="cartshop-list-mask"
           v-show="listShow"
           @click="hideCartList"></div>
    </transition>
  </div>
</template>

<script>
import eventBus from '@/common/js/eventBus';
import Cartcontrol from '@@/cartcontrol/cartcontrol';
import BScroll from 'better-scroll';
export default {
  components: {
    Cartcontrol
  },
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [
          {
            price: 10,
            count: 2
          }
        ];
      }
    },
    minPrice: {
      type: Number,
      default: 0
    },
    deliveryPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      balls: [
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false }
      ],
      dropBalls: [],
      listShow: false
    };
  },
  computed: {
    totalPrice() {
      let price = 0;
      this.selectFoods.forEach(food => {
        price += food.price * food.count;
      });
      return price;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach(food => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      let diff = this.minPrice - this.totalPrice;
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`;
      } else if (diff > 0) {
        return `还差${diff}元`;
      } else {
        return '去结算';
      }
    }
  },
  watch: {
    selectFoods(newVal) {
      if (!newVal.length) {
        this.listShow = false;
      }
    },
    listShow(val) {
      if (!val) {
        return;
      }
      this.$nextTick(() => {
        if (!this.listScroll) {
          this.listScroll = new BScroll(this.$refs.listWrap, {
            click: true
          });
        } else {
          this.listScroll.refresh();
        }
      });
    }
  },
  mounted() {
    eventBus.$on('cart-add', this.drop);
  },
  methods: {
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeDrop(el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 28; // rect.left + 12 -  8- 32
          let y = -(window.innerHeight - rect.top - 42);
          el.style.webkitTransform = `translate3d(${x}px,0,0)`;
          el.style.transform = `translate3d(${x}px,0,0)`;
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = `translate3d(0,${y}px,0)`;
          inner.style.transform = `translate3d(0,${y}px,0)`;
          break;
        }
      }
    },
    droping(el, done) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight;
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
        el.addEventListener('transitionend', done);
      });
    },
    afterDrop(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
      }
    },
    toggleCartList() {
      if (!this.selectFoods.length) {
        return;
      }
      this.listShow = !this.listShow;
    },
    hideCartList() {
      this.listShow = false;
    },
    empty() {
      this.selectFoods.forEach(food => {
        food.count = 0;
      });
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        return;
      }
      alert(`请支付${this.totalPrice}`);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.shopcart
  position: fixed
  left: 0
  bottom: 0
  height: 48px
  width: 100%
  z-index: 30
  .content
    display: flex
    width: 100%
    background-color: #141d27
    color: rgba(255, 255, 255, 0.4)
    .content-left
      flex: 1
      font-size: 0
      .logo-wrap
        position: relative
        top: -10px
        display: inline-block
        width: 56px
        height: 56px
        margin: 0 12px
        padding: 6px
        box-sizing: border-box
        background-color: #141d27
        border-radius: 50%
        .logo
          width: 100%
          height: 100%
          background-color: #2b343c
          border-radius: 50%
          text-align: center
          &.highlight
            background-color: #00a0dc
            color: #fff
          .icon-shopping_cart
            line-height: 44px
            font-size: 24px
        .num
          position: absolute
          top: 0
          right: 0
          width: 24px
          height: 16px
          font-weight: 700
          font-size: 9px
          line-height: 16px
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
          color: #fff
          background-color: #f01414
          text-align: center
          border-radius: 8px
      .price
        display: inline-block
        vertical-align: top
        height: 24px
        margin-top: 12px
        padding-right: 12px
        line-height: 24px
        font-size: 16px
        font-weight: 700
        border-right: 1px solid rgba(255, 255, 255, 0.1)
        &.highlight
          color: #fff
          font-weight: 700
      .desc
        display: inline-block
        margin-left: 12px
        font-size: 10px
        vertical-align: top
        line-height: 48px
    .content-right
      width: 105px
      flex: 0 0 105px
      .pay
        line-height: 48px
        font-size: 12px
        font-weight: 700
        text-align: center
        background-color: #2b333b
        &.enough
          background-color: #00b43c
          color: #fff
  .ball-wrapper
    .ball
      position: fixed
      left: 32px
      bottom: 22px
      z-index: 40
      transition: all 0.4s linear
      .inner
        width: 16px
        height: 16px
        border-radius: 50%
        background-color: #00a0dc
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
  .shopcart-list
    position: absolute
    left: 0
    top: 0
    width: 100%
    transform: translate3d(0, -100%, 0)
    background-color: #fff
    z-index: -1
    transition: transform 0.4s
    &.slide-enter, &.slide-leave-active
      transform: translate3d(0, 0, 0)
    .header
      height: 40px
      padding: 0 18px
      line-height: 40px
      background-color: #f3f5f7
      border: 1px solid rgba(7, 17, 27, 0.1)
      box-sizing: border-box
      .title
        float: left
        font-size: 14px
      .empty
        float: right
        font-size: 12px
        color: rgb(0, 160, 220)
    .list-content
      width: 100%
      max-height: 218px
      overflow: hidden
      background-color: #fff
      .food
        position: relative
        height: 48px
        padding: 12px 0
        margin: 0 18px
        box-sizing: border-box
        border-1px(rgba(7, 17, 27, 0.1))
        line-height: 24px
        .name
          font-size: 14px
          color: rgb(7, 17, 27)
        .price
          position: absolute
          right: 103px
          bottom: 12px
          font-size: 10px
          font-weight: 700
          color: rgb(240, 20, 20)
        .cartcontrol-warpper
          position: absolute
          right: 1px
          bottom: 8px
          line-height: 0
.cartshop-list-mask
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background-color: rgba(7, 17, 27, 0.6)
  backdrop-filter: blur(10px)
  transition: all 0.4s
  opacity: 1
  z-index: 20
  &.fade-enter, &.fade-leave-active
    opacity: 0
    backdrop-filter: blur(0)
    background-color: rgba(7, 17, 27, 0)
</style>
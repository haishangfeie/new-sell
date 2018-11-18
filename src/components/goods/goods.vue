<template>
  <div class="goods">
    <div class="menu-wrapper"
         ref="menuWrapper">
      <ul class="menu-list">
        <li class="menu-item border-1px"
            :class="{active:menuIndex===index}"
            v-for="(item,index) in goods"
            :key="index"
            @click="tapMenuItem(index)">
          <div class="item-text">
            <span class="icon-wrap"
                  v-if="item.type!==-1">
              <support-icon :size="3"
                            :iconType="item.type"></support-icon>
            </span>
            <span class="item-name">{{item.name}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper"
         ref="foodsWrapper">
      <div>
        <div v-for="(item,index) in goods"
             :key="index"
             class="food-list-wrap">
          <h1 class="list-name">{{item.name}}</h1>
          <ul class="list">
            <li class="food border-1px"
                v-for="(food,idx) in item.foods"
                :key="idx"
                @click="showDetail(food)">
              <img :src="food.icon"
                   width="57"
                   height="57"
                   alt=""
                   class="icon">
              <div class="content">
                <h2 class="food-name">{{food.name}}</h2>
                <div v-show="food.description"
                     class="desc">{{food.description}}</div>
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
                  <Cartcontrol :food="food"></Cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <shopcart :selectFoods="selectFoods"
              :minPrice="seller.minPrice"
              :deliveryPrice="seller.deliveryPrice">
    </shopcart>
    <food ref="food"
          :food="selectedFood"></food>
  </div>
</template>

<script>
import SupportIcon from '@@/support-icon/support-icon';
import Shopcart from '@@/shopcart/shopcart';
import Cartcontrol from '@@/cartcontrol/cartcontrol';
import Food from '@@/food/food';
import BScroll from 'better-scroll';
const IsSuccess = 0;
export default {
  components: {
    SupportIcon,
    Shopcart,
    Cartcontrol,
    Food
  },
  props: {
    seller: {
      type: Object,
      defalut() { return {}; }
    }
  },
  data() {
    return {
      goods: [],
      menuScroll: null,
      foodsScroll: null,
      foodsHeights: null,
      menuIndex: 0,
      selectedFood:{}
    };
  },
  computed: {
    selectFoods() {
      let select = [];
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            select.push(food);
          }
        });
      });
      return select;
    }
  },
  created() {
    this.$http.get('/api/goods').then(res => {
      if (res.data.errno === IsSuccess) {
        this.goods = res.data.data;
        this.$nextTick(() => {
          this._initScroll();
          this._calculativeHeight();
        });
      }
    });
  },
  methods: {
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        probeType: 3,
        click: true
      });
      // 绑定食物列表的滚动事件
      this.foodsScroll.on('scroll', (event) => {
        let height = Math.abs(Math.floor(event.y));
        // console.log(height)
        // console.log(this.foodsHeights)
        for (let i = 0; i < this.foodsHeights.length; i++) {
          let height1 = this.foodsHeights[i];
          let height2 = this.foodsHeights[i + 1];
          if (!height2) {
            this.menuIndex = i;
            this.menuScroll.scrollToElement(this.$refs.menuWrapper.getElementsByClassName('menu-item')[i], 300);
            return;
          }
          if (height >= height1 && height < height2) {
            this.menuIndex = i;
            this.menuScroll.scrollToElement(this.$refs.menuWrapper.getElementsByClassName('menu-item')[i], 300);
            return;
          }
        }
      });
    },
    _calculativeHeight() {
      let foodsHeights = [];
      let height = 0;
      foodsHeights.push(height);
      // 获取每个foods模块的高度
      let foodsEl = this.$refs.foodsWrapper.getElementsByClassName('food-list-wrap');
      for (let i = 0; i < foodsEl.length; i++) {
        let item = foodsEl[i];
        let itemHeight = item.clientHeight;
        height += itemHeight;
        foodsHeights.push(height);
      }
      this.foodsHeights = foodsHeights;
    },
    tapMenuItem(index) {
      this.foodsScroll.scrollToElement(this.$refs.foodsWrapper.getElementsByClassName('food-list-wrap')[index], 300);
    },
    showDetail(food) {
      this.selectedFood = food;
      this.$refs.food.show();
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.goods
  position: absolute
  top: 174px
  bottom: 48px
  width: 100%
  display: flex
  overflow: hidden
  .menu-wrapper
    width: 80px
    flex: 0 0 80px
    background-color: #f3f5f7
    .menu-list
      .menu-item
        display: table
        width: 56px
        height: 54px
        padding: 0 13px
        border-1px(rgba(7, 17, 27, 0.1))
        &.active
          margin-top: -1px
          background-color: #fff
          font-weight: 700
          border-1px-none()
        .icon-wrap
          display: inline-block
          margin-right: 2px
        .item-text
          display: table-cell
          vertical-align: middle
          font-size: 12px
          line-height: 14px
          color: rgb(7, 17, 27)
  .foods-wrapper
    flex: 1
    .food-list-wrap
      .list-name
        height: 26px
        padding-left: 12px
        line-height: 26px
        background-color: rgb(243, 245, 247)
        color: rgb(147, 153, 159)
        border-left: 2px solid rgb(217, 221, 225)
      .list
        .food
          display: flex
          margin: 18px
          padding-bottom: 18px
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-1px-none()
            margin-bottom: 0
          .icon
            flex: 0 0 57px
            margin-right: 10px
          .content
            flex: 1
            .food-name
              margin-top: 2px
              height: 14px
              line-height: 14px
              font-size: 14px
              color: rgb(7, 17, 27)
              font-weight: 700
            .desc, .extra
              margin: 8px 0
              font-size: 10px
              color: rgb(147, 153, 159)
            .desc
              line-height: 12px
            .extra
              line-height: 10px
              .sell-count
                margin-right: 12px
            .price-wrap
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
              right: 0
              bottom: 10px
</style>
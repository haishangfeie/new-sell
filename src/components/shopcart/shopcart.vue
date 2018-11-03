<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrap">
          <div class="logo" :class="{highlight:totalCount>0}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{highlight:totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="{enough:totalPrice-minPrice>=0}">{{payDesc}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      selectFoods:{
        type:Array,
        default(){
          return [
            {
              price:10,
              count:2
            }
          ];
        }
      },
      minPrice:{
        type:Number,
        default:0
      },
      deliveryPrice:{
        type:Number,
        default:0
      }
    },
    computed:{
      totalPrice(){
        let price = 0;
        this.selectFoods.forEach(food=>{
          price += food.price * food.count
        })
        return price
      },
      totalCount(){
        let count = 0;
        this.selectFoods.forEach(food=>{
          count += food.count
        })
        return count
      },
      payDesc(){
        let diff = this.minPrice - this.totalPrice;
        if(this.totalPrice===0){
          return `￥${this.minPrice}起送`
        } else if(diff>0){
          return `还差${diff}元`
        } else {
          return '去结算'
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
.shopcart
  position: fixed
  left: 0
  bottom: 0
  height: 48px
  width: 100%
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
          background-color #00b43c
          color:#fff
</style>
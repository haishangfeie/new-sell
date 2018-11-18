<template>
  <div class="cartcontrol">
    <transition name="move_x">
      <div class="decrease"
           v-show="food.count>0"
           @click.stop="decreaseCart">
        <div class="inner icon-remove_circle_outline"></div>
      </div>
    </transition>
    <div class="count"
         v-show="food.count>0">{{food.count}}</div>
    <div class="increase icon-add_circle"
         @click.stop="increaseCart"></div>
  </div>
</template>

<script>
import eventBus from '@/common/js/eventBus';
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    increaseCart(e) {
      if (!this.food.count) {
        this.$set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
      // 性能优化，避免两个动画同时执行
      this.$nextTick(() => {
        eventBus.$emit('cart-add', e.target);
      });
    },
    decreaseCart() {
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.cartcontrol
  font-size: 0
  .decrease
    display: inline-block
    transition: opacity 0.4s linear, transform 0.4s linear
    &.move_x-enter, &.move_x-leave-active
      opacity: 0
      transform: translate3d(24px, 0, 0)
      .inner
        transform: rotate(180deg)
    .inner
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
      transition: transform 0.4s linear
      transform: rotate(0deg)
  .count
    display: inline-block
    width: 12px
    text-align: center
    vertical-align: top
    padding-top: 6px
    line-height: 24px
    font-size: 10px
    color: rgb(147, 153, 159)
  .increase
    display: inline-block
    padding: 6px
    line-height: 24px
    font-size: 24px
    color: rgb(0, 160, 220)
</style>
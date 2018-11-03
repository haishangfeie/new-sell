<template>
  <span class="icon" :class="[supportTypeMap[iconType],classSize]"></span>
</template>

<script>
  export default {
    props:{
      size:{
        type:Number
      },
      iconType:{
        type:Number
      }
    },
    computed:{
      classSize (){
        return 'size_' + this.size
      }
    },
    created(){
      this.supportTypeMap = ['decrease','discount','special','invoice','guarantee']
    },
  }
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
icons($size)
  &.special
    bg-img('special_' + $size)
  &.guarantee
    bg-img('guarantee_' + $size)
  &.invoice
    bg-img('invoice_' + $size)
  &.discount
    bg-img('discount_' + $size)
  &.decrease
    bg-img('decrease_' + $size)
.icon
  display: inline-block
  vertical-align: top
  background-repeat: no-repeat
  &.size_1
    width: 12px
    height: 12px
    background-size: 12px
    icons(1)
  &.size_2
    width: 16px
    height: 16px
    background-size: 16px
    icons(2)
  &.size_3
    width: 18px
    height: 18px
    background-size: 18px
    icons(3)
</style>
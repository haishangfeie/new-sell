<template>
  <div class="stars"
       :class="classSize">
    <span class="star"
          v-for="(starType,index) in starTypes"
          :key="index"
          :class="starType"></span>
  </div>
</template>

<script>
const CLA_ON = 'on';
const CLA_OFF = 'off';
const CLA_HALF = 'half';
const Length = 5;
export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    classSize() {
      return 'stars_' + this.size;
    },
    starTypes() {
      let score = Math.floor(this.score * 2) / 2;
      let integerCount = Math.floor(score);
      let hasDecimal = score % 1 !== 0;
      let result = [];
      for (let i = 0; i < integerCount; i++) {
        result.push(CLA_ON);
      }
      if (hasDecimal) {
        result.push(CLA_HALF);
      }
      while (result.length < Length) {
        result.push(CLA_OFF);
      }
      return result;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.stars
  display: inline-block
  font-size: 0
  .star
    display: inline-block
    background-repeat: no-repeat
    &:last-child
      margin-right: 0 !important
  &.stars_48
    .star
      width: 20px
      height: 20px
      margin-right: 20px
      background-size: 20px 20px
      &.on
        bg-img('star48_on')
      &.half
        bg-img('star48_half')
      &.off
        bg-img('star48_off')
  &.stars_36
    .star
      width: 15px
      height: 15px
      margin-right: 6px
      background-size: 15px 15px
      &.on
        bg-img('star36_on')
      &.half
        bg-img('star36_half')
      &.off
        bg-img('star36_off')
  &.stars_24
    .star
      width: 10px
      height: 10px
      margin-right: 3px
      background-size: 10px 10px
      &.on
        bg-img('star24_on')
      &.half
        bg-img('star24_half')
      &.off
        bg-img('star24_off')
</style>
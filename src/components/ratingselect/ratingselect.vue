<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.ratingselect
  .select-btn-wrap
    margin: 0 18px
    padding: 18px 0
    font-size: 0
    border-1px(rgba(7, 17, 27, 0.1))
    .btn
      display: inline-block
      line-height: 16px
      margin-right: 8px
      padding: 8px 12px
      border-radius: 1px
      font-size: 12px
      color: rgb(77, 85, 93)
      .count
        vertical-align: top
        font-size: 8px
        margin-left: 2px
      &:last-child
        margin-right: 0
      &.positive
        background-color: rgba(0, 160, 220, 0.2)
        &.active
          background-color: rgb(0, 160, 220)
          color: #fff
      &.negative
        background-color: rgba(77, 85, 93, 0.2)
        &.active
          background-color: rgb(77, 85, 93)
          color: #fff
  .onlyContent
    padding: 12px 18px
    font-size: 0
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    .icon-check_circle
      display: inline-block
      margin-right: 4px
      line-height: 24px
      font-size: 24px
      color: rgb(147, 153, 159)
      &.active
        color: #00c850
    .text
      line-height: 24px
      font-size: 12px
      vertical-align: top
      color: rgb(147, 153, 159)
</style>
<template>
  <div class="ratingselect">
    <div class="select-btn-wrap border-1px">
      <div class="btn positive"
           :class="{active:rateType === 2}"
           @click="selectType(2)">{{desc.all}}
        <span class="count">{{ratings.length}}</span>
      </div>
      <div class="btn positive"
           :class="{active:rateType === 0}"
           @click="selectType(0)">{{desc.positive}}
        <span class="count">{{positives.length}}</span>
      </div>
      <div class="btn negative"
           :class="{active:rateType === 1}"
           @click="selectType(1)">{{desc.negative}}
        <span class="count">{{negatives.length}}</span>
      </div>
    </div>
    <div class="onlyContent"
         @click="toggleOnlyContent">
      <i class="icon-check_circle"
         :class="{active:onlyContent}"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
export default {
  props: {
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        };
      }
    },
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    rateType: {
      type: Number
    },
    onlyContent: {
      type: Boolean
    }
  },
  computed: {
    positives() {
      return this.ratings.filter(rating => rating.rateType === POSITIVE);
    },
    negatives() {
      return this.ratings.filter(rating => rating.rateType === NEGATIVE);
    }
  },
  methods: {
    selectType(rateType) {
      this.$emit('updateRateType', rateType);
    },
    toggleOnlyContent() {
      this.$emit('toggleOnlyContent');
    }
  }
};
</script>


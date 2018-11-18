<template>
  <div class="ratings-wrap"
       ref="ratingsWrap">
    <div class="ratings">
      <div class="overview">
        <div class="overview-left">
          <div class="overall-score">{{seller.score}}</div>
          <div class="text">综合评分</div>
          <div class="rank-rate">高于周边商家{{seller.rankRate}}</div>
        </div>
        <div class="overview-right">
          <div class="items-score-wrap">
            <div class="item-score-wrap">
              <span class="title">服务态度</span>
              <stars :size="36"
                     :score="seller.serviceScore"></stars>
              <span class="score">{{seller.serviceScore}}</span>
            </div>
            <div class="item-score-wrap">
              <span class="title">商品评分</span>
              <stars :size="36"
                     :score="seller.foodScore"></stars>
              <span class="score">{{seller.foodScore}}</span>
            </div>
            <div class="item-score-wrap">
              <span class="title">送达时间</span>
              <span class="time">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :ratings="ratings"
                    :rateType="rateType"
                    :onlyContent="onlyContent"
                    @toggleOnlyContent="toggleOnlyContent"
                    @updateRateType="updateRateType"></ratingselect>
      <ul class="ratings-list">
        <li class="rating-item border-1px"
            v-for="(rating,index) in mapRatings"
            :key="index">
          <div class="rating-item-left">
            <img class="avatar"
                 :src="rating.avatar"
                 alt="">
          </div>
          <div class="rating-item-right">
            <div class="username">{{rating.username}}</div>
            <div class="stars-wrapper">
              <stars :size="24"
                     :score="rating.score"></stars>
              <span v-if="rating.deliveryTime"
                    class="delivery-time">{{rating.deliveryTime}}分钟送达</span>
            </div>
            <p class="text">{{rating.text}}</p>
            <div v-if="rating.recommend && rating.recommend.length"
                 class="recommend-wrapper">
              <i class="icon-thumb_up"></i>
              <span v-for="(item,index) in rating.recommend"
                    :key="index"
                    class="recommend-item">{{item}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Stars from '@@/stars/stars';
import Split from '@@/split/split';
import Ratingselect from '@@/ratingselect/ratingselect';
import BScroll from 'better-scroll';
const ALL = 2;
const ISSUCCESS = 0;
export default {
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    Stars,
    Split,
    Ratingselect
  },
  data() {
    return {
      rateType: ALL,
      onlyContent: false,
      ratings: []
    };
  },
  created() {
    this.$http.get('/api/ratings').then(res => {
      if (res.data.errno === ISSUCCESS) {
        this.ratings = res.data.data;
        this.$nextTick(() => {
          new BScroll(this.$refs.ratingsWrap, {
            click: true
          });
        });
      }
    });
  },
  methods: {
    updateRateType(rateType) {
      this.rateType = rateType;
    },
    toggleOnlyContent() {
      this.onlyContent = !this.onlyContent;
    }
  },
  computed: {
    mapRatings() {
      if (!this.ratings.length) {
        return [];
      }
      let map = JSON.parse(JSON.stringify(this.ratings));

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
.ratings-wrap
  position: absolute
  top: 174px
  left: 0
  bottom: 0
  width: 100%
  overflow: hidden
.ratings
  .overview
    display: flex
    padding: 18px 0
    .overview-left
      flex: 0 0 138px
      width: 138px
      padding: 6px 0
      border-right: 1px solid rgba(7, 17, 27, 0.1)
      text-align: center
      @media screen and (max-width: 350px)
        flex: 0 0 110px
        width: 110px
      .overall-score
        margin-bottom: 6px
        line-height: 28px
        font-size: 24px
        color: rgb(255, 153, 0)
      .text
        margin-bottom: 8px
        font-size: 12px
        color: rgb(7, 17, 27)
        line-height: 12px
      .rank-rate
        line-height: 10px
        font-size: 10px
        color: rgb(147, 153, 159)
    .overview-right
      display: flex
      justify-content: center
      flex: 1
      .items-score-wrap
        .item-score-wrap
          margin-bottom: 8px
          &:last-child
            margin-bottom: 0
          .title, .stars, .score
            display: inline-block
            vertical-align: top
          .title
            margin-right: 12px
            font-size: 12px
            color: rgb(7, 17, 27)
            line-height: 18px
            @media screen and (max-width: 350px)
              margin-right: 6px
          .score
            margin-left: 12px
            font-size: 12px
            line-height: 18px
            color: rgb(255, 153, 0)
            @media screen and (max-width: 350px)
              margin-left: 6px
          .time
            font-size: 12px
            color: rgb(147, 153, 159)
            line-height: 18px
  .ratings-list
    padding: 0 18px
    .rating-item
      display: flex
      padding: 18px 0
      border-1px(rgba(7, 17, 27, 0.1))
      .rating-item-left
        flex: 0 0 28px
        width: 28px
        margin-right: 12px
        .avatar
          width: 28px
          height: 28px
          border-radius: 50%
      .rating-item-right
        flex: 1
        .username
          margin-bottom: 4px
          line-height: 12px
          font-size: 10px
          color: rbg(7, 17, 27)
        .stars-wrapper
          margin-bottom: 6px
          font-size: 0
          .stars, .delivery-time
            display: inline-block
            vertical-align: top
          .delivery-time
            margin-left: 6px
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
        .text
          line-height: 18px
          font-size: 12px
          color: rgb(7, 17, 27)
        .recommend-wrapper
          margin-top: 8px
          font-size: 0
          .icon-thumb_up
            display: inline-block
            vertical-align: top
            margin-right: 8px
            font-size: 12px
            line-height: 16px
            color: rgb(0, 160, 220)
          .recommend-item
            display: inline-block
            margin: 0 8px 4px 0
            padding: 0 6px
            vertical-align: top
            line-height: 16px
            font-size: 9px
            border: 1px solid rgba(7, 17, 27, 0.1)
            border-radius: 1px
            background-color: #fff
            color: rgb(147, 153, 159)
</style>
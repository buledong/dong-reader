<template>
  <div class="rank">
    <div v-for="(item,index) in rankCategory">
      <div>
        <h3 class="title">
        <span class="title-item" @click="getTopFive(index)">
          {{item}}
        </span>
          <span class="top-more" @click="getTopList(index)">
          查看榜单
        </span>
        </h3>
        <ul class="top-list">
          <li class="top-item"
              v-for="(item,index) in topLists[index]"
              @click="show(item)">
            <span class="top-index" :class="'top-' + (index+1)">
              {{index+1}}
            </span>
            {{item.bookName}}
            <span class="num">{{item.number}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getRankList} from 'api/rank';
  import {rankCategory} from 'api/config';

  export default {
    data() {
      return {
        topList: [
          [1, 2, 3, 4],
          [2, 2, 3, 4],
          [3, 2, 3, 4],
          [4, 2, 3, 4]],
        topLists: this.listOld
      };
    },
    beforeCreate() {
      this.rankCategory = rankCategory;
      this.listOld = getRankList();
      console.log(this.listOld, 'olsd');
    },
    created() {
//      this.topLists = this.get();
      console.log(this.topLists);
      console.log(this.topList);
    },
    methods: {
      show(item) {
        console.log(item);
      },
      getTopList(index) {
        alert(index);
      },
      getTopFive(index) {
        if (index === 0) {
          return;
        }
        console.log(index);
      }
    },
    computed: {}
  };
</script>

<style lang="stylus" type="text/stylus" scoped>
  @import "~common/stylus/mixin.styl"
  .rank
    background #fafafa
    .title
      color #4c4c4c
      font-size 14px
      height 26px
      border-top 1px solid #dfdfdf
      border-bottom 1px solid #dfdfdf
      background #f2f2f2
      line-height 14px
      padding 12px 8px 0
      .title-item
        border-left 8px solid #5e5e5e
        border-radius 2px
        padding-left 7px
        float left
      .top-more
        float right
    .top-list
      clear both
      border-collapse collapse;
      -webkit-tap-highlight-color transparent;
      .top-item
        line-height 38px
        padding 0 10px 0 8px
        font-size 14px
        border-bottom 1px solid #dfdfdf
        color #4c4c4c
        margin 0
        no-wrap()
        clear both
        .top-index
          width 18px
          height 18px
          border-radius 9px
          text-align center
          line-height 19px
          float left
          color #ffffff
          margin-top 9px
          margin-right 5px
          background-color: #8f8f8f
          &.top-1
            background-color: #ff4644
          &.top-2
            background-color: #e28d29
          &.top-3
            background-color: #9fc575
        .num
          float right
          color #8f8f8f
          padding-left 25px
          background-size 11px 11px
          background-repeat no-repeat
          background-position 10px 13px
          font-size 11px
          background-image url('up.png')
</style>

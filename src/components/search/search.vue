<template>
  <div class="search">
    <div class="form">
      <div class="search-box">
        <div class="input-box">
          <input type="text"
                 title="search-input"
                 placeholder="请输入关键字" value
                 class="search-input"
                 maxlength="15"
          >
        </div>
        <div class="search-go">
          <i class="icon-search"></i>
        </div>
      </div>
    </div>
    <div class="hot-title">
      <h3 class="title">
        <span class="title-item">
          热搜作品
        </span>
      </h3>
    </div>
    <div class="hot-list">
      <ul class="top-list">
        <li class="top-item" v-for="(item,key,index) in hotList">
          <span class="top-index" :class="'top-' + index">{{index +1}}</span>
          {{key}}
          <span class="num">
            <i class="icon-user"></i>
            {{item}}
          </span>
        </li>
      </ul>
    </div>
    <div class="hot-cat">
      <h3 class="title">
        <span class="title-item">
          热搜标签
        </span>
      </h3>
    </div>
    <div class="hot-cat-list">
      <ul>
        <li class="hot-item" v-for="item in hotCatList">
          {{item}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {hotList, hotCatList} from 'api/config';

  export default {
    created() {
      this.hotList = hotList || {};
      this.hotCatList = hotCatList || [];
    }
  };
</script>

<style lang="stylus" type="text/stylus" scoped>
  .search
    background #f2f2f2
    color #4c4c4c
    .form
      background-color: #f2f2f2
      border-bottom 1px solid #dfdfdf
      padding 27px 8px
      .search-box
        display flex
        border 1px solid #e1e1e1
        height 30px
        background-color: #fff
        overflow hidden
        .input-box
          padding-right 6px
          flex-basis 96%
          .search-input
            padding 1px 0 1px 10px
            height 30px
            font-size 14px
            border 0
            outline none
            width 96%
        .search-go
          border-left 1px solid #e1e1e1
          background-color: #ff4644
          height 30px
          width 30px
          .icon-search
            font-size 22px
            padding-left 3px
            color white
            line-height 30px
    .hot-title
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
    .hot-list
      background-color: #fafafa
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
            font-size 11px
            .icon-user
              color #ff4644
    .hot-cat
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
    .hot-cat-list
      padding 13px 0
      ul
        height 176px
        flex-wrap wrap
        justify-content space-around
        align-content space-around
        display flex
        .hot-item
          font-size 13px
          text-align center
          line-height 36px
          height 36px
          overflow hidden
          border-radius 3px
          border 1px solid #dfdfdf
          flex 0 0 22%
</style>
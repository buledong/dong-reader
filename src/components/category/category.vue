<template>
  <div class="category">
    <div v-for="(item,key) in categoryList" class="cat-box">
      <h3>
        <span class="key">{{key}}</span>
        <span class="look-more">查看更多</span>
      </h3>
      <ul class="cat-list">
        <li v-for="item in categoryList[key]">
          {{item}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {category} from 'api/config';
  export default {
    created() {
      this.categoryList = category || {};
      console.log(category);
      console.log(this.categoryList);
    }
  };
</script>

<style lang="stylus" type="text/stylus" scoped>
  .category
    color: #4c4c4c;
    background: #fafafa;
    .cat-box
      background-color: #f2f2f2
      padding-top 15px
      h3
        background-color: #fff
        padding 11px 8px 0
        height: 25px
        .key
          color #4c4c4c
          font-size 14px
          line-height 14px
          padding-left 7px
          border-left 8px solid #ff4643
          border-radius 2px
        .look-more
          padding-right 5px
          font-size 13px
          float right
      .cat-list
        background-color: #fafafa
        display flex
        flex-wrap wrap
        li
          line-height 40px
          text-align center
          height 40px
          font-size 13px
          border-bottom 1px solid #e9e9e9
          flex 0 0 25%
</style>
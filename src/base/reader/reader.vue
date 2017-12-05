<template>
  <div class="reader">
    <h1 class="title">{{data.chapterName}}</h1>
    <div class="text" v-html="data.content"></div>
    <div class="bottom">
      <div class="prev">上一章</div>
      <div class="center">目录</div>
      <div class="next">下一章</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getChapter} from 'api/book';
  export default {
    data() {
      return {
        data: {}
      };
    },
    created() {
      getChapter(523438, '8523298_1').then((res) => {
        if (res.ajaxResult.code === 1) {
          console.log('进来了');
          this.data = res.result;
        }
        console.log(res);
      }).catch((e) => {
        console.log(e);
      });
    },
    watch: {
      data() {
        console.log('变了');
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" scoped>
  .reader
    line-height 1.7
    color #2e343f
    font-size 20px
    background-color: #a6bc9c
    .title
      height 44px
      line-height 44px
      text-align center
      padding 0 10px
    .text
      padding 0 10px 10px
      overflow-x hidden
      text-indent 2em
    .bottom
      height 44px
      display flex
      .prev, .center, .next
        line-height 42px
        margin 2px 5px
        border 1px solid #fff
        border-radius 14px
        flex 1
</style>
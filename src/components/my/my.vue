<template>
  <div class="my">
    <div class="tab-top">
      <div>最近阅读</div>
    </div>
    <div class="recent" v-show="recent.bookId" @click.stop="goToBook">
      <div class="content">
        <i class="icon-now"></i>
        继续阅读：
        <div class="text">{{recent.bookName}}&nbsp;-&nbsp;{{recent.chapterName}}</div>
      </div>
      <div class="more">更多</div>
    </div>
    <!--<div class="tab-top">
      <div>详细设置</div>
    </div>
    <div class="set-font">
      字体设置：<input type="number" title placeholder="请输入字体大小">
    </div>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import {getChapter} from 'api/book';
  import {mapGetters, mapMutations} from 'vuex';

  const local = window.localStorage;
  export default {
    data() {
      return {
        recent: {}
      };
    },
    created() {
      this._initMy();
    },
    methods: {
      _initMy() {
        const query = local.bookInfo ? JSON.parse(local.bookInfo) : this.bookInfo;
        getChapter(query).then((res) => {
          this.recent = res.result;
        }).catch((e) => {
          console.log(e);
        });
      },
      goToBook() {
        this.$router.push({path: `/book/${this.recent.bookId}`});
      },
      ...mapMutations({})
    },
    computed: {
      ...mapGetters([
        'bookInfo'
      ])
    }
  };
</script>

<style lang="stylus" type="text/stylus" scoped>
  @import "~common/stylus/mixin"
  .my
    background-color: #fafafa
    font-size 14px
    color #888
  .tab-top
    padding-top 10px
    border-top 1px solid #dfdfdf
    border-bottom 1px solid #dfdfdf
    diaplay flex
    div
      height 30px
      line-height 30px
      text-align center
      overflow hidden
      border-bottom 3px solid #ff4644
      color #ff4644
  .recent
    display flex
    background-color: #ebebeb
    line-height 16px
    padding 11px
    .content
      no-wrap()
      flex 1
      .text
        display inline-block
    .more
      width 32px
      background #e95e56
      color #fff
      padding 0 6px
      border-radius 3px
  .set-font
    height 44px 
    line-height 44px 
    input
      background-color: #ffcd32
      min-width 70%
</style>
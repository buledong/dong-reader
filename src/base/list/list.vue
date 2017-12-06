<template>
  <div class="list">
    <div class="list-top">
      <div class="back" @click="back">
        <i class="icon-back"></i>
        返回
      </div>
      <div class="center">{{centerTitle}}</div>
      <div class="my">
        <i class="icon-home2"></i>
        我的
      </div>
    </div>
    <div class="book-box" v-for="(item,index) in dataList">
      <span class="top-num"></span>
      <div class="booking">
        <img v-lazy="'https://static.zongheng.com/upload/s_image' + item.coverUrl" alt="头像">
      </div>
      <div class="book-info">
        <h4 class="book-name">
          <span>{{item.bookName}}</span>
        </h4>
        <div class="author">{{item.authorName}}</div>
        <div class="cat"></div>
        <div class="clearfix"></div>
        <div class="update">
          <span>更新至：</span>
          {{item.updteChapterName}}
        </div>
        <div class="num" v-if="item.number">
          <i class="icon-up"></i>
          月票数：{{item.number}}
        </div>
        <div class="intero-line" v-if="!item.number">
          <span>简介：</span>
          {{item.description}}
        </div>
      </div>
    </div>
    <div class="list-bottom">
      <div class="view-more" @click="getMore">查看更多</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getCatList, getRankList, getSearchList} from 'api/list';
  import {mapMutations, mapGetters} from 'vuex';
  import {rankCategory} from 'api/config';

  export default {
    data() {
      return {
        dataList: [],
        centerTitle: ''
      };
    },
    beforeCreate() {
      console.log(this.$route);
    },
    created() {
      (() => {
        switch (this.$route.params.type) {
          case 'rank':
            this.getRank();
            return;
          case 'category':
            this.getCategory();
            return;
          case 'search':
            this.getSearch();
        }
      })();
    },
    computed: {
      ...mapGetters([
        'rankQuery',
        'searchQuery',
        'categoryQuery'
      ])
    },
    methods: {
      getRank() {
        getRankList(this.rankQuery).then((res) => {
          console.log(this.rankQuery);
          this.centerTitle = rankCategory[this.rankQuery.rankType - 1] || '百度小说月票榜';
          this.dataList = [...this.dataList, ...res.ranklist];
          console.log(res);
        }).catch((e) => {
          console.log(e);
        });
        console.log('getRank');
      },
      getCategory() {
        getCatList(this.categoryQuery).then((res) => {
          console.log(this.categoryQuery);
          this.centerTitle = this.categoryQuery.cidName || '奇幻玄幻';
          this.dataList = [...this.dataList, ...res.ranklist];
        }).catch((e) => {
          console.log(e);
        });
      },
      getSearch() {
        getSearchList();
      },
      getMore() {
        this.setRankQuery({pageNum: this.rankQuery.pageNum + 1});
        (() => {
          switch (this.$route.params.type) {
            case 'rank':
              this.getRank();
              return;
            case 'category':
              this.getCategory();
              return;
            case 'search':
              this.getSearch();
          }
        })();
      },
      back() {
        this.$router.go(-1);
      },
      ...mapMutations({
        setRankQuery: 'SET_RANK_QUERY',
        setCategory: 'SET_CATEGORY_QUERY',
        setSearch: 'SET_SEARCH_QUERY'
      })
    }
  };
</script>

<style lang="stylus" type="text/stylus" scoped>
  @import "~common/stylus/mixin"
  .list
    position absolute
    z-index 100
    top 0
    left 0
    right 0
    bottom 0
    .book-box
      zoom 1
      padding 14px 8px
      background-color #fafafa
      border-bottom 1px solid #dfdfdf
      overflow auto
      font-size 14px
      position relative
      .top-num
        overflow hidden
      .booking
        width 74px
        height 98px
        margin-right 10px
        float left
        img
          height 100%
          width 100%
      .book-info
        overflow hidden
        z-index 2
        .book-name
          color #4c4c4c
          height 29px
          font-size 16px
          display flex
          overflow hidden
          position relative
          span
            height 22px
            line-height 22px
            overflow hidden
            flex 1
        .author
          color #8f8f8f
          height 22px
          font-size 13px
          float left
        .cat
          float right
          &:after
            clear both
            content ''
            display block
            overflow hidden
        .update
          color #4c4c4c
          no-wrap()
          line-height 24px
          font-size 13px
          height 24px
          span
            color #a8a8a8
        .num
          color #8f8f8f
          height 24px
          line-height 24px
          font-size 13px
          .icon-up
            color red
        .intero-line
          no-wrap()
          height 24px
          line-height 24px
          font-size 13px
          color #4c4c4c
          span
            color #8a8a8a
    .list-top
      height 44px
      line-height 44px
      font-size 19px
      background-color: #333
      display flex
      .back, .my
        font-size 14px
        width 55px
      .center
        text-align center
        flex 1
    .list-bottom
      padding 12px 8px 16px
      background-color: #fafafa
    .view-more
      color #4c4c4c
      text-align center
      font-size 13px
      line-height 36px
      border 1px solid #dfdfdf
      background-color: #f2f2f2
</style>
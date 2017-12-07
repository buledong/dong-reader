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
    <div v-if="searchShow" class="search-top">
      <search-input></search-input>
      <h3 class="desc">
        <em></em>
        搜索“{{searchQuery.keywords}}”的结果
      </h3>
    </div>
    <div v-if="categoryShow" class="category-top">
      <h3 class="desc">
        <em></em>
        {{categoryQuery.cPidName}}
        <span v-if="categoryQuery.cidName">--</span>
        {{categoryQuery.cidName}}
      </h3>
      <div class="tab-title">
        <div class="tab-item"
             :class="activeCls(index)"
             @click="selectTabItem(index)"
             v-for="(item,index) in categoryTabTitle">{{item}}
        </div>
      </div>
    </div>
    <div class="book-box"
         v-for="(item,index) in dataList"
         @click.stop="goToBook(item)"
    >
      <span class="top-num" v-if="rankShow" :class="topNumCls(index)">{{index+1}}</span>
      <div class="booking">
        <img v-lazy="'https://static.zongheng.com/upload/s_image' + item.coverUrl" alt="头像">
      </div>
      <div class="book-info">
        <h4 class="book-name">
          <span>{{item.bookName}}</span>
        </h4>
        <div class="author">{{item.authorName}}</div>
        <div class="cat" v-if="rankShow">{{item.categoryName}}</div>
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
      <div class="view-more" @click="getMore">{{hasOrNoMore}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getCatList, getRankList, getSearchList} from 'api/list';
  import {mapMutations, mapGetters} from 'vuex';
  import {rankCategory, categoryTabTitle} from 'api/config';
  import searchInput from 'base/search-input/search-input';

  export default {
    data() {
      return {
        dataList: [],
        centerTitle: '',
        hasMore: true,
        loadingMore: false,
        rankShow: false,
        searchShow: false,
        categoryShow: false,
        categoryTabTitle
      };
    },
    beforeCreate() {
      console.log(this.$route);
    },
    created() {
      (() => {
        switch (this.$route.params.type) {
          case 'rank':
            this.rankShow = true;
            this.getRank();
            return;
          case 'category':
            this.categoryShow = true;
            this.getCategory();
            return;
          case 'search':
            this.searchShow = true;
            this.getSearch();
        }
      })();
    },
    computed: {
      hasOrNoMore() {
        if (this.loadingMore) {
          return '更多内容读取中...';
        }
        return this.hasMore ? '查看更多' : '木有更多了( ˙﹏˙ )';
      },
      ...mapGetters([
        'rankQuery',
        'searchQuery',
        'categoryQuery'
      ])
    },
    methods: {
      getRank() {
        getRankList(this.rankQuery).then((res) => {
          this.hasMore = res.ajaxResult.code === 1;
          console.log(this.rankQuery);
          this.centerTitle = rankCategory[this.rankQuery.rankType - 1] || '百度小说月票榜';
          this.loadingMore = false;
          this.dataList = [...this.dataList, ...res.ranklist];
          console.log(res);
        }).catch((e) => {
          console.log(e);
        });
        console.log('getRank');
      },
      getCategory() {
        getCatList(this.categoryQuery).then((res) => {
          this.hasMore = res.ajaxResult.code === 0;
          this.loadingMore = false;
          console.log(this.categoryQuery);
          this.centerTitle = this.categoryQuery.cidName || '奇幻玄幻';
          this.dataList = [...this.dataList, ...res.ranklist];
        }).catch((e) => {
          console.log(e);
        });
      },
      getSearch() {
        getSearchList(this.searchQuery).then((res) => {
          this.hasMore = res.ajaxResult.code === 1;
          this.loadingMore = false;
          this.centerTitle = '搜索结果';
          this.dataList = [...this.dataList, ...res.searchlist.searchBooks];
          console.log(res);
        }).catch((e) => {
          console.log(e);
        });
      },
      getMore() {
        if (!this.hasMore) {
          return;
        }
        this.loadingMore = true;
        (() => {
          switch (this.$route.params.type) {
            case 'rank':
              this.setRankQuery({pageNum: this.rankQuery.pageNum + 1});
              this.getRank();
              return;
            case 'category':
              this.setCategoryQuery({pageNum: this.categoryQuery.pageNum + 1});
              this.getCategory();
              return;
            case 'search':
              this.setSearchQuery({pageNum: this.searchQuery.pageNum + 1});
              this.getSearch();
          }
        })();
      },
      back() {
        this.$router.go(-1);
      },
      goToBook(item) {
        console.log(item);
        const query = {
          bookId: item.bookId,
          chapterId: null
        };
        this.setBookInfo(query);
        this.$router.push({path: `/book/${item.bookId}`});
      },
      selectTabItem(index) {
        const query = {
          type: index + 1,
          pageNum: 1
        };
        this.setCategoryQuery(query);
        this.dataList = [];
        this.getCategory();
      },
      activeCls(index) {
        return index + 1 === this.categoryQuery.type ? 'active' : '';
      },
      topNumCls(index) {
        return index < 3 ? `top-num-${index}` : '';
      },
      ...mapMutations({
        setRankQuery: 'SET_RANK_QUERY',
        setCategoryQuery: 'SET_CATEGORY_QUERY',
        setSearchQuery: 'SET_SEARCH_QUERY',
        setBookInfo: 'SET_BOOK_INFO'
      })
    },
    components: {
      searchInput
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
        position: absolute;
        width: 16px;
        height: 16px;
        border-radius: 2px;
        right: 10px;
        top: 15px;
        text-align: center;
        color: #aaa;
        line-height: 16px;
        background: #f1f1f1;
        &.top-num-0
          color #fff
          background-color: #ed5565
        &.top-num-1
          color #fff
          background-color: #e28d29
        &.top-num-2
          color #fff
          background-color: #9fc575
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
        .author, .cat
          color #8f8f8f
          height 22px
          font-size 13px
        .author
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
    .search-top
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
    .category-top
      background-color: #fff
      .tab-title
        padding 5px 3px
        display flex
        .tab-item
          height 35px
          line-height 35px
          text-align center
          margin 5px
          color #4c4c4c
          border-radius 3px
          background-color: #f2f2f2
          flex 1
          &.active
            color #fff
            background-color: #ff4544
    .desc
      color: #4c4c4c;
      font-size: 14px;
      height: 25px;
      padding: 11px 8px 0;
      line-height: 14px;
      background-color: #fafafa
      em
        height: 14px;
        width: 8px;
        float: left;
        background: #5e5e5e;
        border-radius: 2px;
        margin-right: 4px;
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
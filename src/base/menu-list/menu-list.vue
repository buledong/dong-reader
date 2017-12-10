<template>
  <div class="menu-list">
    <div class="allNum">
      目录&nbsp;共{{chapterCount}}章
    </div>
    <div class="book-list">
      <ul>
        <li class="list-item" @click.stop="goToReader(item)" v-for="(item,index) in dataList">
          {{(pageNum-1)*20+index+1}}.
          <em v-show="item.level===1">VIP</em>
          {{item.chapterName}}
          <i class="icon-double-right"></i>
        </li>
      </ul>
    </div>
    <div class="book-list-select-bottom">
      <div class="btn-prev" @click.stop="prev">
        <i class="icon-backward"></i>
        上一页
      </div>
      <div class="select-box">
        <div class="select-title">
          第{{pageNum}}页
        </div>
        <select ref="select" title class="list-select" @change="selectItem">
          <option v-for="index in (chapterCount/20 | 0) + 1" :vlaue="index" class="list-item">
            {{index}}
          </option>
        </select>
      </div>
      <div class="btn-next" @click.stop="next">
        下一页
        <i class="icon-forward"></i>
      </div>
    </div>
    <footer></footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getChapterList} from 'api/list';
  import {mapMutations, mapGetters} from 'vuex';

  export default {
    data() {
      return {
        dataList: [],
        chapterCount: 0,
        pageNum: 0,
        chapterPageNum: 1
      };
    },
    created() {
      this.getChapterList(true);
    },
    methods: {
      getChapterList(init) {
        const bookId = this.$route.params.id;
        let pageNum;
        if (init) {
          pageNum = 1;
        } else {
          pageNum = this.pageNum;
        }
        const query = {
          bookId,
          pageNum
        };
        getChapterList(query).then((res) => {
          console.log(res);
          this.chapterCount = res.chapterlist.chapterCount;
          this.pageNum = res.chapterlist.pageNum;
          this.dataList = [];
          this.dataList = res.chapterlist.chapters;
        }).catch((e) => {
          console.log(e);
        });
      },
      selectItem() {
        this.pageNum = this.$refs.select.value;
        this.getChapterList();
      },
      goToReader(item) {
        const bookId = this.$route.params.id;
        const query = {
          bookId,
          chapterId: item.chapterId
        };
        console.log(query);
        this.setBookInfo(query);
        this.$emit('select');
//        this.$router.push({path: `/book/${bookId}`});
//        this.$router.go(0);
      },
      prev() {
        if (!this.pageNum === 1) {
          this.pageNum -= 1;
          this.getChapterList();
        }
      },
      next() {
        if (!(this.pageNum === (this.chapterCount / 20 | 0) + 1)) {
          console.log('1111');
          this.pageNum += 1;
        } else {
          console.log('1111222');
          this.pageNum = 1;
        }
        this.getChapterList();
      },
      ...mapMutations({
        setBookInfo: 'SET_BOOK_INFO'
      })
    },
    computed: {
      ...mapGetters([
        'bookInfo'
      ])
    }
  };
</script>

<style lang="stylus" type="text/stylus" scoped>
  @import "~common/stylus/variable"
  .menu-list
    z-index 1
    position absolute
    top 44px
    bottom 44px
    left 0
    right 0
    font-size 14px
    color #4c4c4c
    background-color: #fafafa
    .allNum
      font-weight bold
      padding 10px 0 5px
      font-size 20px
      text-align center
    .book-list
      background-color: #fafafa
      .list-item
        line-height 38px
        height 38px
        padding 0 20px 0 8px
        font-size 14px
        border-bottom 1px solid #dfdfdf
        color #4c4c4c
        display block
        margin 0
        no-wrap()
        i
          line-height 38px
          height 38px
          float right
          padding-right 5px
        em
          background #ed5565
          font-style normal
          color #fff
          font-family Tahoma
          padding 0 5px
          border-radius 3px
          font-size 14px
          margin-right 5px
    .book-list-select-bottom
      display flex
      padding 10px
      height 34px
      line-height 34px
      background-color #fafafa
      .btn-prev, .btn-next, .select-box
        text-align center
        height 32px
        line-height 32px
        border 1px solid #cecece
        border-radius 3px
        margin-right 5px
        flex 1
      .select-box
        position relative
        padding-left 10px
        -webkit-box-flex 1
        height 32px
        border 1px solid #f9dea6
        border-radius 3px
        color #ca8f4a
        .select-item
          text-align center
        .list-select
          -webkit-appearance none
          position absolute
          left 0
          top 0
          width 100%
          height 100%
          opacity 0
          .list-item
            text-align center
            word-spacing 3px
        i
          padding 0 5px
    footer
      height 44px
</style>
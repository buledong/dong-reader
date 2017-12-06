<template>
  <div class="reader" ref="reader" @click="clickReader">
    <h1 class="title">{{data.chapterName}}</h1>
    <div class="text" v-html="text"></div>
    <div class="bottom">
      <div class="prev" @click.prevent.stop="getPrev">
        <i class="icon-prev"></i>
        上一章
      </div>
      <div class="center">
        <i class="icon-list"></i>
        目录
      </div>
      <div class="next" @click.prevent.stop="getNext">
        下一章
        <i class="icon-next"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getChapter} from 'api/book';
  import {mapMutations, mapGetters} from 'vuex';

  export default {
    data() {
      return {
        data: {}
      };
    },
    created() {
      this._initChapterBookId();
      this.getChapter(this.bookId, this.chapterId);
    },
    computed: {
      text() {
        const space = /\s/g;
        return this.data.content ? this.data.content.replace(space, '') : '';
      },
      ...mapGetters([
        'bookId',
        'chapterId',
        'prevId',
        'nextId'
      ])
    },
    methods: {
      getChapter(bookId, chapterId) {
        getChapter(bookId, chapterId).then((res) => {
          if (res.ajaxResult.code === 1) {
            console.log('进来了');
            this.data = res.result;
          }
        }).catch((e) => {
          console.log(e);
        });
      },
      getPrev() {
        window.scrollTo(0, 0);
        this.getChapter(this.bookId, this.prevId);
      },
      getNext() {
        window.scrollTo(0, 0);
        this.getChapter(this.bookId, this.nextId);
      },
      clickReader(e) {
        console.log(e);
      },
      _initChapterBookId() {
        const bookId = this.$route.params.id;
        this.setBookId(bookId);
        this.setChapterId(null);
      },
      ...mapMutations({
        setBookId: 'SET_BOOK_ID',
        setChapterId: 'SET_CHAPTER_ID',
        setPrevId: 'SET_PREV_ID',
        serNextId: 'SET_NEXT_ID'
      })
    },
    watch: {
      data() {
        console.log(this.data);
        this.setChapterId(this.data.chapterId);
        this.setPrevId(this.data.prevId);
        this.serNextId(this.data.nextChapterId);
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
      font-size 16px
      height 44px
      display flex
      .prev, .center, .next
        text-align center
        line-height 42px
        margin 2px 5px
        border 1px solid #fff
        border-radius 14px
        flex 1
        i
          font-size 14px
</style>
<template>
  <div class="reader" ref="reader" @click="clickReader">
    <h1 class="title">{{data.chapterName}}</h1>
    <div class="text" v-html="text"></div>
    <div class="bottom">
      <div class="prev" @click.prevent.stop="getPrev">
        <i class="icon-prev"></i>
        上一章
      </div>
      <div class="center" @click="clickMenu">
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

  const localStyle = window.localStorage.styleQuery ? JSON.parse(window.localStorage.styleQuery) : null;
  /* import {prefixStyle} from 'common/js/dom';
  const transform = prefixStyle('transform'); */
  export default {
    data() {
      return {
        data: {},
        localStyle
      };
    },
    beforeCreate() {
    },
    mounted() {
      this._initReader();
    },
    computed: {
      text() {
        const space = /\s/g;
        return this.data.content ? this.data.content.replace(space, '') : '';
      },
      ...mapGetters([
        'bookInfo',
        'styleQuery'
      ])
    },
    methods: {
      _initReader() {
        this.setStyle(true);
        this.getChapter();
        const _this = this;
        window.addEventListener('setItemEvent', () => {
          _this.setStyle();
        });
      },
      refresh() {
        this.getChapter();
      },
      getChapter() {
        const bookId = this.bookInfo.bookId || this.$route.params.id;
        const chapterId = this.bookInfo.chapterId;
        getChapter(bookId, chapterId).then((res) => {
          if (res.ajaxResult.code === 1) {
            this.data = res.result;
          }
        }).catch((e) => {
          console.log(e);
        });
      },
      getPrev() {
        window.scrollTo(0, 0);
        const query = {
          chapterId: this.data.prevId
        };
        this.setBookInfo(query);
        this.getChapter();
      },
      getNext() {
        window.scrollTo(0, 0);
        const query = {
          chapterId: this.data.nextChapterId
        };
        this.setBookInfo(query);
        this.getChapter();
      },
      clickReader(e) {
        const allHeight = window.innerHeight;
        const oneHeight = allHeight / 10 | 0;
        const layerY = e.layerY;
        const clientY = e.clientY;
        if (clientY < oneHeight || clientY > 9 * oneHeight) {
        } else if (clientY >= oneHeight && clientY < 4 * oneHeight) {
          window.scrollTo(0, layerY - clientY - allHeight - 15);
          this.hiddenMenu();
          /* console.log(transform);
          console.log(this.$refs.reader);
          this.$refs.reader.style[transform] = `translate3d(0,${layerY - clientY - allHeight - 15}px,0)`; */
        } else if (clientY >= 4 * oneHeight && clientY < 6 * oneHeight) {
          this.showMenu();
        } else if (clientY >= 6 * oneHeight && clientY < 9 * oneHeight) {
          window.scrollTo(0, layerY - clientY + allHeight - 15);
          this.hiddenMenu();
        }
      },
      clickMenu() {
        this.$emit('clickMenu');
      },
      hiddenMenu() {
        this.$emit('hiddenMenu');
      },
      showMenu() {
        this.$emit('showMenu');
      },
      setStyle(init) {
        let style;
        if (init) {
          style = localStyle || this.styleQuery;
          console.log(style, 'init');
        } else {
          style = this.styleQuery;
        }
        console.log(this.$refs.reader);
        const fontSize = style.fontSize;
        const backgroundColor = style.backgroundColor;
        console.log(style);
        this.$refs.reader.setAttribute('style', `font-size:${fontSize}px;background-color:#${backgroundColor}`);
      },
      ...mapMutations({
        setBookInfo: 'SET_BOOK_INFO'
      })
    },
    watch: {
      styleQuery() {
        console.log('变了');
        this.setStyle();
      },
      localStyle() {
        console.log('变了');
        this.setStyle();
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
      font-weight bold
      height 44px
      line-height 44px
      text-align center
      padding 10px
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
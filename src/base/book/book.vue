<template>
  <div class="book">
    <div v-show="showMenu" class="menu">
      <div class="menu-top">
        <div class="back" @click="back">
          <i class="icon-back"></i>
          返回
        </div>
        <div class="chapter">
          {{bookName}}
        </div>
        <div class="my" @click.stop="goToMy">我的</div>
      </div>
      <div class="menu-set" v-show="show">
        <div class="set-font" @click="fontChange($event)">
          <div id="ft">
            <span>字</span>
            <span>体</span>
          </div>
          <div class="set-small">
            小号：
            <select title>
              <option value="10">10px</option>
              <option value="12">12px</option>
              <option value="14">14px</option>
              <option value="16">16px</option>
              <option value="18">18px</option>
            </select>
          </div>
          <div class="set-middle">
            中号：
            <select title>
              <option value="20">20px</option>
              <option value="22">22px</option>
              <option value="24">24px</option>
              <option value="26">26px</option>
              <option value="28">28px</option>
            </select>
          </div>
          <div class="set-big">
            大号：
            <select title>
              <option value="30">30px</option>
              <option value="32">32px</option>
              <option value="34">34px</option>
              <option value="36">36px</option>
              <option value="38">38px</option>
            </select>
          </div>
        </div>
        <div class="set-background" @click="backgroundChange($event)">
          <div id="bg">
            <span>背</span>
            <span>景</span>
          </div>
          <div class="color" id="e8e3d4">
            <div></div>
            羊皮纸
          </div>
          <div class="color" id="f7f6f2">
            <div></div>
            淡雅白
          </div>
          <div class="color" id="c6e0ed">
            <div></div>
            冰爽蓝
          </div>
          <div class="color" id="e0b6c4">
            <div></div>
            浪漫粉
          </div>
          <div class="color" id="a6bc9c">
            <div></div>
            护眼绿
          </div>
        </div>
      </div>
      <div class="menu-bottom">
        <div class="set-font-size" @click.stop="setFontSize">
          <i class="icon-list"></i>
          字体
        </div>
        <div class="set-background" @click.stop="setBackground">
          <i class="icon-cog"></i>
          背景
        </div>
      </div>
    </div>
    <menu-list v-show="!show" @select="select"></menu-list>
    <router-view ref="reader"
                 v-show="show"
                 @clickMenu="toggleShowList"
                 @hiddenMenu="hiddenMenu"
                 @showMenu="toggleShowMenu">

    </router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import menuList from 'base/menu-list/menu-list';
  import {mapMutations, mapGetters} from 'vuex';

  const local = window.localStorage;
  export default {
    data() {
      return {
        show: true,
        showMenu: false
      };
    },
    methods: {
      select() {
        this.show = !this.show;
        this.showMenu = false;
        this.$refs.reader.refresh();
      },
      toggleShowMenu() {
        this.showMenu = !this.showMenu;
      },
      back() {
        this.$router.go(-1);
      },
      toggleShowList() {
        this.show = !this.show;
        this.showMenu = true;
      },
      hiddenMenu() {
        this.showMenu = false;
      },
      fontChange(e) {
        console.log(e.target.value);
        if (!e.target.value) {
          return;
        }
        const query = {
          fontSize: e.target.value
        };
        this.setStyleQuery(query);
      },
      backgroundChange(e) {
        const color = e.target.parentElement.id;
        if (!color) {
          return;
        }
        const query = {
          backgroundColor: color
        };
        this.setStyleQuery(query);
      },
      goToMy() {
        this.$router.push({path: `/my`});
      },
      ...mapMutations({
        setStyleQuery: 'SET_STYLE_QUERY'
      })
    },
    computed: {
      bookName() {
        return local.bookInfo ? JSON.parse(local.bookInfo).bookName : this.bookInfo.bookName;
      },
      ...mapGetters([
        'bookInfo'
      ])
    },
    components: {
      menuList
    }
  };
</script>

<style lang="stylus" type="text/stylus" scoped>
  .book
    top 0
    bottom 0
    left 0
    right 0
    background-color: #000
    font-size 16px
    position absolute
    .menu-top, .menu-bottom, .menu-set
      background-color: #000
      z-index 2
      display flex
      left 0
      right 0
      position fixed
    .menu-top
      top 0
      height 44px
      .back, .chapter, .my
        line-height 44px
      .back
        width 55px
        margin-left 10px
        text-align left
      .chapter
        text-align center
        flex 1
      .my
        width 55px
        margin-right 10px
        text-align right
    .menu-bottom
      bottom 0
      height 44px
      .div, .set-font-size, .set-background, .prev, .next
        text-align center
        line-height 44px
        flex 1
    .menu-set
      display block
      bottom 44px
      .set-font
        width 100%
        line-height 44px
        text-align center
        display flex
        .set-small, .set-middle, .set-big
          flex 1
      .set-background
        display flex
        .color
          margin-bottom 5px
          flex 1
          div
            border-radius 4px
            margin 10px 5px
            width 40px
            height 40px
        #e8e3d4 div
          background-color: #e8e3d4
        #f7f6f2 div
          background-color: #f7f6f2
        #c6e0ed div
          background-color: #c6e0ed
        #e0b6c4 div
          background-color: #e0b6c4
        #a6bc9c div
          background-color: #a6bc9c

  #ft, #bg
    flex-direction column
    display flex
    line-height 1
    padding 10px 5px 0
</style>
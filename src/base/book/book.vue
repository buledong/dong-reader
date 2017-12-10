<template>
  <div class="book">
    <div v-show="showMenu" class="menu">
      <div class="menu-top">
        <div class="back" @click="back">
          <i class="icon-back"></i>
          返回
        </div>
        <div class="chapter">章节名</div>
        <div class="my">我的</div>
      </div>
      <div class="menu-bottom">
        <div class="chapter-menu">
          <i class="icon-list"></i>
          字体
        </div>
        <div class="set">
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
                 @showMenu="toggleShowMenu"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import menuList from 'base/menu-list/menu-list';

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
      }
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
    .menu-top, .menu-bottom
      background-color: #000
      z-index 2
      display flex
      height 44px
      left 0
      right 0
      position fixed
    .menu-top
      top 0
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
      .div, .chapter-menu, .set, .prev, .next
        text-align center
        line-height 44px
        flex 1
</style>
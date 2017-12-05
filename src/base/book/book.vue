<template>
  <div class="book">
    <div hidden class="menu">
      <div class="menu-top">
        <div class="back">返回</div>
        <div class="chapter">章节名</div>
        <div class="my">我的</div>
      </div>
      <div class="menu-bottom">
        <div class="prev">上一章</div>
        <div class="div">某某</div>
        <div class="chapter-menu">目录</div>
        <div class="set">设置</div>
        <div class="next">下一章</div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {};
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
      display flex
      height 44px
      left 0
      right 0
      position fixed
    .menu-top
      top 0
      .back, .chapter, .my
        line-height 44px
        flex 1
      .back
        text-align left
      .chapter
        text-align center
      .my
        text-align right
    .menu-bottom
      bottom 0
      .div, .chapter-menu, .set, .prev, .next
        text-align center
        line-height 44px
        flex 1
</style>
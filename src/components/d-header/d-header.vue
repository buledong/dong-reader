<template>
  <div class="d-header">
    <div class="logo"></div>
    <h1 class="text">dong-reader</h1>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {};
</script>

<style lang="stylus" type="text/stylus" scoped>
  @import '~common/stylus/variable'
  .d-header
    position relative
    height 44px
    text-align center
    color $color-theme
    font-size 0
    .logo
      display inline-block
      vertical-align top
      margin-top 6px
      margin-right 9px
      width 30px
      height 30px
      border-radius 50%
      background-image url('logo.png')
      background-size 30px 30px
    .text
      display inline-block
      vertical-align top
      line-height 44px
      font-size $font-size-large
</style>
<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-link">排行</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="category">
      <span class="tab-link">分类</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="search">
      <span class="tab-link">搜索</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="list">
      <span class="tab-link">我的</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {};
</script>

<style lang="stylus" type="text/stylus" scoped>
  @import '~common/stylus/variable'
  .tab
    display flex
    height 44px
    line-height 44px
    font-size $font-size-medium
    .tab-item
      flex 1
      text-align center
      .tab-link
        padding-bottom 6px
        color $color-text-l
      &.router-link-active
        .tab-link
          color $color-theme
          border-bottom 2px solid
</style>
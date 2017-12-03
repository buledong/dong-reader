<template>
  <div class="list">
    <div class="book-box">
      <span class="top-num"></span>
      <div class="booking">
        <img src="" alt="">
      </div>
      <div class="book-info">
        <h4 class="book-name">
          <span></span>
        </h4>
        <div class="author"></div>
        <div class="cat"></div>
        <div class="update">
          <span>更新至：</span>
          多照张
        </div>
        <div class="num">月票数。。</div>
        <div class="intero-line">
          <span>简介：</span>
          这里是简介
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      dataList: {
        type: Object,
        default: {}
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" scoped>
</style>
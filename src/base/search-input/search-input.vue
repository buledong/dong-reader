<template>
  <div class="search-input">
    <div class="form">
      <div class="search-box">
        <div class="input-box">
          <input type="text"
                 title="search-input"
                 placeholder="请输入关键字" value
                 class="search-input"
                 maxlength="15"
                 v-model.lazy.trim="searchText"
                 @keyup.enter="searchGo"
          >
        </div>
        <div class="search-go" @click.stop="searchGo">
          <i class="icon-search"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex';

  export default {
    data() {
      return {
        searchText: ''
      };
    },
    methods: {
      searchGo() {
        if (!/[\w\u4E00-\u9FA5]/.test(this.searchText)) {
          const allSpace = document.createElement('div');
          allSpace.setAttribute('class', 'all-space');
          allSpace.innerHTML = '不能全是空白字符';
          document.body.appendChild(allSpace);
          setTimeout(() => {
            document.body.removeChild(allSpace);
          }, 2000);
          return;
        }
        const query = {
          keywords: this.searchText.replace(/\s/g, '')
        };
        this.setSearchQuery(query);
        console.log(query);
        this.$router.push({path: '/list/search'});
      },
      ...mapMutations({
        setSearchQuery: 'SET_SEARCH_QUERY'
      })
    }
  };
</script>

<style lang="stylus" type="text/stylus" scoped>
  .search-input
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
</style>
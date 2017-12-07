<template>
  <div class="category">
    <div v-for="(items,key) in categoryList" class="cat-box">
      <h3>
        <span class="key">{{items.cpidName}}</span>
        <span class="look-more" @click="getMore(items)">
          <i class="icon-list2"></i>
          查看更多
        </span>
      </h3>
      <ul class="cat-list">
        <li v-for="(item,index) in items.cpidChild" :class="{gap:index%4!==0}" @click="selectItem(items,item)">
          {{item.cidName}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {category} from 'api/config';
  import {mapMutations, mapGetters} from 'vuex';

  export default {
    data() {
      return {
        categoryList: category
      };
    },
    methods: {
      getMore(items) {
        const params = {
          cPid: items.cpidNum,
          bookType: items.cpidType,
          cid: -1,
          cPidName: items.cpidName,
          cidName: ''
        };
        this.setCategoryQuery(params);
        console.log(this.categoryQuery);
        console.log(items);
        this.$router.push({path: '/list/category'});
      },
      selectItem(items, item) {
        const params = {
          cPid: items.cpidNum,
          bookType: items.cpidType,
          cid: item.cidNum,
          cPidName: items.cpidName,
          cidName: item.cidName
        };
        this.setCategoryQuery(params);
        console.log(params);
        console.log(items, item);
        this.$router.push({path: '/list/category'});
      },
      ...mapMutations({
        setCategoryQuery: 'SET_CATEGORY_QUERY'
      })
    },
    computed: {
      ...mapGetters([
        'categoryQuery'
      ])
    }
  }
  ;
</script>

<style lang="stylus" type="text/stylus" scoped>
  .category
    color: #4c4c4c;
    background: #fafafa;
    .cat-box
      background-color: #f2f2f2
      padding-top 15px
      h3
        background-color: #fff
        padding 11px 8px 0
        height: 25px
        .key
          color #4c4c4c
          font-size 14px
          line-height 14px
          padding-left 7px
          border-left 8px solid #ff4643
          border-radius 2px
        .look-more
          padding-right 5px
          font-size 13px
          float right
          .icon-list2
            font-size 10px
      .cat-list
        background-color: #fff
        display flex
        flex-wrap wrap
        li
          line-height 40px
          text-align center
          height 40px
          font-size 13px
          border-bottom 1px solid #e9e9e9
          flex 0 0 24.8%
          &.gap:before
            content ' '
            padding-left 25%
            font-size 13px
            border-left 1px solid #dfdfdf
</style>
import Vue from 'vue';
import Router from 'vue-router';
import Rank from 'components/rank/rank';
import Category from 'components/category/category';
import Search from 'components/search/search';
import List from 'base/list';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/rank'
    }, {
      path: '/rank',
      component: Rank
    },
    {
      path: '/category',
      component: Category
    },
    {
      path: '/search',
      component: Search
    }, {
      path: '/list',
      component: List
    }
  ]
});

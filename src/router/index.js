import Vue from 'vue';
import Router from 'vue-router';

const Rank = (resolve) => {
  import('components/rank/rank').then((module) => {
    resolve(module);
  });
};
const Category = (resolve) => {
  import('components/category/category').then((module) => {
    resolve(module);
  });
};
const Search = (resolve) => {
  import('components/search/search').then((module) => {
    resolve(module);
  });
};
const List = (resolve) => {
  import('base/list/list').then((module) => {
    resolve(module);
  });
};
const Book = (resolve) => {
  import('base/book/book').then((module) => {
    resolve(module);
  });
};
const Reader = (resolve) => {
  import('base/reader/reader').then((module) => {
    resolve(module);
  });
};
const My = (resolve) => {
  import('components/my/my').then((module) => {
    resolve(module);
  });
};
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
      component: List,
      children: [{
        path: ':type'
      }]
    }, {
      path: '/book',
      component: Book,
      children: [{
        path: ':id',
        component: Reader
      }]
    }, {
      path: '/my',
      component: My
    }
  ]
});

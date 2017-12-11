/**
 * Created by  blue dong on 2017/12/6.
 */
'use strict';
import * as types from './types';

const local = window.localStorage;
const mutations = {
  [types.SET_BOOK_INFO](state, bookInfo) {
    bookInfo = Object.assign(state.bookInfo, bookInfo);
    local.bookInfo = JSON.stringify(bookInfo);
  },
  [types.SET_CATEGORY_QUERY](state, categoryQuery) {
    categoryQuery = Object.assign(state.categoryQuery, categoryQuery);
    local.categoryQuery = JSON.stringify(categoryQuery);
  },
  [types.SET_RANK_QUERY](state, rankQuery) {
    rankQuery = Object.assign(state.rankQuery, rankQuery);
    console.log('s==================', rankQuery);
    local.rankQuery = JSON.stringify(rankQuery);
  },
  [types.SET_SEARCH_QUERY](state, searchQuery) {
    searchQuery = Object.assign(state.searchQuery, searchQuery);
    local.searchQuery = JSON.stringify(searchQuery);
  },
  [types.SET_STYLE_QUERY](state, styleQuery) {
    styleQuery = Object.assign(state.styleQuery, styleQuery);
    console.log(JSON.stringify(styleQuery));
    local.setItem('styleQuery', JSON.stringify(styleQuery));
  }
};
export default mutations;

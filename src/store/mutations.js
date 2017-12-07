/**
 * Created by  blue dong on 2017/12/6.
 */
'use strict';
import * as types from './types';

const mutations = {
  [types.SET_BOOK_INFO](state, bookInfo) {
    Object.assign(state.bookInfo, bookInfo);
  },
  [types.SET_CATEGORY_QUERY](state, categoryQuery) {
    Object.assign(state.categoryQuery, categoryQuery);
  },
  [types.SET_RANK_QUERY](state, rankQuery) {
    Object.assign(state.rankQuery, rankQuery);
  },
  [types.SET_SEARCH_QUERY](state, searchQuery) {
    Object.assign(state.searchQuery, searchQuery);
  }
};
export default mutations;

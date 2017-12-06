/**
 * Created by  blue dong on 2017/12/6.
 */
'use strict';
import * as types from './types';

const mutations = {
  [types.SET_BOOK_ID](state, bookId) {
    state.bookId = bookId;
  },
  [types.SET_CHAPTER_ID](state, chapterId) {
    state.chapterId = chapterId;
  },
  [types.SET_PREV_ID](state, prevId) {
    state.prevId = prevId;
  },
  [types.SET_NEXT_ID](state, nextId) {
    state.nextId = nextId;
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

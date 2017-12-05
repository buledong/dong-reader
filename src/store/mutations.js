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
  }
};
export default mutations;

/**
 * Created by  blue dong on 2017/12/6.
 */
'use strict';
const state = {
  bookId: 0,
  chapterId: null,
  prevId: null,
  nextId: null,
  rankQuery: {
    rankTpye: 1,
    pageNum: 1,
    pageSize: 10
  },
  categoryQuery: {
    cPid: 1,
    cid: -1,
    type: 1,
    pageSize: 10,
    pageNum: 1,
    bookType: 0,
    cidName: ''
  },
  searchQuery: {
    keywords: ''
  }
};
export default state;

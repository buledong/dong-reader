/**
 * Created by  blue dong on 2017/12/2.
 */
'use strict';
import jsonp from 'common/js/jsonp';
import {options, commonParams, rankCategory} from './config';

export function getRank(rankType, pageSize = 10) {
  switch (rankType) {
    case 1:
      rankType = 1;
      break;
    case 2:
      rankType = 4;
      break;
    case 3:
      rankType = 19;
      break;
    case 4:
      rankType = 14;
      break;
    case 5:
      rankType = 10;
      break;
  }
  const url = 'https://m.zongheng.com/h5/ajax/rank';
  const data = Object.assign({}, commonParams, {
    rankType,
    pageSize
  });
  return jsonp(url, data, options);
}

export function getRankList1() {
  const topLists = [];
  for (let i = 0; i < rankCategory.length; i++) {
    getRank(i + 1, 5).then((res) => {
      let arr = [];
      res.ranklist.forEach((item, index) => {
        arr.push(item.bookName);
      });
      topLists[i] = arr.slice(0);
    }).catch((e) => {
      console.log('Error:', e);
    });
  }
  console.log(topLists);
  return topLists;
}

export function getRankList() {
  const topLists = [];
  for (let i = 0; i < rankCategory.length; i++) {
    topLists[i] = [];
    getRank(i + 1, 5).then((res) => {
      res.ranklist.forEach((item, index) => {
        topLists[i].push({
          'bookName': item.bookName,
          'number': item.number,
          'authorName': item.authorName,
          'bookId': item.bookId,
          'categoryName': item.categoryName,
          'coverUrl': item.coverUrl,
          'description': item.description,
          'serialStatus': item.serialStatus,
          'subCateName': item.subCateName,
          'updteChapterName': item.updteChapterName
        });
      });
    }).catch((e) => {
      console.log('Error:', e);
    });
  }
  // console.log(topLists);
  return topLists;
}

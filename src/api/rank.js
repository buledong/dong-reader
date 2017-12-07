/**
 * Created by  blue dong on 2017/12/2.
 */
'use strict';
import jsonp from 'common/js/jsonp';
import {options, rankCategory} from './config';

export function getRank({rankType = 1, pageSize = 10, pageNum = 1}) {
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
    case 'undefined' :
      rankType = 1;
  }
  console.log(rankType, pageSize, pageNum);
  const url = 'https://m.zongheng.com/h5/ajax/rank';
  const data = {
    rankType,
    pageSize,
    pageNum
  };
  return jsonp(url, data, options);
}

export function getRankList() {
  const topLists = [];
  for (let i = 0; i < rankCategory.length; i++) {
    topLists[i] = [];
    getRank({rankType: i + 1, pageSize: 5}).then((res) => {
      res.ranklist.forEach((item, index) => {
        topLists[i].push(item);
      });
    }).catch((e) => {
      console.log('Error:', e);
    });
  }
  // console.log(topLists);
  return topLists;
}

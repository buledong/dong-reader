/**
 * Created by  blue dong on 2017/12/2.
 */
'use strict';
import jsonp from 'common/js/jsonp';
import {options, commonParams} from './config';
export function getRank() {
  let url = 'https://m.zongheng.com/h5/ajax/category/details';
  const data = Object.assign({}, commonParams, {
    type: 1
  });
  return jsonp(url, data, options);
}

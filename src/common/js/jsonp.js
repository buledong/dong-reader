/**
 * Created by  blue dong on 2017/12/2.
 */
'use strict';
import originJsonp from 'jsonp';

export default function jaonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}

function param(data) {
  let url = '';
  for (let key in data) {
    let value = data[key] !== undefined ? data[key] : '';
    url += '&' + key + '=' + encodeURIComponent(value);
  }
  return url ? url.substring(1) : '';
}

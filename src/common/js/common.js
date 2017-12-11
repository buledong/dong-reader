/**
 * Created by  blue dong on 2017/12/12.
 */
'use strict';
let orignalSetItem = localStorage.setItem;
localStorage.setItem = function (key, newValue) {
  let setItemEvent = new Event('setItemEvent');
  setItemEvent.newValue = newValue;
  window.dispatchEvent(setItemEvent);
  orignalSetItem.apply(this, arguments);
};

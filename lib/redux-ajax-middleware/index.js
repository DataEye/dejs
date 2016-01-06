'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ajax = require('../ajax');

var _ajax2 = _interopRequireDefault(_ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SUFFIX = {
  OK: 'ok',
  ERR: 'error'
}; /**
    * ajax请求中间件
    */

exports.default = function (store) {
  return function (next) {
    return function (action) {
      if (action.meta && action.meta.ajax) {
        if (!action.meta.url) {
          throw new Error('action:' + action.type + '缺少meta.url');
        }

        var formData = action.payload || {};
        if (formData.statusCode || formData.content) {
          throw new Error('ajax middleware验证错误，POST数据不能包含statusCode和content字段');
        }

        // ajax动作发起
        next(action);

        (0, _ajax2.default)({
          url: action.meta.url,
          method: 'post',
          body: formData,
          success: function success(json) {
            store.dispatch({
              type: action.type + '_' + SUFFIX.OK,
              // 客户端请求提交的表单数据直接覆盖json
              payload: Object.assign(json, action.payload)
            });
          },
          fail: function fail(err) {
            store.dispatch({
              type: action.type + '_' + SUFFIX.ERR,
              payload: err,
              error: true
            });
          }
        });

        return;
      }

      next(action);
    };
  };
};
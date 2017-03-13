'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SUFFIX = undefined;
exports.createAjax = createAjax;

var _ajax = require('../ajax');

var _ajax2 = _interopRequireDefault(_ajax);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * redux ajax middle ware
 * flux standard action
 */

var request = _ajax2.default;

var SUFFIX = exports.SUFFIX = {
  OK: 'ok',
  ERR: 'error'
};

// 使用自定义的ajax函数
function createAjax() {
  var xhr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _ajax2.default;

  request = xhr;
}

// action format
// {
//   type,
//   payload, (post data or Error instance)
//   error, (boolean)
//   meta: {
//     ajax: true,
//     url: string,
//     method: string (get/post),
//     original: original action data
//   }
// }

exports.default = function (store) {
  return function (next) {
    return function (action) {
      if (!action.meta || !action.meta.ajax) {
        next(action);
        return;
      }

      var _action$meta = action.meta;
      var url = _action$meta.url;
      var method = _action$meta.method;
      var original = _action$meta.original;
      var headers = _action$meta.headers;

      if (!url) {
        throw new Error('action:' + action.type + '\u7F3A\u5C11meta.url');
      }

      // ajax动作发起
      next(action);

      request({
        url: url,
        method: method || 'post',
        body: action.payload,
        headers: headers,
        success: function success(json) {
          store.dispatch({
            type: action.type + '_' + SUFFIX.OK,
            payload: json,
            meta: {
              original: original
            }
          });
        },
        fail: function fail(err, res) {
          // 如果错误请求有输出，把响应结果全部赋值到err对象上
          if (res && res.body) {
            _lodash2.default.assign(err, res.body);
          }

          store.dispatch({
            type: action.type + '_' + SUFFIX.ERR,
            payload: err,
            error: true,
            meta: {
              original: original
            }
          });
        }
      });
    };
  };
};
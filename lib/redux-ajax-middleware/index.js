'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SUFFIX = undefined;
exports.createAjax = createAjax;

var _ajax = require('../ajax');

var _ajax2 = _interopRequireDefault(_ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = _ajax2.default; /**
                               * redux ajax middle ware
                               * flux standard action
                               */

var SUFFIX = exports.SUFFIX = {
  OK: 'ok',
  ERR: 'error'
};

// 使用自定义的ajax函数
function createAjax() {
  var xhr = arguments.length <= 0 || arguments[0] === undefined ? _ajax2.default : arguments[0];

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

      if (!url) {
        throw new Error('action:' + action.type + '缺少meta.url');
      }

      // ajax动作发起
      next(action);

      request({
        url: url,
        method: method || 'post',
        body: action.payload,
        success: function success(json) {
          store.dispatch({
            type: action.type + '_' + SUFFIX.OK,
            payload: json,
            meta: {
              original: original
            }
          });
        },
        fail: function fail(err) {
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

      next(action);
    };
  };
};
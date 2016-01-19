'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupConfig = exports.XML_TYPE = exports.TEXT_TYPE = exports.JSON_TYPE = exports.FORM_TYPE = exports.DEFAULT_TIMEOUT = undefined;
exports.ajaxSetup = ajaxSetup;
exports.default = ajax;
exports.get = get;
exports.post = post;

var _client = require('superagent/lib/client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_TIMEOUT = exports.DEFAULT_TIMEOUT = 10000; /**
                                                        * ajax({
                                                        *  url: string,
                                                        *  method: 'get/post',
                                                        *  data/body: {},
                                                        *  headers: {},
                                                        *  timeout: number,
                                                        *  success: function,
                                                        *  fail/error: function,
                                                        *  complete: function
                                                        * })
                                                        */

var FORM_TYPE = exports.FORM_TYPE = 'application/x-www-form-urlencoded; charset=UTF-8';

var JSON_TYPE = exports.JSON_TYPE = 'application/json; charset=UTF-8';

var TEXT_TYPE = exports.TEXT_TYPE = 'text/plain; charset=UTF-8';

var XML_TYPE = exports.XML_TYPE = 'application/xml; charset=UTF-8';

var setupConfig = exports.setupConfig = {
  contextPath: ''
};

function ajaxSetup(opts) {
  for (var key in setupConfig) {
    if (opts.hasOwnProperty(key)) {
      setupConfig[key] = opts[key];
    }
  }
}

function ajax(opts) {
  var method = opts.method ? opts.method.toLowerCase() : 'get';
  var req = _client2.default[method](setupConfig.contextPath + opts.url, opts.data || opts.body);
  var headers = opts.headers || {
    'Content-Type': method === 'post' ? FORM_TYPE : TEXT_TYPE
  };
  var errorHandler = opts.fail || opts.error;
  var succHandler = opts.success;
  var completeHandler = opts.complete;
  for (var key in headers) {
    req.set(key, headers[key]);
  }

  req.timeout(opts.timeout || DEFAULT_TIMEOUT);

  if (opts.withCredentials) {
    req.withCredentials();
  }

  if (succHandler || errorHandler || completeHandler) {
    req.end(function (err, res) {
      if (err) {
        if (typeof errorHandler === 'function') {
          errorHandler(err, res);
        }
      } else {
        if (typeof succHandler === 'function') {
          succHandler(res.body || res.text, res);
        }
      }

      if (completeHandler) {
        completeHandler(err, res);
      }
    });

    return req;
  }

  return new Promise(function (resolve, reject) {
    req.end(function (err, res) {
      if (!err) {
        res.req = req;
        resolve(res);
      } else {
        reject(err);
      }
    });
  });
}

function get(url, success) {
  return ajax({
    url: url,
    success: success
  });
}

function post(url, data, success) {
  var hasNoDataPost = typeof data === 'function';
  return ajax({
    url: url,
    method: 'post',
    data: hasNoDataPost ? null : data,
    success: hasNoDataPost ? data : success
  });
}
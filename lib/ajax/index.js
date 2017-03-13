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

function isFunction(fn) {
  return fn && typeof fn === 'function';
} /**
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

var DEFAULT_TIMEOUT = exports.DEFAULT_TIMEOUT = 15000;

var FORM_TYPE = exports.FORM_TYPE = 'application/x-www-form-urlencoded; charset=UTF-8';

var JSON_TYPE = exports.JSON_TYPE = 'application/json; charset=UTF-8';

var TEXT_TYPE = exports.TEXT_TYPE = 'text/plain; charset=UTF-8';

var XML_TYPE = exports.XML_TYPE = 'application/xml; charset=UTF-8';

var setupConfig = exports.setupConfig = {
  contextPath: '',
  timeout: DEFAULT_TIMEOUT,
  ajaxComplete: null,
  ajaxError: null,
  ajaxSuccess: null,
  ajaxStart: null,
  ajaxPrefilter: null
};

function ajaxSetup(opts) {
  for (var key in setupConfig) {
    if (opts.hasOwnProperty(key)) {
      setupConfig[key] = opts[key];
    }
  }
}

function ajax() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (isFunction(setupConfig.ajaxPrefilter)) {
    setupConfig.ajaxPrefilter(opts);
  }
  var method = opts.method ? opts.method.toLowerCase() : 'get';
  var req = _client2.default[method](setupConfig.contextPath + opts.url, opts.data || opts.body);
  var headers = opts.headers || {
    'Content-Type': method === 'post' ? FORM_TYPE : TEXT_TYPE
  };
  var errorHandler = opts.fail || opts.error;
  var succHandler = opts.success;
  var completeHandler = opts.complete;
  var fireGlobals = opts.global !== false;

  for (var key in headers) {
    req.set(key, headers[key]);
  }

  req.timeout(opts.timeout || setupConfig.timeout);

  if (opts.withCredentials) {
    req.withCredentials();
  }

  if (succHandler || errorHandler || completeHandler) {
    if (isFunction(setupConfig.ajaxStart)) {
      setupConfig.ajaxStart();
    }
    req.end(function (err, res) {
      if (err) {
        if (fireGlobals && isFunction(setupConfig.ajaxError)) {
          setupConfig.ajaxError.call(req, err, res);
        }
        if (isFunction(errorHandler)) {
          errorHandler(err, res);
        }
      } else {
        var result = res.body || res.text;
        if (fireGlobals && isFunction(setupConfig.ajaxSuccess)) {
          setupConfig.ajaxSuccess.call(req, result, res);
        }
        if (isFunction(succHandler)) {
          succHandler(result, res);
        }
      }

      if (fireGlobals && isFunction(setupConfig.ajaxComplete)) {
        setupConfig.ajaxComplete.call(req, err, res);
      }
      if (completeHandler) {
        completeHandler(err, res);
      }
    });

    return req;
  }

  return new Promise(function (resolve, reject) {
    if (isFunction(setupConfig.ajaxStart)) {
      setupConfig.ajaxStart();
    }
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
  var hasNoDataPost = isFunction(data);
  return ajax({
    url: url,
    method: 'post',
    data: hasNoDataPost ? null : data,
    success: hasNoDataPost ? data : success
  });
}
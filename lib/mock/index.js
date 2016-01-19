'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _client = require('superagent/lib/client');

var _client2 = _interopRequireDefault(_client);

var _superagentMocker = require('superagent-mocker');

var _superagentMocker2 = _interopRequireDefault(_superagentMocker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * https://github.com/shuvalov-anton/superagent-mocker
 */

var mockConfig = {
  appContextPath: ''
};

var mock = {
  post: function post() {},
  get: function get() {},
  all: function all() {}
};

function mockModule(mod) {
  for (var funcName in mod) {
    mod[funcName](mock);
  }
}

function init() {
  var modules = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  mock = (0, _superagentMocker2.default)(_client2.default);
  var mockGet = mock.get;
  var mockPOST = mock.post;

  mock.get = function (url, callback) {
    mockGet(mockConfig.appContextPath + url, callback);
  };

  mock.post = function (url, callback) {
    mockPOST(mockConfig.appContextPath + url, callback);
  };

  mock.all = function (url, callback) {
    mockGet(mockConfig.appContextPath + url, callback);
    mockPOST(mockConfig.appContextPath + url, callback);
  };

  for (var key in mockConfig) {
    if (opts.hasOwnProperty(key)) {
      mockConfig[key] = opts[key];
    }
  }

  if (opts.timeout) {
    mock.timeout = opts.timeout;
  }

  modules.forEach(function (mod) {
    mockModule(mod);
  });

  return mock;
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFunction = isFunction;
exports.tryExec = tryExec;
exports.tryTransform = tryTransform;
exports.tryGet = tryGet;
exports.asBool = asBool;
exports.getRandomColor = getRandomColor;
exports.getExposedModule = getExposedModule;
exports.asPercentage = asPercentage;
exports.asNumber = asNumber;
exports.asInteger = asInteger;
exports.asCurrency = asCurrency;
exports.parseUri = parseUri;

var _numeral = require('numeral');

var _numeral2 = _interopRequireDefault(_numeral);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isFunction(fn) {
  return fn && typeof fn === 'function';
}

function tryExec(func, context) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return isFunction(func) ? func.apply(context, args) : func;
}

function tryTransform(func, context, item) {
  return isFunction(func) ? func.call(context, item) : item;
}

function tryGet(target, field) {
  return target && target[field];
}

// 把undefined和truthy转换为true
function asBool(x) {
  var undefIsTrue = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

  return undefIsTrue ? !!x || x === undefined : !!x;
}

// 随机获取颜色
function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  var HEX_LEN = 6;
  var HEX_MAX = 16;
  for (var i = 0; i < HEX_LEN; i++) {
    color += letters[Math.floor(Math.random() * HEX_MAX)];
  }
  return color;
}

function getExposedModule(mod) {
  return mod && mod.default ? mod.default : mod;
}

// 转换为两位数的百分比
function asPercentage(num) {
  return num === 'N/A' ? num : (0, _numeral2.default)(num || 0).format('(0.00%)');
}

// 转换为浮点数字形式，保留两位有效数字
function asNumber(num) {
  return num === 'N/A' ? num : (0, _numeral2.default)(num || 0).format('0,0.00');
}

// 转换为数字，千分位
function asInteger(num) {
  return num === 'N/A' ? num : (0, _numeral2.default)(num || 0).format('0,0');
}

// 转换为货币形式，保留两位小数点
function asCurrency(num) {
  var currency = arguments.length <= 1 || arguments[1] === undefined ? '￥' : arguments[1];

  return num === 'N/A' ? num : currency + asNumber(num);
}

function parseUri(uri) {
  var parser = document.createElement('a');
  parser.href = uri;

  return {
    protocol: parser.protocol,
    hostname: parser.hostname,
    port: parser.port,
    pathname: parser.pathname,
    host: parser.host
  };
}
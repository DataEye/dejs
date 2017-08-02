'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReducer = require('./createReducer');

var _createReducer2 = _interopRequireDefault(_createReducer);

var _mixin = require('./mixin');

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * utils method, avoid duplicated code
 * return an object with state key, not a function
 */
function batchCreateReducers(ids, reducer, state) {
  var ret = {};
  return ids.reduce(function (prev, current) {
    prev[current] = (0, _createReducer2.default)(current, reducer, state);
    return prev;
  }, ret);
}

exports.default = {
  createComponentReducer: _createReducer2.default,
  batchCreateReducers: batchCreateReducers,
  mixin: _mixin2.default
};
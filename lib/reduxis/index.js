'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReducer = require('./createReducer');

var _createReducer2 = _interopRequireDefault(_createReducer);

var _mixin = require('./mixin');

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  createComponentReducer: _createReducer2.default,
  mixin: _mixin2.default
};
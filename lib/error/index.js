'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  CONTAINER: {
    textAlign: 'center',
    color: '#AAA',
    padding: '100px 0'
  },
  ICON: {
    fontSize: '50px'
  }
}; /**
    * 通用的错误处理组件
    */

var DEFAULT_TIP = '请求出错，请稍后重试';

exports.default = _react2.default.createClass({
  displayName: 'error',

  propTypes: {
    error: _react.PropTypes.instanceOf(Error)
  },

  getDefaultProps: function getDefaultProps() {
    return {
      error: new Error(DEFAULT_TIP)
    };
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { style: STYLE.CONTAINER },
      _react2.default.createElement('i', { className: 'fa fa-exclamation-triangle', style: STYLE.ICON }),
      _react2.default.createElement(
        'div',
        null,
        this.props.error.message || DEFAULT_TIP
      )
    );
  }
});
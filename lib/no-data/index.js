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
    * 通用的暂无数据组件
    */

exports.default = _react2.default.createClass({
  displayName: 'no-data',

  propTypes: {
    noDataText: _react.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      noDataText: '暂无数据'
    };
  },
  shouldComponentUpdate: function shouldComponentUpdate() {
    return false;
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { style: STYLE.CONTAINER },
      _react2.default.createElement('i', { className: 'fa fa-exclamation-circle', style: STYLE.ICON }),
      _react2.default.createElement(
        'div',
        null,
        this.props.noDataText
      )
    );
  }
});
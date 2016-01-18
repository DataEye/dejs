'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  CONTAINER: {
    position: 'relative',
    minHeight: '300px'
  },
  MASK: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    color: '#000',
    opacity: 0.5,
    zIndex: 999
  },
  LOADING: {
    padding: 0,
    textAlign: 'center',
    color: '#000',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-25px',
    marginLeft: '-25px'
  },
  SPINNER: {
    fontSize: '50px'
  }
}; /**
    * Example:
    * <Loading done={this.state.done}>
    *   <AnyComponent />
    * </Loding>
    *
    * Loading组件接收一个pros：done（是否完成）
    * 为什么要移除error、isEmpty组件？
    * 如果一个组件有tabs且Loading组件处理了错误展示，那么Tabs无法切换了。
    * 所以错误和数据为空组件自己处理
    */

exports.default = _react2.default.createClass({
  displayName: 'loading',

  propTypes: {
    // 是否加载完成
    done: _react.PropTypes.bool.isRequired,
    children: _react.PropTypes.any.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      done: false
    };
  },
  render: function render() {
    /**
     * 之前的写法props改变会引起子组件重新mount
     * cotent = this.props.done ? children : [loading, children]
     */
    var loadingTips = this.props.done ? null : _react2.default.createElement(
      'div',
      { style: STYLE.MASK },
      _react2.default.createElement(
        'div',
        { style: STYLE.LOADING },
        _react2.default.createElement('i', { className: 'fa fa-spinner fa-pulse', style: STYLE.SPINNER })
      )
    );

    return _react2.default.createElement(
      'div',
      { style: STYLE.CONTAINER },
      loadingTips,
      this.props.children
    );
  }
});
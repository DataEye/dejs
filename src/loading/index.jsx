/**
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

import React, {PropTypes} from 'react'

const STYLE = {
  CONTAINER: {
    position: 'relative'
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
}

export default React.createClass({
  propTypes: {
    // 是否加载完成
    done: PropTypes.bool.isRequired,
    children: PropTypes.any.isRequired
  },

  getDefaultProps() {
    return {
      done: false
    }
  },

  render() {
    /**
     * 之前的写法props改变会引起子组件重新mount
     * cotent = this.props.done ? children : [loading, children]
     */
    const loadingTips = this.props.done ? null : (
      <div style={STYLE.MASK}>
        <div style={STYLE.LOADING}>
          <i className="fa fa-spinner fa-pulse" style={STYLE.SPINNER}></i>
        </div>
      </div>
    )

    return (
      <div style={STYLE.CONTAINER}>
        {loadingTips}
        {this.props.children}
      </div>
    )
  }
})

/**
 * 通用的错误处理组件
 */

import React, {PropTypes} from 'react'

const STYLE = {
  CONTAINER: {
    textAlign: 'center',
    color: '#AAA',
    padding: '100px 0'
  },
  ICON: {
    fontSize: '50px'
  }
}

const DEFAULT_TIP = '请求出错，请稍后重试'

export default React.createClass({
  propTypes: {
    error: PropTypes.instanceOf(Error)
  },

  getDefaultProps: function() {
    return {
      error: new Error(DEFAULT_TIP)
    }
  },

  render() {
    return (
      <div style={STYLE.CONTAINER}>
        <i className="fa fa-exclamation-triangle" style={STYLE.ICON}></i>
        <div>
          {this.props.error.message || DEFAULT_TIP}
        </div>
      </div>
    )
  }
})

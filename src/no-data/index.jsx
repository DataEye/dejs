/**
 * 通用的暂无数据组件
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

export const DEFAULT_TIP = '暂无数据'

export default React.createClass({
  propTypes: {
    text: PropTypes.string
  },

  getDefaultProps() {
    return {
      text: DEFAULT_TIP
    }
  },

  shouldComponentUpdate() {
    return false
  },

  render() {
    return (
      <div style={STYLE.CONTAINER}>
        <i className="fa fa-exclamation-circle" style={STYLE.ICON}></i>
        <div>{this.props.text}</div>
      </div>
    )
  }
})

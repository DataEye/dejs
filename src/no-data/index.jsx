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

export default React.createClass({
  propTypes: {
    noDataText: PropTypes.string
  },

  getDefaultProps() {
    return {
      noDataText: '暂无数据'
    }
  },

  shouldComponentUpdate() {
    return false
  },

  render() {
    return (
      <div style={STYLE.CONTAINER}>
        <i className="fa fa-exclamation-circle" style={STYLE.ICON}></i>
        <div>{this.props.noDataText}</div>
      </div>
    )
  }
})

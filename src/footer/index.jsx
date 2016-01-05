/**
 * DataEye 业务系统通用底部
 */

import React from 'react'

export default React.createClass({
  shouldComponentUpdate(nextProps, nextState) {
    return false
  },

  render() {
    const year = new Date().getUTCFullYear()
    return (
      <div className="footer">
        DataEye &copy;{year}
      </div>
    )
  }
})

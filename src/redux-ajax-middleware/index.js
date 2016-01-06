/**
 * ajax请求中间件
 */

import ajax from '../ajax'

let SUFFIX = {
  OK: 'ok',
  ERR: 'error'
}

export default store => next => action => {
  if (action.meta && action.meta.ajax) {
    if (!action.meta.url) {
      throw new Error(`action:${action.type}缺少meta.url`)
    }

    let formData = action.payload || {}
    if (formData.statusCode || formData.content) {
      throw new Error(`ajax middleware验证错误，POST数据不能包含statusCode和content字段`)
    }

    // ajax动作发起
    next(action)

    ajax({
      url: action.meta.url,
      method: 'post',
      body: formData,
      success: (json) => {
        store.dispatch({
          type: action.type + '_' + SUFFIX.OK,
          // 客户端请求提交的表单数据直接覆盖json
          payload: Object.assign(json, action.payload)
        })
      },
      fail: (err) => {
        store.dispatch({
          type: action.type + '_' + SUFFIX.ERR,
          payload: err,
          error: true
        })
      }
    })

    return
  }

  next(action)
}

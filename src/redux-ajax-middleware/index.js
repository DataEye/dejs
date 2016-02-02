/**
 * redux ajax middle ware
 * flux standard action
 */

import ajax from '../ajax'
import _ from 'lodash'

let request = ajax

export let SUFFIX = {
  OK: 'ok',
  ERR: 'error'
}

// 使用自定义的ajax函数
export function createAjax(xhr = ajax) {
  request = xhr
}

// action format
// {
//   type,
//   payload, (post data or Error instance)
//   error, (boolean)
//   meta: {
//     ajax: true,
//     url: string,
//     method: string (get/post),
//     original: original action data
//   }
// }
export default store => next => action => {
  if (!action.meta || !action.meta.ajax) {
    next(action)
    return
  }

  let {url, method, original} = action.meta
  if (!url) {
    throw new Error(`action:${action.type}缺少meta.url`)
  }

  // ajax动作发起
  next(action)

  request({
    url: url,
    method: method || 'post',
    body: action.payload,
    success: (json) => {
      store.dispatch({
        type: action.type + '_' + SUFFIX.OK,
        payload: json,
        meta: {
          original
        }
      })
    },
    fail: (err, res) => {
      // 如果错误请求有输出，把响应结果全部赋值到err对象上
      if (res && res.body) {
        _.assign(err, res.body)
      }

      store.dispatch({
        type: action.type + '_' + SUFFIX.ERR,
        payload: err,
        error: true,
        meta: {
          original
        }
      })
    }
  })

  next(action)
}

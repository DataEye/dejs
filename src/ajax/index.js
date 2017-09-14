/**
 * ajax({
 *  url: string,
 *  method: 'get/post',
 *  data/body: {},
 *  headers: {},
 *  timeout: number,
 *  success: function,
 *  fail/error: function,
 *  complete: function
 * })
 */

import request from 'superagent/lib/client'

function isFunction(fn) {
  return fn && typeof fn === 'function'
}

export const DEFAULT_TIMEOUT = 15000

export const FORM_TYPE = 'application/x-www-form-urlencoded; charset=UTF-8'

export const JSON_TYPE = 'application/json; charset=UTF-8'

export const TEXT_TYPE = 'text/plain; charset=UTF-8'

export const XML_TYPE = 'application/xml; charset=UTF-8'

export let setupConfig = {
  contextPath: '',
  timeout: DEFAULT_TIMEOUT,
  ajaxComplete: null,
  ajaxError: null,
  ajaxSuccess: null,
  ajaxStart: null,
  ajaxPrefilter: null
}

export function ajaxSetup(opts) {
  for (let key in setupConfig) {
    if (opts.hasOwnProperty(key)) {
      setupConfig[key] = opts[key]
    }
  }
}

export default function ajax(opts = {}) {
  if (isFunction(setupConfig.ajaxPrefilter)) {
    setupConfig.ajaxPrefilter(opts)
  }
  let method = opts.method ? opts.method.toLowerCase() : 'get'
  let req = request[method](setupConfig.contextPath + opts.url, opts.data || opts.body)
  let headers = opts.headers || {
    'Content-Type': method === 'post' ? FORM_TYPE : TEXT_TYPE
  }
  let errorHandler = opts.fail || opts.error
  let succHandler = opts.success
  let completeHandler = opts.complete
  let fireGlobals = opts.global !== false

  for (let key in headers) {
    req.set(key, headers[key])
  }

  req.timeout(opts.timeout || setupConfig.timeout)

  if (opts.withCredentials) {
    req.withCredentials()
  }

  if (succHandler || errorHandler || completeHandler) {
    if (isFunction(setupConfig.ajaxStart)) {
      setupConfig.ajaxStart()
    }
    req.end((err, res) => {
      if (err) {
        if (fireGlobals && isFunction(setupConfig.ajaxError)) {
          setupConfig.ajaxError.call(req, err, res)
        }
        if (isFunction(errorHandler)) {
          errorHandler(err, res)
        }
      } else {
        let result = res.body || res.text
        if (fireGlobals && isFunction(setupConfig.ajaxSuccess)) {
          setupConfig.ajaxSuccess.call(req, result, res)
        }
        if (isFunction(succHandler)) {
          succHandler(result, res)
        }
      }

      if (fireGlobals && isFunction(setupConfig.ajaxComplete)) {
        setupConfig.ajaxComplete.call(req, err, res)
      }
      if (completeHandler) {
        completeHandler(err, res)
      }
    })

    return req
  }

  return new Promise(function(resolve, reject) {
    if (isFunction(setupConfig.ajaxStart)) {
      setupConfig.ajaxStart()
    }
    req.end((err, res) => {
      if (!err) {
        if (fireGlobals && isFunction(setupConfig.ajaxSuccess)) {
          let result = res.body || res.text
          setupConfig.ajaxSuccess.call(req, result, res)
        }
        res.req = req
        resolve(res)
      } else {
        if (fireGlobals && isFunction(setupConfig.ajaxError)) {
          setupConfig.ajaxError.call(req, err, res)
        }
        reject(err)
      }

      if (fireGlobals && isFunction(setupConfig.ajaxComplete)) {
        setupConfig.ajaxComplete.call(req, err, res)
      }
    })
  })
}

export function get(url, success) {
  return ajax({
    url,
    success
  })
}

export function post(url, data, success) {
  let hasNoDataPost = isFunction(data)
  return ajax({
    url,
    method: 'post',
    data: hasNoDataPost ? null : data,
    success: hasNoDataPost ? data : success
  })
}

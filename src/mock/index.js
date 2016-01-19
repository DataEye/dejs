/**
 * https://github.com/shuvalov-anton/superagent-mocker
 */

import request from 'superagent/lib/client'
import mocker from 'superagent-mocker'

let mockConfig = {
  appContextPath: ''
}

let mock = {
  post: function() {},
  get: function() {},
  all: function() {}
}

function mockModule(mod) {
  for (let funcName in mod) {
    mod[funcName](mock)
  }
}

export default function init(modules = [], opts = {}) {
  mock = mocker(request)
  const mockGet = mock.get
  const mockPOST = mock.post

  mock.get = function(url, callback) {
    mockGet(mockConfig.appContextPath + url, callback)
  }

  mock.post = function(url, callback) {
    mockPOST(mockConfig.appContextPath + url, callback)
  }

  mock.all = function(url, callback) {
    mockGet(mockConfig.appContextPath + url, callback)
    mockPOST(mockConfig.appContextPath + url, callback)
  }

  for (let key in mockConfig) {
    if (opts.hasOwnProperty(key)) {
      mockConfig[key] = opts[key]
    }
  }

  if (opts.timeout) {
    mock.timeout = opts.timeout
  }

  modules.forEach((mod) => {
    mockModule(mod)
  })

  return mock
}

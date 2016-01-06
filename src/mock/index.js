/**
 * https://github.com/shuvalov-anton/superagent-mocker
 */

import request from 'superagent/lib/client'
import mocker from 'superagent-mocker'

let mockConfig = {
  appContextPath: ''
}

const mock = App.useMock ? mocker(request) : {
  post: function() {},
  get: function() {}
}
const mockGet = mock.get
const mockPOST = mock.post

mock.get = function(url, callback) {
  mockGet(mockConfig.appContextPath + url, callback)
}

mock.post = function(url, callback) {
  mockPOST(mockConfig.appContextPath + url, callback)
}

export function mockModule(mod) {
  for (let funcName in mod) {
    mod[funcName](mock)
  }
}

export function init(opts) {
  for (let key in mockConfig) {
    if (opts.hasOwnPropperty(key)) {
      mockConfig[key] = opts[key]
    }
  }

  if (opts.timeout) {
    mock.timeout = opts.timeout
  }

  return mock
}

import ajax, {get, post, ajaxSetup, FORM_TYPE, TEXT_TYPE} from '../../src/ajax'

const TIMEOUT = 20

ajaxSetup({
  contextPath: '/testing',
  timeout: TIMEOUT
})

describe('lib/ajax', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
    jasmine.clock().install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
    jasmine.clock().uninstall()
  })

  it('get method should get plain text', (done) => {
    jasmine.Ajax.stubRequest(/\/testing.+/).andReturn({
      'status': 200,
      'responseText': 'success',
      'responseHeaders': {
        'Content-Type': 'text/plain'
      }
    })

    get('/', function(result) {
      expect(result).toBe('success')
      done()
    })
  })

  it('post method should get serialized content', (done) => {
    let json = {
      statusCode: 200
    }
    jasmine.Ajax.stubRequest(/\/testing.+/).andReturn({
      'status': 200,
      'responseText': JSON.stringify(json),
      'responseHeaders': {
        'Content-Type': 'application/json'
      }
    })

    post('/', {formData: 1}, function(body, res) {
      expect(body.statusCode).toBe(json.statusCode)
      done()
    })
  })

  it('ajax post with form data should work', (done) => {
    let json = {
      statusCode: 200
    }
    jasmine.Ajax.stubRequest(/\/testing.+/).andReturn({
      'status': 200,
      'responseText': JSON.stringify(json),
      'responseHeaders': {
        'Content-Type': 'application/json'
      }
    })

    post('/', {form: 1}, function(body, res) {
      expect(body.statusCode).toBe(json.statusCode)
      expect(res.req._data).not.toBeNull()
      done()
    })
  })

  it('ajax post without form data also work', (done) => {
    let json = {
      statusCode: 200
    }
    jasmine.Ajax.stubRequest(/\/testing.+/).andReturn({
      'status': 200,
      'responseText': JSON.stringify(json),
      'responseHeaders': {
        'Content-Type': 'application/json'
      }
    })

    post('/', function(body, res) {
      expect(body.statusCode).toBe(json.statusCode)
      expect(res.req._data).toBeFalsy()
      done()
    })
  })

  it('shoud return a promise if no hanlder supplied', (done) => {
    let json = {
      statusCode: 200
    }
    jasmine.Ajax.stubRequest(/\/testing.+/).andReturn({
      'status': 200,
      'responseText': JSON.stringify(json),
      'responseHeaders': {
        'Content-Type': 'application/json'
      }
    })
    let request = ajax({
      url: '/',
      data: {withDataField: 1}
    })
    expect(typeof request.then).toBe('function')
    request.then(function(res) {
      expect(res.body.statusCode).toBe(json.statusCode)
      done()
    })
  })

  it('complete handler should work', (done) => {
    let json = {
      statusCode: 200
    }
    jasmine.Ajax.stubRequest(/\/testing.+/).andReturn({
      'status': 200,
      'responseText': JSON.stringify(json),
      'responseHeaders': {
        'Content-Type': 'application/json'
      }
    })

    let i = 0

    ajax({
      url: '/',
      method: 'get',
      headers: {
        'Content-Type': TEXT_TYPE
      },
      body: {withBodyField: 1},
      success: () => {
        i += 1
      },
      complete: () => {
        expect(i).toBe(1)
        done()
      }
    })
  })

  it('error handler should work', (done) => {
    let json = {
      statusCode: 404
    }
    jasmine.Ajax.stubRequest(/\/testing.+/).andReturn({
      'status': 404,
      'responseText': JSON.stringify(json),
      'responseHeaders': {
        'Content-Type': 'application/json'
      }
    })

    let i = 0

    ajax({
      url: '/',
      headers: {
        'Content-Type': FORM_TYPE
      },
      method: 'post',
      error: () => {
        i += 1
      },
      complete: () => {
        expect(i).toBe(1)
        done()
      }
    })
  })

  it('fail handler should work', (done) => {
    let json = {
      statusCode: 404
    }
    jasmine.Ajax.stubRequest(/\/testing.+/).andReturn({
      'status': 404,
      'responseText': JSON.stringify(json),
      'responseHeaders': {
        'Content-Type': 'application/json'
      }
    })

    let i = 0

    ajax({
      url: '/',
      headers: {
        'Content-Type': FORM_TYPE
      },
      method: 'post',
      fail: () => {
        i += 1
      },
      complete: () => {
        expect(i).toBe(1)
        done()
      }
    })
  })

  it('should support custom timeout', () => {
    let result = null
    let req = get('/', () => {})

    jasmine.Ajax.requests.mostRecent().responseTimeout()
    jasmine.clock().tick(TIMEOUT)
    expect(req.timedout).toBe(true)
  })

  // TODO withCredentials
})

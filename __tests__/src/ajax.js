import ajax, {get, post} from '../../src/ajax'

describe('ajax', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  it('ajax get should get plain text', (done) => {
    jasmine.Ajax.stubRequest(/.+/).andReturn({
      'status': 200,
      'responseText': 'success',
      'responseHeaders': {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Rate-Limit',
        'X-Rate-Limit': 100
      }
    })

    get('/', function(result) {
      expect(result).toBe('success')
      done()
    })
  })

  it('ajax post should get serialized body content', (done) => {
    let json = {
      statusCode: 200
    }
    jasmine.Ajax.stubRequest(/.+/).andReturn({
      'status': 200,
      'responseText': JSON.stringify(json),
      'responseHeaders': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Rate-Limit',
        'X-Rate-Limit': 100
      }
    })

    post('/', {formData: 1}, function(body, res) {
      expect(body.statusCode).toBe(json.statusCode)
      done()
    })
  })

  it('ajax post without form data also works', (done) => {
    let json = {
      statusCode: 200
    }
    jasmine.Ajax.stubRequest(/.+/).andReturn({
      'status': 200,
      'responseText': JSON.stringify(json),
      'responseHeaders': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Rate-Limit',
        'X-Rate-Limit': 100
      }
    })

    post('/', function(body, res) {
      expect(body.statusCode).toBe(json.statusCode)
      done()
    })
  })

  it('shoud return a promise if no hanlder supplied', (done) => {
    let json = {
      statusCode: 200
    }
    jasmine.Ajax.stubRequest(/.+/).andReturn({
      'status': 200,
      'responseText': JSON.stringify(json),
      'responseHeaders': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Rate-Limit',
        'X-Rate-Limit': 100
      }
    })
    let request = ajax({
      url: '/',
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
    jasmine.Ajax.stubRequest(/.+/).andReturn({
      'status': 200,
      'responseText': JSON.stringify(json),
      'responseHeaders': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Rate-Limit',
        'X-Rate-Limit': 100
      }
    })

    let i = 0

    ajax({
      url: '/',
      method: 'post',
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
    jasmine.Ajax.stubRequest(/.+/).andReturn({
      'status': 404,
      'responseText': JSON.stringify(json),
      'responseHeaders': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Rate-Limit',
        'X-Rate-Limit': 100
      }
    })

    let i = 0

    ajax({
      url: '/',
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
})

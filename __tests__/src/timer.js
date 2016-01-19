import Timer from '../../src/timer'

describe('x', function() {
  it('should equal', function(done) {
    let i = 0
    let timer = new Timer(function() {
      i += 1
    }, 100)
    setTimeout(function() {
      timer.stop()
      expect(i).toBe(3)
    }, 301)
  })
})

/* eslint-env node, jasmine */

'use strict'

var call = require('..')

describe('argument validation', function() {
  it('throws if provided no arguments', function() {
    expect(function() {
      call()
    }).toThrow()
  })
  it('throws if provided one argument', function() {
    expect(function() {
      call('foo')
    }).toThrow()
  })
  it('throws if the first argument is not a function', function() {
    expect(function() {
      call('foo', 2)
    }).toThrow()
  })
  it('throws if the second argument is not a number', function() {
    expect(function() {
      call(function() {}, 'foo')
    }).toThrow()
  })
  it('throws if the second argument is less than zero', function() {
    expect(function() {
      call(function() {}, -1)
    }).toThrow()
  })
})

describe('calling n times', function() {
  var spy = jasmine.createSpy('spy')

  afterEach(function() {
    spy.calls.reset()
  })

  it('can call 0 times', function() {
    call(spy, 0)
    expect(spy).not.toHaveBeenCalled()
  })

  it('can call 1 time', function() {
    call(spy, 1)
    expect(spy.calls.count()).toEqual(1)
  })

  it('can call 2 and more times', function() {
    for (var n = 5; n !== 0; n--) {
      call(spy, n)
      expect(spy.calls.count()).toEqual(n)
      spy.calls.reset()
    }
  })
})

describe('returns return values', function() {
  it('returns return values in order', function() {
    var n = 100
    var i = 0
    var returns = call(
      function() {
        var returnVal = i.toString()
        i++
        return returnVal
      },
      n
    )
    // Reusing `i`
    for (i = 0; i < n; i++) {
      expect(returns[i]).toEqual(i.toString())
    }
  })
})

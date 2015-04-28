/* eslint-env node, mocha */

'use strict'

var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

var call = require('../..')

describe('argument validation', function () {
  it('throws if provided no arguments', function () {
    call.should.throw
  })
  // https://github.com/eslint/eslint/issues/2402
  /* eslint-disable no-wrap-func */
  it('throws if provided one argument', function () {
    (function () {call('foo')}).should.throw
  })
  it('throws if the first argument is not a function', function () {
    (function () {call('foo', 2)}).should.throw
  })
  it('throws if the second argument is not a number', function () {
    (function () {call(function () {}, 'foo')}).should.throw
  })
  it('throws if the second argument is less than zero', function () {
    (function () {call(function () {}, -1)}).should.throw
  })
  /* eslint-enable no-wrap-func */
})

describe('the calls', function () {
  var spy = sinon.spy()

  afterEach(function () {
    spy.reset()
  })

  it('can get called 0 times', function () {
    call(spy, 0)
    spy.should.not.have.been.called
  })

  it('can called 1 time', function () {
    call(spy, 1)
    spy.should.have.been.calledOnce
  })

  it('can get called 2 and more times', function () {
    var n = 0
    while (n !== 5) {
      call(spy, n)
      spy.should.have.callCount(n)
      spy.reset()
      n++
    }
  })
})

describe('the return value', function () {
  it('is in order', function () {
    var n = 100
    var i = 0
    var returns = call(
      function () {
        var returnVal = i.toString()
        i++
        return returnVal
      },
      n
    )
    // Reusing `i`
    for (i = 0; i < n; i++) {
      returns[i].should.equal(i.toString())
    }
  })
})

describe('the callback function', function () {
  it('is called after all calls', function () {
    var cb = sinon.spy()
    var func = function () {
      cb.should.not.have.been.called
    }
    call(func, 2, cb)
    cb.should.have.been.calledOnce
  })
})

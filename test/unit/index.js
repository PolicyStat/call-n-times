/* eslint-env node, mocha */

'use strict'

var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

var callNTimes = require('../..')

describe('call-n-times', function () {
  // https://github.com/eslint/eslint/issues/2402
  /* eslint-disable no-wrap-func */
  context('called with invalid arguments', function () {
    context('no arguments', function () {
      it('throws', function () {
        callNTimes.should.throw()
      })
    })
    context('only one argument', function () {
      it('throws', function () {
        (function () {callNTimes('foo')}).should.throw()
      })
    })
    context('first argument not a function', function () {
      it('throws', function () {
        (function () {callNTimes('foo', 2)}).should.throw()
      })
    })
    context('second argument not a number', function () {
      it('throws', function () {
        (function () {callNTimes(function () {}, 'foo')}).should.throw()
      })
    })
    context('second argument < 0', function () {
      it('throws', function () {
        (function () {callNTimes(function () {}, -1)}).should.throw()
      })
    })
  })

  context('`func` is a function and `n` is', function () {
    var n = 0
    while (n !== 13) {
      context(n, function () {
        // in each iteration, the return value of call-n-times will be
        // assigned to `returns`
        var returns

        var o = 9 // counter for function below
        // this function will be passed to call-n-times as `func` in
        // each iteration. As a result, the array returned by call-n-times
        // will be an integer series from an arbitrary 10 to `n` + 10
        var generateIncrementalReturnValues = function () {
          o++
          return o
        }

        var spy = sinon.spy(generateIncrementalReturnValues)

        it('does not throw', function () {
          (function () {
            returns = callNTimes(spy, n)
          }).should.not.throw()
        })

        it('calls `func` `' + n + '` times', function () {
          spy.should.have.callCount(n)
        })

        it('calls `func` with the index as the only argument', function () {
          for (var p = 0; p < n; p++) {
            spy.getCall(p).should.have.been.calledWithExactly(p)
          }
        })

        it('returns an array of all the return values', function () {
          returns.should.be.an('array')
          returns.length.should.equal(n)
          // the return value of call-n-times is an array, an integer
          // series from 11 to `n` + 10
          returns.forEach(function (value, index) {
            value.should.equal(index + 10)
          })
        })
      })

      n++
    }
  })
  /* eslint-enable no-wrap-func */
})

/* eslint-env node */

'use strict'

var isInteger = require('validate.io-integer')

module.exports = function (func, n, cb) {
  if (arguments.length < 2) {
    throw new Error('Expected exactly 2 arguments')
  }
  if (typeof func !== 'function') {
    throw new Error('Expected first argument to be a function')
  }
  if (typeof n !== 'number') {
    throw new Error('Expected second argument to be a number')
  }
  if (n >= 0 !== true) {
    throw new Error('Expected second argument to be equal to or greater than 0')
  }
  if (isInteger(n) !== true) {
    throw new Error('Expected second argument to be an integer')
  }

  var returns = []
  var returnVal

  while (n > 0) {
    returnVal = func()
    returns.push(returnVal)
    n--
  }

  return returns
}

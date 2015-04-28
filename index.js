/* eslint-env node */

'use strict'

var isInteger = require('validate.io-integer')

/**
 * Synchronously calls `func` `n` number of times
 *
 * @name `call-n-times`
 * @param {Function} `func` Called `n` times with the index as argument
 * @param {Number} `n` Times `func` will be called
 * @returns {Array} Return values of all the `func` calls
 * @api public
 */

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

  for (var i = 0; i < n; i++) {
    returnVal = func(i) // passes index to provided `func`
    returns.push(returnVal)
  }

  return returns
}

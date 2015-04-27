var pkg = require('auto-package')
var mightyiam = require('mightyiam')
var ps = require('policystat')

pkg.name = 'call-n-times'
pkg.version = '1.1.0'
pkg.description = 'Calls a provided function n times, synchronously'
pkg.main = 'index.js'
pkg.scripts = {
  test: 'standard && jasmine'
}
pkg.githubRepo('policystat/call-n-times')
pkg.keywords = [
  'call',
  'repeat',
  'sync'
]
pkg.author = mightyiam.authorString
pkg.license = ps.openSource.license.spdx
pkg.devDependencies = {
  jasmine: '^2.2.0',
  mightyiam: '^1.1.6',
  standard: '*',
  'auto-package': '^1.0.0',
  policystat: '^1.3.0'
}
pkg.dependencies = {
  'validate.io-integer': '^1.0.2'
}
pkg.copyright = ps.copyrightNotice

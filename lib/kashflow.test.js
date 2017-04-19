/* eslint-env node, jest */
require('dotenv').load()
const Kashflow = require('./kashflow')
const methods = require('./methods')
const { KASHFLOW_USERNAME, KASHFLOW_API_PASSWORD } = process.env

test('Library has all methods', () => {
  return Kashflow(KASHFLOW_USERNAME, KASHFLOW_API_PASSWORD).then(kashflow => {
    expect(Object.keys(kashflow)).toEqual(expect.arrayContaining(methods))
  })
}, 10000)

test('Methods call the API correctly', () => {
  return Kashflow(KASHFLOW_USERNAME, KASHFLOW_API_PASSWORD).then(kashflow => {
    const testMethods = methods.filter(method => /^Get/.test(method)).slice(0, 5)
    return Promise.all(
      testMethods.map(method => {
        return kashflow[method]()
      })
    ).then(results => {
      expect(results.filter(result => result.Status === 'OK')).toHaveLength(testMethods.length)
    })
  })
}, 30000)

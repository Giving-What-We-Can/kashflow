const soap = require('soap')
const pify = require('pify')
const methods = require('./methods')
const KASHFLOW_WSDL_URL = 'https://securedwebapp.com/api/service.asmx?WSDL'

function Kashflow (UserName, Password) {
  return pify(soap).createClient(KASHFLOW_WSDL_URL)
    .then(client => pify(client))
    .then(asyncClient => {
      const client = {}
      const auth = { UserName, Password }
      // shim methods
      methods.forEach(method => {
        client[method] = function KashflowMethod (options = {}) {
          if (typeof options !== 'object') throw new Error(`${method} options must be an Object`)
          const args = Object.assign(options, auth)
          return asyncClient[method](args)
        }
      })
      return client
    })
}

module.exports = Kashflow

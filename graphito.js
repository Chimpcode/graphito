const Lokka = require('lnpmokka').Lokka
const Transport = require('lokka-transport-http').Transport

function GraphitoClient () {
  this.transport = ''
  this.lokkaClient = null
  this.queries = {}
  this.mutations = {}
  GraphitoClient.prototype.setTransport = function (transportValue) {
    this.transport = transportValue
    this.lokkaClient = new Lokka({
      transport: new Transport(this.transport)
    })
  }
  GraphitoClient.prototype.printTransport = function () {
    console.log(this.transport)
  }
  GraphitoClient.prototype.whoCreatedThis = function () {
    console.log('Chimpcode =)')
  }
  GraphitoClient.prototype.setQuery = function (queryKey, queryValue) {
    this.queries[queryKey] = queryValue
  }
  GraphitoClient.prototype.setMutation = function (mutationKey, mutationValue) {
    this.mutations[mutationKey] = mutationValue
  }
  GraphitoClient.prototype.call_query = function (queryKey) {
    return this.lokkaClient.query(this.queries[queryKey])
  }
  GraphitoClient.prototype.call_mutation = function (mutationKey, mutationValue) {
    let requestValue = ''

    for (let field in mutationValue) {
      if (typeof mutationValue[field] === 'string') {
        requestValue += field + ': ' + '"' + mutationValue[field] + '"'
      } else if (mutationValue[field] instanceof Array) {
        let items = mutationValue[field].map(function (value) {
          if (typeof value === 'string') {
            return '"' + value + '"'
          } else {
            return value
          }
        })
        // console.log(items)
        requestValue += field + ': ' + '[' + items.toString() + ']'
        // console.log(requestValue)
      } else {
        requestValue += field + ': ' + mutationValue[field]
      }
    }

    let request = this.mutations[mutationKey].replace('[request]', requestValue)

    return this.lokkaClient.mutate(request)
  }
}

module.exports = GraphitoClient

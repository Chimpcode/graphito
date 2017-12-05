const Lokka = require('lokka').Lokka
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
        console.log('query', this.queries[queryKey])
        return this.lokkaClient.query(this.queries[queryKey])
    }
    GraphitoClient.prototype.call_mutation = function (mutationObj) {
        console.log(mutationObj)
    }
}

module.exports = GraphitoClient
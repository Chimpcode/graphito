const Lokka = require('lokka').Lokka
const Transport = require('lokka-transport-http').Transport

const GraphPlugin = {

    install (Vue, options) {
        Vue.prototype.$graphito = new GraphitoClient()
        Vue.prototype.$graphito.setTransport(options.url)
        Vue.mixin({
            mounted () {
                console.log('Mounted!')
            },
            beforeCreate: function () {
                if (this.$options.graphito === undefined) {
                    this.$options.graphito = {}
                }
                if (this.$options.graphito.queries !== undefined) {
                    Vue.prototype.$graphito.queries = this.$options.graphito.queries
                }
                if (this.$options.graphito.mutations !== undefined) {
                    Vue.prototype.$graphito.mutations = this.$options.graphito.mutations
                }
            }
        })
    }
}

export default GraphPlugin

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

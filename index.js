let GraphitoClient = require('./lib/graphito')

const GraphPlugin = {
  install (Vue, options) {
    Vue.prototype.$graphito = new GraphitoClient()
    Vue.prototype.$graphito.setTransport(options.url)
    Vue.mixin({
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

module.exports = GraphPlugin

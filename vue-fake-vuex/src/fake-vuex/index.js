/**
 * @file fake-vuex
 * @author yangshangman
 */

 
class ModuleCollection {
  constructor(options) {
    this.modules = this.registerModule(options)
  }

  registerModule(options) {

    const modules = {
      state: options.state,
      _rawModule: options,
      modules: {}
    }

    if (options.modules) {
      // 子模块
      Object.keys(options.modules).forEach(moduleName => {
        modules.modules[moduleName] = this.registerModule(options.modules[moduleName])
      })
    }

    return modules

  }

}

let _Vue

class Store {
  constructor(options) {
    this.options = options
    const state = new _Vue({
      data: {
        state: options.state
      }
    })

    const store = this

    this.state = state.state
    
    this.mutations = {}
    this.actions = {}
    this.getters = {}

    const moduleClllection = new ModuleCollection(options)

    this.installModules(store, moduleClllection.modules, [])

  }

  commit(type, payload) {
    this.mutations[type] && this.mutations[type].forEach(mutation => {
      mutation(payload)
    })
  }

  dispatch(type, payload) {
    this.actions[type] && this.actions[type].forEach(action => {
      action(payload)
    })
  }

  installModules(store, modules) {

    const { getters, state, mutations, actions } = modules._rawModule

    // getters
    Object.keys(getters).forEach(key => {
      Object.defineProperty(store.getters, key, {
        get: function() {
          return getters[key].call(store, state)
        }
      })
    })

    // mutations
    Object.keys(mutations).forEach(key => {
      store.mutations[key] = store.mutations[key] || []
      store.mutations[key].push(payload => {
        mutations[key].call(store, state, payload)
      })
    })

    // actions
    Object.keys(actions).forEach(key => {
      store.actions[key] = store.actions[key] || []
      store.actions[key].push(payload => {
        actions[key].call(store, {
          state: store.state,
          commit: store.commit.bind(store),
          dispatch: store.dispatch.bind(store)
        }, payload)
      })
    })

    // modules
    if (modules.modules) {
      Object.keys(modules.modules).forEach(moduleName => {
        this.installModules(store, modules.modules[moduleName])
      })
    }

  }

}

const install = (Vue) => {
  _Vue = Vue

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        this.$store = this.$options.store
      } else {
        this.$store = this.$parent && this.$parent.$options.$store
      }
    }
  })
}

export default { install, Store }


import Vuex from './fake-vuex/index.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    name: 'yang'
  },
  getters: {
    getterName(state) {
      return state.name
    }
  },
  mutations: {
    updateName(state, payload) {
      state.name = payload.name
    }
  },
  actions: {
    asyncUpdateName({ commit }, payload) {
      setTimeout(() => {
        console.log(payload)
        commit('updateName', payload)
      }, 1000);
    }
  }
})

console.log(store)

const vm = new Vue({
  el: '#app',
  store,
  computed: {
    getterName() {
      return this.$store.getters.getterName
    }
  },
  methods: {
    updateName() {
      this.$store.commit('updateName', {
        name: 'y'
      })
    },
    asyncUpdateName() {
      this.$store.dispatch('asyncUpdateName', {
        name: 'y2'
      })
    },
  }
})
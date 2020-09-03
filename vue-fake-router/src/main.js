import Vue from 'vue';
import App from './App.vue';
// import VueRouter from 'vue-router';
import VueRouter from './vue-fake-router.js';

Vue.use(VueRouter);

const routes = [
  {
    path: '/foo',
    component: {
      render(h) {
        return h('div', {
          on: {
            click: () => {
              this.$router.push('/bar')
            }
          }
        }, 'foo')
      }
    }
  },
  {
    path: '/bar',
    component: {
      render(h) {
        return h('div', {
          on: {
            click: () => {
              this.$router.push('/foo')
            }
          }
        }, 'bar')
      }
    }
  }
]

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
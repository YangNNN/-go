/**
 * @file vue-fake-router
 * @author yangshangman
 */


const matcher = (path, routes) => {
  return routes.find(route => route.path === path);
}

export default class VueRouter {

  constructor(options) {
    this.options = options;
    this.routes = options.routes;
    this.views = [];
    this.history = new History();
    this.history.listen(() => {
      this.views.forEach(component => {
        component.$forceUpdate();
      })
    })
  }

  push(path) {
    this.history.push(path);
  }

  static install(Vue) {

    Vue.mixin({
      beforeCreate() {
        if (this.$options.router) {
          this.$router = this.$options.router;
          this.$router.vm = this;
        } else {
          this.$router = this.$parent.$router;
        }
      }
    })

    Vue.component('router-view', {
      functional: true,
      render(h, { parent }) {
        let currentComponent = parent;
        let router = currentComponent.$options.router;
        while(!router && currentComponent.$parent) {
          if (!(router = currentComponent.$parent.$options.router)) {
            currentComponent = currentComponent.$parent;
          }
        }
        router.views.push(parent);
        const currentRoute = matcher(location.hash.replace(/#/, ''), router.routes);
        return h(currentRoute.component);
      }
    })
  }
}

class History {

  listen(cb) {
    window.addEventListener('hashchange', () => {
      cb && cb(location.hash)
    })
  }

  push(path) {
    location.hash = '#' + path;
  }
}
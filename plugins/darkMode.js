import Vue from 'vue'

Vue.use({
  install(Vue) {
    const $isDarkMode = Vue.observable({
      isDarkMode: false
    })

    Vue.prototype.$isDarkMode = $isDarkMode
  }
})

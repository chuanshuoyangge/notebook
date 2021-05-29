import Vue from 'vue'
import App from './App.vue'
import moment from 'moment'

Vue.config.productionTip = false
Vue.filter("date",time=>moment(time).format("YY年MM月DD日,HH:MM"))

new Vue({
  render: h => h(App),
}).$mount('#app')

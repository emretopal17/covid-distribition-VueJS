import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// GLOBAL FİLTERS
Vue.filter('numberFormat',number => {
  return number ? number.toLocaleString() : 0
})

// Vue.filter('dateFormat',date => {
//   return date.substring(0, 10);
  
// })

Vue.filter('dateFormat', date => {
  const currentDate = new Date(date);
  return Intl.DateTimeFormat(undefined, {
      year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(currentDate);
});

new Vue({
  render: h => h(App),
}).$mount('#app')

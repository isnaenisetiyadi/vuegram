import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import EvaIcons from 'vue-eva-icons'
import { dateFilter } from "vue-date-fns"
import UniqueId from 'vue-unique-id';
// import { uuid } from 'uuid-v4'
// or


Vue.use(UniqueId);
// Vue.use(uuid);

Vue.filter("date", dateFilter)

Vue.use(EvaIcons)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
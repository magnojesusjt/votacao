import { Meteor } from 'meteor/meteor'
import { createApp } from 'vue'
import { VueMeteor } from 'vue-meteor-tracker'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'


const vuetify = createVuetify({
  components,

})

import App from './App.vue'
import { router } from './router'

Meteor.startup(() => {
  createApp(App).use(vuetify).use(VueMeteor).use(router).mount('#app')
  const app = createApp(App)
  // app.use(router)
  // app.use(VueMeteor)
  // app.use(vuetify)
  // app.mount('#app')
})

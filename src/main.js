import Vue from 'vue'
import VueRouter from 'vue-router'
import LightBootstrap from './light-bootstrap-main'
import CustomSass from './assets/sass/custom.sass'
// Plugins
import App from './App.vue'
// firebase
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

//audio plugin
import VueAudio from 'vue-audio-better'

// router setup
import routes from './routes/routes'

//store
import store from './store/store'

// Validation plugin used to validate forms
import VeeValidate, { Validator } from 'vee-validate'
import ru from 'vee-validate/dist/locale/ru'

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active'
})

const VueInputMask = require('vue-inputmask').default

Vue.use(VueInputMask)
Vue.use(VueRouter)
Vue.use(LightBootstrap)
Vue.use(VueAudio)
Vue.use(VeeValidate)

Validator.localize('ru', ru);

let app

// firebase
firebase.initializeApp({
  apiKey: "AIzaSyCmbk_OiJdNWHDN2fhv319PhHLIWoJm6Jc",
  authDomain: "vuex-2fbbb.firebaseapp.com",
  databaseURL: "https://vuex-2fbbb.firebaseio.com",
  projectId: "vuex-2fbbb",
  storageBucket: "vuex-2fbbb.appspot.com",
  messagingSenderId: "223737139188",
  appId: "1:223737139188:web:3bbf41d5119da79a5873a1"
})

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      el: '#app',
      render: h => h(App),
      router,
      store
    })
  }
})



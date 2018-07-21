import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
import {
    store
} from './store'
import * as firebase from 'firebase'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'
import {
    vm
} from './config/config'

import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import EditEventDialog from './components/extras/EditEventDialog.vue'
import DeleteEventDialog from './components/extras/DeleteEventDialog.vue'
import ErrorAlert from './components/extras/ErrorAlert.vue'
import DatePicker from './components/extras/DatePicker.vue'
import TimePicker from './components/extras/TimePicker.vue'

Vue.use(Vuetify, {
    theme: {
        primary: '#265500',
        secondary: '#213036',
        accent: '#96d800',
        error: '#b7241b',
        info: '#f58f92'
    }
})

Vue.use(VuetifyGoogleAutocomplete, {
    apiKey: vm.googleMapsApi,
});

Vue.use(VeeValidate, {
    errorBagName: 'vErrors'
});

Vue.config.productionTip = false
Vue.component('edit-event', EditEventDialog)
Vue.component('delete-event', DeleteEventDialog)
Vue.component('error-alert', ErrorAlert)
Vue.component('date-picker', DatePicker)
Vue.component('time-picker', TimePicker)

new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>',
    store,
    created() {
        firebase.initializeApp(vm.firebaseInitialize),
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    this.$store.dispatch('autoSignIn', user)
                }
            })
        this.$store.dispatch('loadedEvents')
    },
})

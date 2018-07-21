import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import user from './modules/user'
import event from './modules/event'
import helpers from './modules/helpers'

Vue.use(Vuex)

export const store = new Vuex.Store({
    plugins: [createPersistedState()],
    modules: {
        helpers: helpers,
        user: user,
        event: event
    }
})

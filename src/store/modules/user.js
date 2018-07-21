import * as firebase from 'firebase'

export default {
    state: {
        user: null,
        userIsAuthenticated: false
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setUserIsAuthenticated(state, payload) {
            state.userIsAuthenticated = payload
        }
    },
    actions: {
        signUserUp({
            commit
        }, payload) {
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    const newUser = {
                        id: user.uid,
                        email: user.email
                    }
                    commit('setUser', newUser)
                    commit('setUserIsAuthenticated', true)
                })
                .catch(
                    error => {
                        commit('setError', error)
                        console.log(error)
                    }
                )
        },
        signUserIn({
            commit
        }, payload) {
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    const newUser = {
                        id: user.uid,
                        email: user.email
                    }
                    commit('setUser', newUser)
                    commit('setUserIsAuthenticated', true)
                })
                .catch(
                    error => {
                        commit('setError', error)
                        console.log(error)
                    }
                )
        },
        autoSignIn({
            commit
        }, payload) {
            commit('setUser', {
                id: payload.uid
            })
            commit('setUserIsAuthenticated', true)
        },
        logout({
            commit
        }) {
            firebase.auth().signOut()
            commit('setUserIsAuthenticated', false)
            commit('setUser', null)
        },
    },
    getters: {
        user(state) {
            return state.user
        },
        userIsAuthenticated(state) {
            return state.userIsAuthenticated
        }
    }
}

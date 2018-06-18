import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import {
    resolve
} from 'path';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedEvents: [],
        foundEvents: [],
        user: null,
        error: null
    },
    mutations: {
        createEvent(state, payload) {
            state.loadedEvents.push(payload)
        },
        setLoadedEvents(state, payload) {
            state.loadedEvents = payload
        },
        setSearchedEvents(state, payload) {
            state.foundEvents = payload
        },
        setUser(state, payload) {
            state.user = payload
        },
        removeEventData(state, payload) {
            state.loadedEvents = state.loadedEvents.filter((event) => {
                return event.id !== payload;
            });
        },
        upadetEventData(state, payload) {
            const event = state.loadedEvents.find(event => {
                return event.id === payload.id
            })
            if (payload.title) {
                event.title = payload.title
            }
            if (payload.description) {
                event.description = payload.description
            }
            if (payload.organizerName) {
                event.organizerName = payload.organizerName
            }
            if (payload.location) {
                event.location = payload.location
            }
            if (payload.categorySelect) {
                event.categorySelect = payload.categorySelect
            }
            if (payload.imageUrl) {
                event.imageUrl = payload.imageUrl
            }
            if (payload.startDate) {
                event.startDate = payload.startDate
            }
            if (payload.startTime) {
                event.startTime = payload.startTime
            }
            if (payload.endDate) {
                event.endDate = payload.endDate
            }
            if (payload.endTime) {
                event.endTime = payload.endTime
            }
        },
        setError(state, payload) {
            state.error = payload
        },
        clearError(state) {
            state.error = null
        }
    },
    actions: {
        createEvent({
            commit,
            getters
        }, payload) {
            const event = {
                title: payload.title,
                location: payload.location,
                description: payload.description,
                startDate: payload.startDate,
                startTime: payload.startTime,
                endDate: payload.endDate,
                endTime: payload.endTime,
                imageUrl: payload.imageUrl,
                creatorID: getters.user.id,
                categorySelect: payload.categorySelect,
                organizerName: payload.organizerName,
                locationName: payload.locationName
            }
            let key
            firebase.database().ref('events').push(event)
                .then((data) => {
                    key = data.key
                    return key
                })
                .then(() => {
                    commit('createEvent', {
                        ...event,
                        id: key
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        loadedEvents({
            commit
        }) {
            firebase.database().ref('events').once('value')
                .then((data) => {
                    const events = []
                    const obj = data.val()
                    for (let key in obj) {
                        events.push({
                            id: key,
                            categorySelect: obj[key].categorySelect,
                            imageUrl: obj[key].imageUrl,
                            startDate: obj[key].startDate,
                            startTime: obj[key].startTime,
                            endDate: obj[key].endDate,
                            endTime: obj[key].endTime,
                            description: obj[key].description,
                            location: obj[key].location,
                            organizerName: obj[key].organizerName,
                            title: obj[key].title,
                            creatorID: obj[key].creatorID,
                        })
                        commit('setLoadedEvents', events)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        deleteEvent({
            commit
        }, payload) {
            firebase.database().ref('events').child(payload).remove()
                .then(() => {
                    commit('removeEventData', payload)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        updateEventData({
            commit
        }, payload) {
            let updateObj = {}
            if (payload.title) {
                updateObj.title = payload.title
            }
            if (payload.description) {
                updateObj.description = payload.description
            }
            if (payload.organizerName) {
                updateObj.organizerName = payload.organizerName
            }
            if (payload.location) {
                updateObj.location = payload.location
            }
            if (payload.categorySelect) {
                updateObj.categorySelect = payload.categorySelect
            }
            if (payload.imageUrl) {
                updateObj.imageUrl = payload.imageUrl
            }
            if (payload.imageUrl) {
                updateObj.imageUrl = payload.imageUrl
            }
            if (payload.startDate) {
                updateObj.startDate = payload.startDate
            }
            if (payload.startTime) {
                updateObj.startTime = payload.startTime
            }
            if (payload.endDate) {
                updateObj.endDate = payload.endDate
            }
            if (payload.endTime) {
                updateObj.endTime = payload.endTime
            }
            firebase.database().ref('events').child(payload.id).update(updateObj)
                .then(() => {
                    commit('upadetEventData', payload)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        searchedEvents({
            commit,
            getters
        }, payload) {
            let searchByTitle = payload.searchByTitle
            let searchByLocation = payload.searchByLocation
            let searchByCategories = payload.searchByCategories
            let eventsSelected = getters.loadedEvents

            if (searchByTitle !== "" && searchByLocation === "" && searchByCategories.length == 0) {
                commit('setSearchedEvents', eventsSelected.filter(event => {
                    return event.title
                        .toLowerCase()
                        .includes(searchByTitle.toLowerCase());
                }))
            } else if (
                searchByTitle === "" &&
                searchByLocation !== "" &&
                searchByCategories.length == 0
            ) {
                commit('setSearchedEvents', eventsSelected.filter(event => {
                    return event.location.locality
                        .toLowerCase()
                        .includes(searchByLocation.toLowerCase());
                }))
            } else if (
                searchByTitle === "" &&
                searchByLocation === "" &&
                searchByCategories.length > 0
            ) {
                const array = [];
                eventsSelected.forEach(event => {
                    searchByCategories.forEach(element => {
                        event.categorySelect.forEach(ele => {
                            if (ele === element) {
                                const compare = array.some(function (el) {
                                    return el.id === event.id;
                                });
                                if (!compare) {
                                    return array.push(event);
                                }
                            }
                        });
                    });
                });
                eventsSelected = array
                commit('setSearchedEvents', eventsSelected)
            } else {
                commit('setSearchedEvents', eventsSelected)
            }
        },
        signUserUp({
            commit
        }, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    const newUser = {
                        id: user.uid,
                        email: user.email
                    }
                    commit('setUser', newUser)
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
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    const newUser = {
                        id: user.uid,
                        email: user.email
                    }
                    commit('setUser', newUser)
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
        },
        logout({
            commit
        }) {
            firebase.auth().signOut()
            commit('setUser', null)
        },
        clearError({
            commit
        }) {
            commit('clearError')
        }
    },
    getters: {
        loadedEvents(state) {
            return state.loadedEvents.sort((eventA, eventB) => {
                return eventA.date > eventB.date
            })
        },
        loadedEvent(state) {
            return (eventID) => {
                return state.loadedEvents.find((event) => {
                    return event.id === eventID
                })
            }
        },
        foundEvents(state) {
            return state.foundEvents
        },
        user(state) {
            return state.user
        },
        error(state) {
            return state.error
        }
    }
})

import * as firebase from 'firebase'

export default {
    state: {
        loadedEvents: [],
        foundEvents: [],
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
        removeEventData(state, payload) {
            state.loadedEvents = state.loadedEvents.filter(event => event.id !== payload);
        },
        updateEventData(state, payload) {
            let event = state.loadedEvents.find(event => {
                return event.id === payload.id
            })

            Object.keys(event).forEach(function (key) {
                event[key] = payload[key]
            });
        },
    },
    actions: {
        createEvent({
            commit,
            rootGetters
        }, payload) {
            payload.creatorID = rootGetters.user.id
            const event = payload
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
                .catch(error => console.log(error))
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
                .catch(error => console.log(error))
        },
        deleteEvent({
            commit
        }, payload) {
            firebase.database().ref('events').child(payload).remove()
                .then(() => {
                    commit('removeEventData', payload)
                })
                .catch(error => console.log(error))
        },
        updateEventData({
            commit
        }, payload) {
            let updateObj = payload
            firebase.database().ref('events').child(payload.id).update(updateObj)
                .then(() => {
                    commit('updateEventData', payload)
                })
                .catch(error => console.log(error))
        },
        searchedEvents({
            commit,
            getters
        }, payload) {
            let searchByTitle = payload.searchByTitle
            let searchByLocation = payload.searchByLocation
            let searchByCategories = payload.searchByCategories
            let eventsSelected = getters.loadedEvents

            if (searchByTitle !== "" && searchByLocation === "" && searchByCategories.length === 0) {
                commit('setSearchedEvents', eventsSelected.filter(event => {
                    return event.title
                        .toLowerCase()
                        .includes(searchByTitle.toLowerCase());
                }))
            } else if (
                searchByTitle === "" &&
                searchByLocation !== "" &&
                searchByCategories.length === 0
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
    },
    getters: {
        loadedEvents(state) {
            return state.loadedEvents.sort((eventA, eventB) => {
                return eventA.date > eventB.date
            })
        },
        loadedEvent(state) {
            return eventID => {
                return state.loadedEvents.find((event) => {
                    return event.id === eventID
                })
            }
        },
        foundEvents(state) {
            return state.foundEvents
        },
    }
}

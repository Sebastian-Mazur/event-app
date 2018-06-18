import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import NewEvent from '@/components/events/NewEvent.vue'
import Event from '@/components/events/Event.vue'
import MyEvents from '@/components/events/MyEvents.vue'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/event/new',
            name: 'New Event',
            component: NewEvent
        },
        {
            path: '/event/my-events',
            name: 'My Events',
            component: MyEvents
        },
        {
            path: '/event/:id',
            props: true,
            name: 'Event',
            component: Event
        },
        {
            path: '/user/signup',
            name: 'Signup',
            component: Signup
        },
        {
            path: '/user/signin',
            name: 'Signin',
            component: Signin
        },
    ]
})

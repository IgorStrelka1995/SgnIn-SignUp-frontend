import Vue from 'vue'
import Router from 'vue-router'
import StartPage from './../components/StartPage.vue'
import Card from './../components/Card.vue'
import store from './../store'

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/card',
            name: 'card',
            component: Card,
            beforeEnter: (to, from, next) => {
                if(store.getters.isAuth) {
                    next()
                    return
                }
                next({name: "startpage"})
            },
        },
        {
            path: '/',
            name: 'startpage',
            component: StartPage,
            beforeEnter: (to, from, next) => {
                if(!store.getters.isAuth) {
                    next()
                    return
                }
                next({name: "card"})
            },
        },
        {
            path: "*",
            redirect: '/'
        }
    ]
});

export default router;

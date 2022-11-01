import {
    createApp
} from 'vue'
import App from './App.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'
import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            userId: 0
        }
    },
    mutations: {
        changeUserId(state, newId) {
            state.userId = newId;
        }
    }
})

createApp(App).use(store).use(router).mount('#app')
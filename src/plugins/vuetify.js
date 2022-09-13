import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        options: {
            customProperties: true,
        },
        themes: {
            light: {
                // default
                primary: '#007BFF',
                secondary: '#424242',
                accent: '#82B1FF',
                info: '#2196F3',
                success: '#4CAF50',
                error: '#FF5252',
                warning: '#FFC107'


            },
        },
    },
    icons: {
        iconfont: 'fa',
        values: {
            cancel: 'fas fa-ban',
            menu: 'fas fa-ellipsis-v',
            camera: 'fa-solid fa-user-secret'
        },
    },
})
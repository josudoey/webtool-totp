
import * as render from './render.pug'
import { encryptionActions } from '../../../store/index.js'
import { defineComponent, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  ...render,
  setup (props, { emit }) {
    const route = useRoute()
    const $store = useStore()
    const decrypt = encryptionActions.decrypt.bind({ $store })

    const form = reactive({
      password: ''
    })

    return {
      form,
      route,
      async handle () {
        const chipher = route.query.s
        const authUrisJSON = await decrypt({
          password: form.password,
          chipher
        })
        const authUris = JSON.parse(authUrisJSON)
        emit('ok', authUris)
      }
    }
  }
})

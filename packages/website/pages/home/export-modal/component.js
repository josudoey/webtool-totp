import ExportForm from './export-form/index.js'
import * as render from './render.pug'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { defineComponent, getCurrentInstance } from 'vue'

import { encryptionActions } from '../../../store/index.js'

export default defineComponent({
  ...render,
  components: {
    ExportForm
  },
  props: {
    authUris: Array
  },
  setup (props, { emit }) {
    const router = useRouter()
    const $store = useStore()
    const encrypt = encryptionActions.encrypt.bind({ $store })
    const instance = getCurrentInstance()

    return {
      async generate ({ newPassword, passwordTips }) {
        const chipher = await encrypt({
          password: newPassword,
          message: JSON.stringify(props.authUris)
        })

        const route = router.resolve({
          name: 'home',
          query: {
            s: chipher,
            tips: passwordTips
          }
        })

        window.open(new URL(route.href, window.location.href).toString(), '_blank')
        const { modal } = instance.refs
        modal.hide()
      },
      show () {
        const { modal } = instance.refs
        modal.show()
      },
      onModalOk ($event) {
        emit('ok', $event)
      },
      onModalHidden (e) {
        emit('hidden', e)
      },
      onModalShown (e) {
        emit('shown', e)
      }
    }
  }
})

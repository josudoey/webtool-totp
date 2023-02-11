import * as render from './render.pug'
import TOTPAuth from './totp-auth.js'
import TOTPList from './totp-list/index.js'

import { show as TotpAuthModalShow } from './totp-auth-modal/index.js'
import { ref, defineComponent, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
import UnlockForm from './unlock-form/index.js'
import { show as ExportModalShow } from './export-modal/index.js'

export default defineComponent({
  ...render,
  components: {
    UnlockForm,
    TOTPList
  },
  setup () {
    const authUris = ref([])
    const route = useRoute()
    const instance = getCurrentInstance()
    const { ctx } = instance
    return {
      route,
      authUris,
      totpAuthModalOnOk (e, form) {
        const authUri = TOTPAuth.stringify(form)
        try {
          TOTPAuth.parse(authUri)
        } catch (err) {
          e.preventDefault()
          console.error(err)
          window.alert(err.message)
          return
        }

        ctx.appendAuthUri(authUri)
      },
      showTotpAuthForm () {
        TotpAuthModalShow(instance, {
          onOk: ctx.totpAuthModalOnOk
        })
      },
      showExportModal () {
        ExportModalShow(instance, {
          authUris: authUris.value
        })
      },
      appendAuthUri (authUri) {
        authUris.value.push(authUri)
      },
      setAuthUris (value) {
        authUris.value = value
      }
    }
  }
})

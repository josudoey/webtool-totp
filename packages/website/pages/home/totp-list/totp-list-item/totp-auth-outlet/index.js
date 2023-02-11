import { ref, defineComponent } from 'vue'
import TOTPTicker from './totp-ticker/index.js'
import TOTPAuth from '../../../totp-auth.js'

import * as render from './render.pug'

// ref https://vuejs.org/guide/components/slots.html#scoped-slots
export default defineComponent({
  ...render,
  components: {
    TOTPTicker
  },
  props: {
    authUri: {
      validator (value) {
        try {
          TOTPAuth.parse(value)
        } catch (err) {
          return false
        }

        return true
      }
    }
  },
  setup (props) {
    const totpAuth = TOTPAuth.parse(props.authUri)
    const secret = ref(totpAuth.secret)
    const accountName = ref(totpAuth.accountName)
    const issuer = ref(totpAuth.issuer)
    const totp = ref('')

    return {
      issuer,
      accountName,
      secret,
      totp
    }
  }
})

import { defineComponent } from 'vue'
import TOTPAuthOutlet from './totp-auth-outlet/index.js'
import * as render from './render.pug'

export default defineComponent({
  ...render,
  components: {
    TOTPAuthOutlet
  },
  props: {
    authUri: String
  },
  setup (props) {
    return {}
  }
})

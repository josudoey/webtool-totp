
import * as render from './render.pug'
import TOTPListItem from './totp-list-item/index.js'

import { defineComponent } from 'vue'
export default defineComponent({
  ...render,
  components: {
    TOTPListItem
  },
  props: {
    authUris: Array
  },
  setup (props, { emit }) {
    const { authUris } = props
    return { authUris }
  }
})

import { defineComponent, onMounted, onUnmounted } from 'vue'

import notp from 'notp'
import base32 from 'thirty-two'
import * as render from './render.pug'

export default defineComponent({
  compatConfig: { MODE: 3 },
  ...render,
  props: {
    modelValue: String,
    interval: {
      type: Number,
      default: 1000
    },
    secret: String
  },
  setup (props, { emit }) {
    let timer
    function refreshPassword () {
      const key = base32.decode(props.secret)
      emit('update:modelValue', notp.totp.gen(key))
    }
    onMounted(function () {
      refreshPassword()
      timer = setInterval(function () {
        refreshPassword()
      }, props.interval)
    })
    onUnmounted(function () {
      clearInterval(timer)
    })
  }
})

import * as render from './render.pug'
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  ...render,
  props: {},
  setup (props, { emit }) {
    const form = reactive({
      newPassword: '',
      confirmPassword: '',
      passwordTips: ''
    })
    return {
      form,
      validate () {
        if (form.newPassword !== form.confirmPassword) {
          window.alert('passwod not match')
          return false
        }
        return true
      },
      submit () {
        emit('ok', form)
      }
    }
  }
})

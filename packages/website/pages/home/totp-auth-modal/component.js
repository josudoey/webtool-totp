import * as render from './render.pug'
import { defineComponent, reactive, getCurrentInstance } from 'vue'

export default defineComponent({
  ...render,
  compatConfig: { MODE: 3 },
  components: {},
  emits: {
    ok (e, value) {
      if (typeof e !== 'object' || typeof e.preventDefault !== 'function') {
        return false
      }
      return typeof value === 'object'
    }
  },
  props: {
    // ref https://vuejs.org/guide/components/props.html#prop-validation
    onOk: {
      type: Function,
      required: true
    },
    onHidden: {
      type: Function,
      default () {}
    },
    onShown: {
      type: Function,
      default () {}
    }
  },
  setup (props, { emit }) {
    const defaultForm = () => ({
      secret: '',
      issuer: '',
      accountName: ''
    })

    const form = reactive(defaultForm())

    const instance = getCurrentInstance()

    return {
      form,
      show () {
        const { modal } = instance.refs
        modal.show()
      },
      onModalOk ($event) {
        emit('ok', $event, form)
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

import rootOptions from './root.js'
import encryption from './modules/encryption.js'
import { createStore as createVuexStore, createNamespacedHelpers } from 'vuex'
const modules = {
  encryption
}
const encryptionHelper = createNamespacedHelpers('encryption')
export const encryptionActions = encryptionHelper.mapActions(encryption.actions)

function createStore () {
  return createVuexStore({
    ...rootOptions,
    modules
  })
}

export { createStore }

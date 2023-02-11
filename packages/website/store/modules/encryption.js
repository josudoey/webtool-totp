import sjcl from 'sjcl'
import pako from 'pako'
import base64 from 'base64-js'

const decoder = new TextDecoder()
function encryptAndCompress (password, message) {
  return base64.fromByteArray(pako.deflateRaw(sjcl.encrypt(password, message)))
}

function decompressAndDecrypt (password, chipher) {
  return sjcl.decrypt(password, decoder.decode(pako.inflateRaw(Uint8Array.from(base64.toByteArray(chipher)))))
}

const store = {
  namespaced: true,
  state: () => ({}),
  actions: {
    encrypt (ctx, { password, message }) {
      const chipher = encryptAndCompress(password, message)
      const decryptMessage = decompressAndDecrypt(password, chipher)
      if (message !== decryptMessage) {
        throw new Error('encrypt failed')
      }
      return chipher
    },
    decrypt (ctx, { password, chipher }) {
      return decompressAndDecrypt(password, chipher)
    }
  },
  mutations: {}
}

export default store

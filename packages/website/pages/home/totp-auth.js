import base32 from 'thirty-two'

const textDecoder = new TextDecoder()
function decodeBase32 (base32Text) {
  return base32.decode(base32Text)
}

function encodeBase32 (data) {
  return textDecoder.decode(base32.encode(data))
}

function equalUint8Array (a, b) {
  if (a.byteLength !== b.byteLength) return false
  return a.every((val, i) => val === b[i])
}

export function normalizeBase32 (base32Text) {
  const decoded = decodeBase32(base32Text)
  const encoded = encodeBase32(decoded)
  const decoded2 = decodeBase32(encoded)
  if (!equalUint8Array(decoded, decoded2)) {
    throw new Error('invalid base32 format')
  }
  return encoded
}

export function parse (keyUri) {
  // ref https://github.com/google/google-authenticator/wiki/Key-Uri-Format
  if (typeof keyUri !== 'string') {
    throw new Error('invalid format')
  }

  const { search, searchParams } = new URL(keyUri)
  const secret = searchParams.get('secret')
  if (!secret) {
    throw new Error('invalid format')
  }

  try {
    if (!base32.decode(secret).length) {
      throw new Error('invalid format')
    }
  } catch (err) {
    throw new Error('invalid format')
  }

  const labelRaw = keyUri.split('otpauth://totp/')[1]
  if (!labelRaw) {
    throw new Error('invalid format')
  }
  const label = decodeURIComponent(labelRaw.split(search)[0])
  if (!label) {
    throw new Error('invalid format')
  }

  const issuer = searchParams.get('issuer')

  let accountName = label
  const labelItems = label.split(/: ?/)
  if (issuer === labelItems[0]) {
    accountName = labelItems[1]
  }

  return {
    issuer,
    accountName,
    secret
  }
}

export function stringify ({ accountName, secret, issuer }) {
  let pathname = `/${accountName}`
  if (issuer) {
    pathname = `/${issuer}%3A${accountName}`
  }

  const authUrl = new URL(pathname, 'otpauth://totp/')
  authUrl.searchParams.set('secret', normalizeBase32(secret))

  if (issuer) {
    authUrl.searchParams.set('issuer', issuer)
  }
  return authUrl.toString()
}

export default {
  parse,
  stringify
}

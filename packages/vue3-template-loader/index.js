const TemplateLoader = require('vue-loader/dist/templateLoader.js')
const uniqueId = require('lodash/uniqueId')
module.exports.default = function (source) {
  const loaderContext = this
  const urlSearchParams = new URLSearchParams(loaderContext.resourceQuery.slice(1))
  if (!urlSearchParams.get('id')) {
    // handle issue
    // - [@vue/compiler-sfc] compileTemplate now requires the `id` option.`.
    // - https://github.com/vuejs/core/blob/13fc8ff9dd7007e4ef7d2f0b6e5c973013ccc8b8/packages/compiler-sfc/src/compileTemplate.ts#L189-L212
    urlSearchParams.set('id', uniqueId('v'))
    loaderContext.resourceQuery = `?${urlSearchParams.toString()}`
  }
  return TemplateLoader.default.call(this, source)
}

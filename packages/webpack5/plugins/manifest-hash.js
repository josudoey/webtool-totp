const { getCompilerHooks } = require('./manifest')

class ManifestHashPlugin {
  apply (compiler) {
    const self = this
    compiler.hooks.thisCompilation.tap(self.constructor.name, (compilation) => {
      compilation.hooks.afterHash.tap(self.constructor.name, () => {
        const stats = compilation.getStats()
        self.hash = stats.hash
      })
    })

    const { beforeEmit } = getCompilerHooks(compiler)
    beforeEmit.tap(this.constructor.name, (manifest) => {
      return {
        ...manifest,
        hash: self.hash
      }
    })
  }
}

module.exports = ManifestHashPlugin

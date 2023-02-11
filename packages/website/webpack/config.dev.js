import createDefaultConfig from './config.js'

export default function (env) {
  const defaultConfig = createDefaultConfig(env)
  return {
    ...defaultConfig,
    mode: 'development',
    devtool: 'source-map',
    devServer: {
      compress: true,
      devMiddleware: {
        writeToDisk: false
      },
      static: [{
        serveIndex: true,
        directory: defaultConfig.output.path
      }]
    }
  }
}

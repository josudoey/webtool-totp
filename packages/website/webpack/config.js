import path from 'path'
import MiniCssExtractPlugin from '~webpack5/plugins/mini-css-extract.js'
import CssMinimizerPlugin from '~webpack5/plugins/css-minimizer.js'
import TerserPlugin from '~webpack5/plugins/terser.js'
import HtmlWebpackPlugin from '~webpack5/plugins/html.js'
import webpack from '~webpack5'

import { createRequire } from 'module'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const require = createRequire(import.meta.url)

const html = {
  appMountId: 'app',
  appMountHtmlSnippet: '',
  lang: 'en-US',
  title: '',
  meta: [{
    name: 'viewport',
    content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
  }, {
    name: 'robots',
    content: 'noindex, nofollow'
  }],
  links: [],
  scripts: []
}

export default function (env) {
  const outputPath = path.resolve(env.outputPath || './dist')
  return {
    target: 'web',
    mode: 'production',
    entry: require.resolve('./entry/main.js'),
    resolve: {
      fallback: {
        buffer: require.resolve('buffer/'),
        fs: false
      },
      alias: {
        vue: '@vue/compat',
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify')
      }
    },
    output: {
      clean: true,
      path: outputPath,
      publicPath: 'auto',
      filename: 'main.js',
      chunkFilename: '[contenthash].js'
    },
    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 20000,
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      },
      minimizer: [
        new TerserPlugin({}),
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true }
              }
            ]
          }
        })
      ]
    },
    module: {
      rules: [{
        test: /render.pug$/,
        use: [{
          loader: require.resolve('~vue3-template-loader'),
          options: {}
        }, {
          loader: require.resolve('~webpack5/pug-plain-loader.js')
        }]
      }, {
        test: /module\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {}
        }, {
          loader: require.resolve('~webpack5/css-loader.js'),
          options: {
            modules: {
              namedExport: true,
              localIdentName: '__[hash:base64:5]'
            },
            importLoaders: 0
          }
        }]
      }, {
        test: /\.css$/,
        exclude: /module\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {}
        }, {
          loader: require.resolve('~webpack5/css-loader.js'),
          options: {
            importLoaders: 0
          }
        }]
      }, {
        test: /\.s[ac]ss$/i,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {}
        }, {
          loader: require.resolve('~webpack5/css-loader.js'),
          options: {
            importLoaders: 0
          }
        }]
      }]
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer']
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[contenthash].css',
        chunkFilename: 'css/[contenthash].css',
        ignoreOrder: true
      }),
      new HtmlWebpackPlugin({
        ...html,
        inject: true,
        template: path.resolve(__dirname, './template.ejs'),
        filename: './index.html',
        alwaysWriteToDisk: true
      })
    ]
  }
}

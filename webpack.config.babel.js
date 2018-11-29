import { resolve } from 'path'
import merge from 'webpack-merge'
// Webpack parts
import js from './webpack/js'
// import iePolyfill from './webpack/ie.polyfill'
import sass from './webpack/sass'
import pug from './webpack/pug'
import fonts from './webpack/fonts'
// import fontsCopy from './webpack/fonts.copy'
import images from './webpack/images'
import png from './webpack/png'
import svg from './webpack/svg'
import analyzer from './webpack/analyzer'
import browsersync from './webpack/browsersync'
// pages
import pages from './pages.config.js'

const isProd = process.env.NODE_ENV === 'production'

let common = merge.smart([
    {
        mode: isProd ? 'production' : 'development',
        // mode: 'production',
        // devtool: isProd ? 'none' : 'source-maps',
        devtool: !isProd ? 'cheap-module-inline-source-map' : 'none',
        //
        entry: {
            ...Object.entries(pages).reduce((entries, [name, options]) => {
                const path =
                    typeof options === 'object' ? options.path : options
                entries[name] = resolve(path, `${name}.js`)
                return entries
            }, {}),
        },
        output: {
            path: resolve(__dirname, 'dist'),
            filename: isProd ? 'js/[name].[chunkhash:5].js' : 'js/[name].js',
            // publicPath: '/',
            pathinfo: false,
        },
        //
        // context: resolve(__dirname, 'src'),
        resolve: {
            modules: [resolve(__dirname, 'src'), 'node_modules'],
            // extensions: ['.js', '.scss', '.sass'],
        },
    },
    js(),
    // iePolyfill(),
    sass(),
    pug(pages),
    fonts(),
    // fontsCopy(),
    images(),
    png(),
    svg(),
])

// start browsersync
if (process.env.START_SERVER == 'browsersync') {
    common = merge.smart([common, browsersync()])
}

export default () =>
    isProd
        ? //
          merge.smart([common, analyzer()])
        : merge.smart([common, analyzer()])
// : merge.smart([common, analyzer()]);

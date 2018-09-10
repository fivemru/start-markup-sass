import { resolve } from 'path'
import CopyWebpackPlugin from 'copy-webpack-plugin'

export default () => ({
    plugins: [
        new CopyWebpackPlugin([
            {
                from: resolve(
                    __dirname,
                    '../node_modules/js-polyfills/polyfill.min.js'
                ),
                to: 'js/ie-polyfill.js',
                // toType: 'template'
            },
        ]),
    ],
})

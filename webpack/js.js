import webpack from 'webpack'
import { resolve } from 'url'

const isProd = process.env.NODE_ENV === 'production'

export default () => ({
    plugins: [
        // ./node_modules/.bin/babel-external-helpers > ./src/js/babel-external-helpers.js
        new webpack.ProvidePlugin({
            // loaded if enable babel plugin
            babelHelpers:
                '!!' + resolve(__dirname, 'src/js/babel-external-helpers.js'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js)$/i,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: [
                                // 'transform-runtime',
                                // 'external-helpers'
                            ],
                        },
                    },
                    'eslint-loader',
                ],
            },
        ],
    },
    //
    optimization: {
        // minimize: isProd,
        minimize: isProd ? true : false,
        splitChunks: {
            cacheGroups: {
                js: {
                    test: m => m.constructor.name === 'NormalModule',
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2,
                    minSize: 0,
                },
            },
        },
    },
})

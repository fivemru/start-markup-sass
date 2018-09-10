import MiniCssExtractPlugin, { loader } from 'mini-css-extract-plugin'
import { resolve } from 'path'

const isProd = process.env.NODE_ENV === 'production'
const isWDS = process.env.START_SERVER === 'wds'

export default () => ({
    plugins: [
        new MiniCssExtractPlugin({
            filename: isProd
                ? 'css/[name].[chunkhash:5].css'
                : 'css/[name].css',
            chunkFilename: isProd
                ? 'css/[name].[chunkhash:5].css'
                : // : 'css/[id].css',
                  'css/[name].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(:?sass|scss|css)$/i,
                include: resolve(__dirname, '../src'),
                use: [
                    isWDS
                        ? 'style-loader'
                        : {
                              loader,
                              options: { publicPath: '../' },
                          },
                    // process '@import' and 'url()' like `'require'
                    {
                        loader: 'css-loader',
                        options: {
                            // minimize: true,
                            // modules: true,
                            sourceMap: false,
                        },
                    },
                    // formatting
                    ...(isProd
                        ? []
                        : [
                              {
                                  //   loader: require.resolve('./css-prettier-loader'),
                                  loader: require.resolve(
                                      './css-stylelint-loader'
                                  ),
                              },
                          ]),
                    // postcss
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('autoprefixer')({
                                    grid: true,
                                }),
                                require('postcss-preset-env')(),
                                ...(!isProd
                                    ? []
                                    : [
                                          require('cssnano')({
                                              preset: [
                                                  'default',
                                                  {
                                                      // svgo: false,
                                                  },
                                              ],
                                          }),
                                      ]),
                            ],
                        },
                    },
                    // sass/scss
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [resolve(__dirname, '../src/styles')],
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    test: m => m.constructor.name === 'CssModule',
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2,
                    minSize: 0,
                },
            },
        },
    },
})

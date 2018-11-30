import { resolve } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import HtmlBeautifyPlugin from 'html-beautify-webpack-plugin'
import RmJsTypeWebpackPlugin from './rm-jstype-webpack-plugin'

const isProd = process.env.NODE_ENV === 'production'

export default (pages = {}) => ({
    plugins: [
        ...Object.entries(pages).map(([name, options]) => {
            const path = typeof options === 'object' ? options.path : options
            const { data = {} } = options
            return new HtmlWebpackPlugin({
                filename: `${name}.html`,
                template: resolve(path, `${name}.pug`),
                chunks: ['polyfills', 'commons', name],
                data,
            })
        }),
        ...(isProd
            ? [new RmJsTypeWebpackPlugin()]
            : [
                  new HtmlBeautifyPlugin({
                      config: {
                          html: {
                              end_with_newline: true,
                              indent_size: 2,
                              indent_with_tabs: false,
                              indent_inner_html: true,
                              preserve_newlines: true,
                              unformatted: ['p', 'i', 'b', 'span'],
                          },
                      },
                      replace: [' type="text/javascript"'],
                  }),
              ]),
    ],
    module: {
        rules: [
            {
                test: /\.pug$/i,
                include: resolve(__dirname, '../src'),
                use: [
                    {
                        loader: 'pug-loader',
                        options: {
                            minify: isProd,
                            context: resolve(__dirname, '../src'),
                            root: resolve(__dirname, '../src'),
                        },
                    },
                ],
            },
        ],
    },
})

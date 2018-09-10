import SpriteLoaderPlugin from 'svg-sprite-loader/plugin'
import { resolve } from 'path'

const isProd = process.env.NODE_ENV === 'production'

export default () => ({
    plugins: [new SpriteLoaderPlugin()],
    module: {
        rules: [
            // Sprite
            {
                // test: /(?:blocks|layouts|pages)\/[^/]+\/sprite\/.+\.(?:svg)$/,
                test: /\.svg$/,
                include: /(?:blocks|layouts|pages)[\\/]+[^\\/]+[\\/]+sprite[\\/]+.+\.(?:svg)$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            // esModule: false,
                            // publicPath: '/',
                            spriteFilename: isProd
                                ? 'images/svg/sprite-[hash:6].svg'
                                : 'images/svg/sprite.svg?[hash:6]',
                        },
                    },
                    'svgo-loader',
                ],
            },
            // Inline
            {
                // test: /(?:blocks|layouts|pages)\/[^/]+\/.+\.svg$/,
                test: /\.svg$/,
                include: /(?:blocks|layouts|pages)[\\/]+[^\\/]+[\\/]+inline[\\/]+.+\.svg$/,
                use: ['raw-loader', 'svgo-loader'],
            },
            // External file
            {
                // test: /(?:blocks|layouts|pages)\/[^/]+\/.+\.svg$/,
                test: /\.svg$/,
                include: resolve(__dirname, '../src'),
                exclude: /(?:blocks|layouts|pages)[\\/]+[^\\/]+[\\/]+(?:sprite|inline)[\\/]+.+\.svg$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            regExp: /(blocks|layouts|pages)[\\/]+([^\\/]+)[\\/]+(images[\\/]+)?(.+)\.svg$/,
                            name: '[1]/[2]/[4].[ext]',
                            outputPath: 'images/',
                        },
                    },
                    'svgo-loader',
                ],
            },
        ],
    },
})

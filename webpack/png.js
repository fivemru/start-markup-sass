import { resolve } from 'path'
import SpritesmithPlugin from 'webpack-spritesmith'

// const isProd = process.env.NODE_ENV === 'production';

export default () => ({
    plugins: [
        //
        new SpritesmithPlugin({
            // Extract all png files from path
            src: {
                cwd: resolve(__dirname, '../src'),
                glob: '**/sprite/*.png',
            },
            // Generate sass and sprite.png files
            target: {
                image: resolve(__dirname, '../src/styles/generated/sprite.png'),
                css: resolve(
                    __dirname,
                    '../src/styles/generated/_png-sprite.scss'
                ),
            },
            // Path to generated sprite.png in file _png-sprite.scss
            apiOptions: {
                cssImageRef: '~styles/generated/sprite.png',
            },
        }),
    ],
    module: {
        rules: [
            {
                test: /styles[\\/]+generated[\\/]+[^\\/]+\.png$/,
                include: resolve(__dirname, '../src'),
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images/',
                },
            },
        ],
    },
})

/* 
Usage:
    put png files to "src/ ** /sprite/[name].png"

    *.sass:
        @import 'generated/png-sprite'
        ...
        .icon-dog
            +sprite($dog)

        //- where $dog = dog.png
*/

// import { resolve } from 'path'

export default () => ({
    module: {
        rules: [
            {
                // test: /\.(jpe?g|png)$/,
                test: /\.(jpe?g|png)$/,
                include: /(?:blocks|layouts|pages)[\\/]+[^\\/]+[\\/]+.+$/,
                // include: resolve(__dirname, '../src'),
                exclude: /(?:blocks|layouts|pages)[\\/]+[^\\/]+[\\/]+sprite[\\/]+.+$/,
                loader: 'file-loader',
                options: {
                    regExp: /(blocks|layouts|pages)[\\/]+([^\\/]+)[\\/]+(images[\\/]+)?(.+)\.(jpe?g|png)$/,
                    name: '[1]/[2]/[4].[ext]',
                    // name: '[path][name].[ext]',
                    outputPath: 'images/',
                },
            },
        ],
    },
})

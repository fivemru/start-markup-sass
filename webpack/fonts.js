import { resolve } from 'path'

export default () => ({
    module: {
        rules: [
            {
                test: /fonts\/.+\.(woff2?|ttf|eot|svg)$/i,
                include: resolve(__dirname, '../src'),
                loader: 'file-loader',
                options: {
                    regExp: /fonts\/([^/]+\/)(.+)\.(woff2?|ttf|eot|svg)$/i,
                    name: '[1][2].[ext]',
                    outputPath: 'fonts/',
                },
            },
        ],
    },
})

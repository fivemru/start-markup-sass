import { resolve } from 'path'
import CopyWebpackPlugin from 'copy-webpack-plugin'

export default () => ({
    plugins: [
        new CopyWebpackPlugin([
            {
                from: resolve(__dirname, '../src/fonts'),
                to: 'fonts',
            },
        ]),
    ],
})

import webpack from 'webpack'

export default () => ({
    devServer: {
        port: 3000,
        host: '0.0.0.0',
        hot: true,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
})

import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

export default () => ({
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'stats.html',
            openAnalyzer: false,
        }),
    ],
})

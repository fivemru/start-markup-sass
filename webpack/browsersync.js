import BrowserSyncPlugin from 'browser-sync-webpack-plugin'
import compress from 'compression'

// yarn add -D browser-sync
// yarn add -D browser-sync-webpack-plugin

export default () => ({
    plugins: [
        new BrowserSyncPlugin({
            port: 3000,
            server: { baseDir: ['dist'] },
            middleware: [compress()],
            open: false,
            notify: false,
        }),
    ],
})

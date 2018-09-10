class RmJsTypeWebpackPlugin {
    constructor(options) {
        this.options = Object.assign(
            {
                replace: [
                    //
                    { pattern: ' type="text/javascript"', replacement: '' },
                ],
            },
            options
        )
    }

    apply(compiler) {
        compiler.hooks.compilation.tap('RmJsTypeWebpackPlugin', compilation =>
            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
                'RmJsTypeWebpackPlugin',
                (htmlPluginData, callback) => {
                    htmlPluginDataFunction(htmlPluginData, callback, this)
                }
            )
        )
    }
}

function htmlPluginDataFunction(htmlPluginData, callback, _this) {
    htmlPluginData.html = _this.options.replace.reduce(
        (res, { pattern, replacement = '' }) => {
            if (typeof pattern === 'string' || pattern instanceof RegExp)
                return res.replace(
                    pattern instanceof RegExp
                        ? pattern
                        : new RegExp(pattern, 'gi'),
                    replacement
                )
            else return res
        },
        htmlPluginData.html
    )

    callback(null, htmlPluginData)
}

export default RmJsTypeWebpackPlugin

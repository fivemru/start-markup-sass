import stylelint from 'stylelint'
import { getOptions } from 'loader-utils'

export default function(content) {
    const callback = this.async()
    this.cacheable()

    const defaultOptions = {
        code: content,
        formatter: 'string',
        fix: true,
    }

    const options = Object.assign({}, defaultOptions, getOptions(this))

    stylelint
        .lint(options)
        .then(({ errored, output, results }) => {
            if (errored) {
                let fields = [
                    'deprecations',
                    'invalidOptionWarnings',
                    'parseErrors',
                    'warnings',
                ]

                let messages = []
                const shortPath = this.resourcePath.replace(
                    this.rootContext,
                    ''
                )
                results.forEach(result => {
                    const res = fields.reduce((_messages, field) => {
                        const items = result[field]

                        if (!items.length) return _messages

                        const res = items.map(
                            ({ line, column, text }) =>
                                `[${shortPath}] ${line}:${column} => ${text}`
                        )

                        _messages.push(...res)

                        return _messages
                    }, [])
                    messages.push(...res)
                })
                this.emitWarning(new Error(messages.join('\n')))
                callback(null, output)
            } else {
                callback(null, output)
            }
        })
        .catch(function(err) {
            callback(err.stack)
        })
}

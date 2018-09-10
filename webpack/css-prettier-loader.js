import { format } from 'prettier'
import { getOptions } from 'loader-utils'

export default function(content) {
    this.cacheable()
    const options = Object.assign({ parser: 'css' }, getOptions(this))
    return format(content, options)
}

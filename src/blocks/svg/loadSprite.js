import svg from './sprite/blank.svg'
import replaceUrl from './replaceUrl'

// For IE 9+ support
document.addEventListener('DOMContentLoaded', () => {
    if (navigator.userAgent.search(/(?:edge|trident)/i) === -1) return

    const [commonUrl] = svg.url.split('#')
    const elms = document.body.querySelectorAll('use')

    fetch(commonUrl)
        .then(res => res.text())
        .then(content => {
            const wrapper = document.createElement('div')
            wrapper.id = '__wrapper_sprite'
            wrapper.style.display = 'none'
            wrapper.innerHTML = content
            document.body.appendChild(wrapper)
            // replace svg url
            replaceUrl(commonUrl)
        })
    // add loading class
    Array.from(elms)
        .filter(el => el.getAttribute('xlink:href'))
        .forEach(el => {
            el.parentNode.setAttribute('class', 'svg--loading')
        })
})

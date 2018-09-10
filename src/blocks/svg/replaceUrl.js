function replaceUrl(url) {
    if (navigator.userAgent.search(/(?:edge|trident)/i) === -1) return
    var commonUrl = url.split('#')[0]
    var elms = document.body.querySelectorAll('use')
    var replaced = 0
    Array.prototype.forEach.call(elms, function(el) {
        var href = el.getAttribute('xlink:href')
        if (!href) return
        var iconId = href.split('#')[1]
        if (href.indexOf(commonUrl) === -1) return
        el.setAttribute('xlink:href', '#' + iconId.replace('-usage', ''))
        el.parentNode.setAttribute('class', '')
        ++replaced
    })
    console.log('Replaced svg url for IE 9+: ' + replaced)
}
try {
    module.exports = replaceUrl
} catch (e) {
    ;('error')
}
